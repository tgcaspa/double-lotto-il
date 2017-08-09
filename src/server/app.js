/**
 * Created by ghost-dev on 8/5/2017.
 */

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dbConfig = require('db-config');
var app = express();
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tusa_manage');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Routes
var rUser = require('./routes/user');
var rTusa = require('./routes/tusa');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Tusa Manage connected to MongoDB');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname,'/../index.html'));
    });

    /** Listen to application port */
    app.listen(app.get('port'), function() {
        console.log('Tusa Mange listening on port '+app.get('port'));
    });
});