/**
 * Created by ghost-dev on 8/5/2017.
 */

'use strict';

var dbConfig = {
    schema: 'lotto',
    host: 'localhost',
    port: 27017
};

module.exports = require('depd')('db-config');