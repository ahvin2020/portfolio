exports.PreloadCache = function(app, callback) {
	var async = app.locals.async;
	var config = app.locals.config;
	var mysqlLib = app.locals.mysqlLib;
	var mysqlPool = app.locals.mysqlPool;
	var util = app.locals.util;

	var startTime = new Date();

	async.auto({
		getConn: function(cb) {
			util.GetConnection(mysqlPool, cb);
		},
		getDatas: ['getConn', function(results, cb) {
			var sqlQuery = 'SELECT * FROM works ORDER BY display_order DESC;';

			results.getConn.query(sqlQuery, function(err, dbResult) {
				if (err !== null) {
					cb(err.code);
				} else {
					cb(null, dbResult);
				}
			});
		}]
	}, function(err, results) {
		var conn = results.getConn;
		if (conn) {
			conn.release();
		}

		if (err !== null) {
			console.log("preload fail: " + err);
			callback(err);
		} else {
			app.locals.cache.works = results.getDatas;

			var endTime = new Date();
			var diff = (endTime - startTime) / 1000;
			console.log("preload finish in " + diff + " seconds");
			callback(null);
		}
	});
}