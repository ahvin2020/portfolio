// https://scotch.io/tutorials/use-ejs-to-template-your-node-application

var express 	= require('express'),
	async 		= require('async'),
	http 		= require('http'),
	mysqlLib 	= require('mysql'),
	app 		= express();
	

// configs
var config = require('./configs/config.js');

// mysql
var sqlHost;
var sqlUser;
var sqlPassword;
var sqlDatabase;
var sqlConnectionLimit;

// load util
var config = require('./configs/config.js');
var util = require('./helpers/util.js');

// init sql
if (process.env.PRODUCTION == "true") {
	sqlHost = config.sql.hostProduction;
	sqlUser = config.sql.userProduction;
	sqlPassword = config.sql.passwordProduction;
	sqlDatabase = config.sql.databaseProduction;
	sqlConnectionLimit = config.sql.connectionLimitProduction;
} else { // is local?
	sqlHost = config.sql.host;
	sqlUser = config.sql.user;
	sqlPassword = config.sql.password;
	sqlDatabase = config.sql.database;
	sqlConnectionLimit = config.sql.connectionLimit;
}

var mysqlPool = mysqlLib.createPool({
	host: sqlHost,
	user: sqlUser,
	password: sqlPassword,
	database: sqlDatabase,
	connectionLimit: sqlConnectionLimit,
	multipleStatements: true,
	timezone: '+0800'
});

// global variables
app.locals.async = async;
app.locals.mysqlLib = mysqlLib;
app.locals.mysqlPool = mysqlPool;
app.locals.util = util;
app.locals.cache = {};

// view engine
app.set('view engine', 'ejs');

// routes
app.use(express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/vendor'));

async.auto({
	preloadCache: function(callback) {
		// preload data
		var preloader = require('./controllers/preloader.js');
		preloader.PreloadCache(app, callback);
	},
	initControllers: ['preloadCache', function(results, callback) {
		require('./controllers/index.js')(app);
		callback(null);
	}]
}, function(err, results) {
	var port = 3000;
	var server = app.listen(port, function() {
		console.log('Example app listening on port ' + port + '!');
		if (process.send) {
			process.send('online');
		}
	});
});

function sendOfflineMsg() {
	console.log("sendOfflineMsg");
//		if (process.send) {
//      console.log("sendOfflineMsg");
//			process.send('offline');
//		}
}

function doGracefulExit(err) {
	console.log("do graceful exit");
	gracefulExit.gracefulExitHandler(app, server, {"suicideTimeout": 12000}, function() {			
		if (mysqlPool) {
			mysqlPool.end();
		}
		//if (db) {
		//	db.quit();
		//}
	});
}

process.on('message', function(m) {
	if (m === 'shutdown') {
		console.log("received shutdown");
		doGracefulExit();
	}
});

function catchError(err) {
	console.log(err);
}