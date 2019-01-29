/*exports.ReturnError = function(res, message) {
	var json = {
		Error: 1,
		Msg: message
	};

	console.trace(message);

	res.end(JSON.stringify(json));
}; */

exports.GetConnection = function(mysqlPool, callback) {
	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			callback(err.code);
		} else {
			callback(null, connection);
		}
	});
};