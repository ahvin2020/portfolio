module.exports = function(app) {
	var async = app.locals.async;
	var config = app.locals.config;
	var mysqlLib = app.locals.mysqlLib;
	var mysqlPool = app.locals.mysqlPool;
	var util = app.locals.util;

	app.get('/', function(req, res) {
		var works = app.locals.cache.works;

		res.render('pages/index.ejs', {works: works});
	});
};