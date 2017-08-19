/**
 * Created by dimah on 24/11/16.
 */

var mongoose = require('mongoose');

var resultsSchema = mongoose.Schema({
    lottery_id: Number,
    timestamp: Number,
    regular: String,
    strong: String,
    pais: Boolean,
    passport: Number,
    phone: String
});

module.exports = mongoose.model('Results', resultsSchema);