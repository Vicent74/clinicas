var mysql = require('mysql'),
    comun = require('../comun/comun');

var trabajadoresDbApi = {
    
        get: function(done){
            comun.getConnectionCallBack(function(err, con){
                if (err) return done(err);
                var sql = "SELECT * FROM trabajadores";
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        },
    
        getBydni: function(dni, done){
            comun.getConnectionCallBack(function(err, con){
                if (err) return done(err);
                var sql = "select * from trabajadores where dni = ?";
                sql = mysql.format(sql, dni);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data); 
                });
            });
        },
    
        post: function(trabajador, done){
            comun.getConnectionCallBack(function(err, con){
                if(err) return done(err);
                var sql = 'insert into trabajadores set ?';
                sql = mysql.format(sql, trabajador);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        },
    
        put: function(trabajador, done){
            comun.getConnectionCallBack(function(err, con){
                if(err) return done(err);
                var sql = 'update trabajadores set ? where dni = ?';
                sql = mysql.format(sql, [trabajador, trabajador.dni]);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        },
    
        delete: function(dni, done){
            comun.getConnectionCallBack(function(err, con){
                if (err) return done(err);
                var sql = "DELETE FROM trabajadores WHERE dni = ?";
                sql = mysql.format(sql, dni);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        }
    }





module.exports = trabajadoresDbApi;