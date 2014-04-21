/* mongodb inctance */
var mdb = require('mongodb');

/* import config from "./config.json" */
var mongoConf = require('./config.json').mongoConf;

/* export the mongodb interface */
module.exports = mdb.MongoClient.connect.bind(mdb.MongoClient, mongoConf.dburl, mongoConf.options);