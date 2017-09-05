/**
 * Created by ghost-dev on 8/5/2017.
 */

var path       = require('path');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var request    = require('request');
var cheerio    = require('cheerio');
var express    = require('express');
var app        = express();

var dbConfig    = require('../../app/config/db');
var appMetadata = require('../../app/config/app.metadata');

console.log(dbConfig.getConnection());
return;
app.set('port', appMetadata.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect(dbConfig.getConnection(), { useMongoClient: true });
mongoose.Promise = global.Promise;

// Models
var Response = require('./models/response');
var Results  = require('./models/mongoose/results');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('App Lotto has been connected to MongoDB');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // find last Pais results
    app.get('/api/results/pais/last', function(req, res) {
        url = 'http://www.pais.co.il/Lotto/Pages/last_Results.aspx';

        request(url, function(error, response, html){
            var json = { id: 0, timestamp: 0, strong: 0, regular: 0};
            if(error) {
                res.status(400).json(
                    Response.pack(error, json, "Lotto Results")
                );
            }

            var $ = cheerio.load(html);

            $('#PaisLottoLastResults').filter(function(){
                var data = $(this);
                var strong = data.find('.StrongNumber').text() || 0;
                var regular = [];
                data.find('ul>li.Number').map(function(ix, item) {
                    regular.push($(item).text());
                });
                regular = regular.join(',');
                var paisFirst = data.children('.PaisFirst').text().trim();
                var id = paisFirst.match(/\d{4}/)[0] || 0;
                var dateTime = [
                    paisFirst.match(/\d{2}\/\d{2}\/\d{4}/)[0],
                    paisFirst.match(/\d{2}:\d{2}/)[0]
                ].join(' ');

                json.id = Number(id);
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
    app.get('/api/results/pais/:id', function(req, res){
        const id = Number(req.params.id) || 0;
        if(id <= 0) {
            const response = Response.pack("Invalid lottery id was specified", data, "Pais results");
            res.status(400).json(response);
        }
        url = 'http://www.pais.co.il/Lotto/Pages/last_Results.aspx?Lottery='+id;
    });

    // find by id
    app.get('/api/results/:id', function(req, res) {
        Results.findOne({_id: req.params.id}, function(err, data) {
            const id = Number(req.params.id) || 0;
            if(id <= 0) {
                const response = Response.pack("Invalid lottery id was specified", data, "Lotto results");
                res.status(400).json(response);
            }
            const response = Response.pack(err, data, "Lotto results");
            res.status(200).json(response);
        })
    });

    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname,'/../index.html'));
    });

    /** Listen to application port */
    app.listen(app.get('port'), function() {
        console.log('App Lotto listening on port '+app.get('port'));
    });
});