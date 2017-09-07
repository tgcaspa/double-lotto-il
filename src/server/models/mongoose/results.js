/**
 * Created by dimah on 24/11/16.
 */

let mongoose = require('mongoose');

let resultsSchema = mongoose.Schema({
    lottery_id: Number,
    user_id: Object,
    timestamp: Number,
    regular: String,
    strong: String,
    pais: Boolean
});

module.exports = mongoose.model('Results', resultsSchema);