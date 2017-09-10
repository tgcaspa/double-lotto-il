/**
 * Created by ghost-dev on 8/5/2017.
 */

let _           = require('underscore');
let path        = require('path');
let morgan      = require('morgan');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');
let request     = require('request');
let cheerio     = require('cheerio');
let express     = require('express');
let app         = express();
let dbConfig    = require('../../config/db');
let appMetadata = require('../../config/app.metadata');

// App configuration
app.set('port', appMetadata.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
// DB connection
let db = mongoose.connection;
mongoose.connect(dbConfig.getConnection(), { useMongoClient: true });
mongoose.Promise = global.Promise;
// Models
let Response = require('./models/response');
let Results  = require('./models/mongoose/results');
let Users  = require('./models/mongoose/users');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('App Lotto has been connected to MongoDB');

    // CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // find last Pais results
    app.get('/api/results/pais/last', (req, res) => {
        let url = 'http://www.pais.co.il/Lotto/Pages/last_Results.aspx';

        request(url, function(error, response, html){
            let json = {lottery_id: 0, timestamp: 0, strong: 0, regular: 0, pais: true};
            if(error) {
                res.status(400).json(
                    Response.pack(error, json, "Lotto Results")
                );
            }

            let $ = cheerio.load(html);

            $('#PaisLottoLastResults').filter(function(){
                let data = $(this);
                let strong = data.find('.StrongNumber').text() || 0;
                let regular = [];
                data.find('ul>li.Number').map(function(ix, item) {
                    regular.push($(item).text());
                });
                regular = regular.join(',');
                let paisFirst = data.children('.PaisFirst').text().trim();
                let id = paisFirst.match(/\d{4}/)[0] || 0;
                let dateTime = [
                    paisFirst.match(/\d{2}\/\d{2}\/\d{4}/)[0],
                    paisFirst.match(/\d{2}:\d{2}/)[0]
                ].join(' ');

                json.lottery_id = Number(id);
                json.timestamp = Date.parse(dateTime);
                json.strong = strong;
                json.regular = regular;
            });

            res.send(
                Response.pack(error, json, "Pais results")
            )
        })
    });

    // find Pais results by id
    app.get('/api/results/pais/:id', (req, res) => {
        const id = Number(req.params.id) || 0;
        if(id <= 0) {
            const response = Response.pack("Invalid lottery id was specified", data, "Pais results");
            res.status(400).json(response);
        }
        url = `http://www.pais.co.il/Lotto/Pages/last_Results.aspx?Lottery=${id}`;
    });

    // find by id
    app.get('/api/results/:id', (req, res) => {
        const id = Number(req.params.id) || 0;
        if(id <= 0) {
            const response = Response.pack("Invalid lottery id was specified", data, "Lotto results");
            res.status(400).json(response);
        }
        Results.findOne({
            passport: req.params.passport || 0,
            phone: req.params.phone || "",
        }, (err, data) => {
            const response = Response.pack(err, data, "Lotto results");
            res.status(200).json(response);
        });
    });

    // save user's lottery results
    app.post('/api/results/:id/save', function(req, res) {
        const id = Number(req.params.id) || 0;
        if(id <= 0) {
            const response1 = Response.pack("Invalid lottery id was specified", data, "Save Results");
            res.status(400).json(response1);
        }
        // upsert user's details
        let uparams = { passport: req.body.passport, phone: req.body.phone };
        Users.findOneAndUpdate(uparams, {$set: uparams}, {upsert: true, new: true}, (err, data) => {
            if(err) {
                const response2 = Response.pack(err, data, "Save Results");
                res.status(400).send(response2);
            } else {
                // save results
                req.body.lottery_id = id;
                req.body.user_id = data._id;
                req.body.timestamp = Date.now();
                req.body.pais = false;
                req.body.regular = req.body.regular.join(',');
                req.body.strong = req.body.strong.join(',');
                let results = new Results(req.body);
                results.save((err, data) => {
                    const lotto_id = !err && data._id || null;
                    const response3 = Response.pack(err, lotto_id, "Save Results");
                    res.status(201).send(response3);
                });
            }
        })
    });

    // insert user's lottery data
    app.post('/api/results/:id', function(req, res) {
        const id = Number(req.params.id) || 0;
        if(id <= 0) {
            const response1 = Response.pack("Invalid lottery id was specified", data, "Save Results");
            res.status(400).json(response1);
        }

        Users.aggregate([
            {
                $lookup: {
                    from: 'results',
                    localField: 'user_id',
                    foreignField: 'id',
                    as: 'results'
                }
            }
        ], (err, data) => {
            const response = Response.pack(err, data, "Lotto Results");
            res.status(200).json(response);
        });
    });

    // all other routes are handled by Angular
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname,'/../../dist/index.html'));
    });

    /** Listen to application port */
    app.listen(app.get('port'), () => {
        console.log(`App Lotto listening on port ${app.get('port')}`);
    });
});