/**
 * Created by ghost-dev on 8/5/2017.
 */

'use strict';

var _config = {
    instance: 'mongodb',
    schema: 'lotto',
    host: 'localhost',
    port: 27017
};

function dbConfig() {}

dbConfig.prototype.getConnection = function () {
    return _config.instance+'://'+_config.host+':'+_config.port+'/'+_config.schema;
}

/**
 * Module exports.
 */
module.exports = new dbConfig;