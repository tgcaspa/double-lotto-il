/**
 * Created by ghost-dev on 8/5/2017.
 */

'use strict';

let _ = require('underscore');

let config = {
    instance: 'mongodb',
    user: '***',
    password: '***',
    schema: '***',
    clusters: [
        '***.mongodb.net:port',
        '***.mongodb.net:port',
        '***.mongodb.net:port'
    ],
    port: 27017,
    q_ssl: true,
    q_replicaSet: '***',
    q_authSource: '***'
};

function dbConfig() {}

dbConfig.prototype.getConnection = function () {
    let uri = "instance://user:password@clusters/schema?ssl=q_ssl&replicaSet=q_replicaSet&authSource=q_authSource";
    _.keys(config).map(function(v) {
        if(_.isArray(config[v])) {
            config[v] = config[v].join(',');
        }
        uri = uri.replace(new RegExp(v, 'g'), config[v]);
    });
    return uri;
}

/**
 * Module exports.
 */
module.exports = new dbConfig;