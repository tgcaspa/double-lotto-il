/**
 * Created by ghost-dev on 8/5/2017.
 */

let morgan      = require('morgan');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');
let request     = require('request');
let cheerio     = require('cheerio');
let express     = require('express');
let app         = express();
let dbConfig    = require('../../config/db');
let appMetadata = require('../../config/app.metadata');

// Models
let Response = require('./models/response');
let Results  = require('./models/mongoose/results');
let Users    = require('./models/mongoose/users');

// App configuration
app.set('port', appMetadata.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// DB connection
mongoose.connect(dbConfig.getConnection(), {useMongoClient: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('App Lotto has been connected to MongoDB');

    // CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Methods", "GET, POST");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // find last or by id Pais results
    app.get('/api/results/pais/:id', (req, res) => {
        let url;
        let id = req.params.id || "";
        if(id === 'last') {
            url = 'http://www.pais.co.il/Lotto/Pages/last_Results.aspx';
        } else if(Number(id) > 0){
            url = `http://www.pais.co.il/Lotto/Pages/last_Results.aspx?Lottery=${id}`;
        } else {
            const response = Response.pack("Invalid lottery id was specified", {}, "Pais results");
            res.status(400).json(response);
            return;
        }
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
                let vdate = paisFirst
                                .match(/\d{2}\/\d{2}\/\d{4}/)[0]
                                .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
                let vtime = paisFirst.match(/\d{2}:\d{2}/)[0];
                let dateTime = [vdate, vtime].join(' ');

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

    // find by id
    app.get('/api/results/:id', (req, res) => {
        const id = Number(req.params.id) || 0;
        if(id <= 0) {
            const response = Response.pack("Invalid lottery id was specified", data, "Lotto results");
            res.status(400).json(response);
            return;
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
            return;
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
                    const success = !err && data._id ? 1 : 0;
                    const response3 = Response.pack(err, success, "Save Results");
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
            return;
        }
        const uparams = {
            lottery_id: id,
            passport: Number(req.body.passport) || 0,
            phone: req.body.phone || ""
        };
        Users.aggregate([
            {
                $lookup: {
                    from: 'results',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'results'
                }
            },
            {
                $match : { $and : [
                    { passport: uparams.passport },
                    { phone: uparams.phone }
                ] }
            },
            {
                $project: {
                    passport: 1,
                    phone: 1,
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: [ "$$result.lottery_id", uparams.lottery_id ] }
                        }
                    }
                }
            }
        ], (err, data) => {
            const response = Response.pack(err, data, "Lotto Results");
            res.status(!err?200:400).json(response);
        });
    });

    /** Listen to application port */
    app.listen(app.get('port'), () => {
        console.log(`App Lotto listening on port ${app.get('port')}`);
    });
});