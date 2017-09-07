/**
 * Created by dimah on 24/11/16.
 */

let mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
    passport: Number,
    phone: String
});

module.exports = mongoose.model('Users', usersSchema);