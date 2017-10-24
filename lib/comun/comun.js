var mysql = require('mysql');//libreria de acceso a bases de datos MySQL
var config = require("../../configMySQL.json");//leer la configuracion de MySQL

module.exports.getConnectionCallBack = function(done){

    var connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    });
    connection.connect(function(err){
        if (err) return done(err);
        done(null, connection);
    });
}