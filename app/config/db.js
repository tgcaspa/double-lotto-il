/**
 * Created by ghost-dev on 8/5/2017.
 */

'use strict';

var _ = require('underscore');

var config = {
    instance: 'mongodb',
    user: '**',
    password: '**',
    schema: '**',
    clusters: [
        'cluster0-shard-00-00-6snht.mongodb.net:27017',
        'cluster0-shard-00-01-6snht.mongodb.net:27017',
        'cluster0-shard-00-02-6snht.mongodb.net:27017'
    ],
    host: 'localhost',
    port: 27017,
    q_ssl: true,
    q_replicaSet: 'Cluster0-shard-0',
    q_authSource: 'admin'
};
function dbConfig() {}

dbConfig.prototype.getConnection = function () {
    var url = "instance://user:password@host:port,clusters/schema?ssl=q_ssl&replicaSet=q_replicaSet&authSource=q_authSource";
    _.keys(config).map(function(v) {
        url = url.replace(v, config[v]);
    });
}

/**
 * Module exports.
 */
module.exports = new dbConfig;