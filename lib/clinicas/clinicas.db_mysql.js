var mysql = require('mysql'),
    comun = require('../comun/comun');

var clinicasDbApi = {
    
        
        get: function(done){
            comun.getConnectionCallBack(function(err, con){
                if (err) return done(err);
                var sql = "SELECT * FROM clinicas";
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        },
    
        getById: function(id, done){
            comun.getConnectionCallBack(function(err, con){
                if (err) return done(err);
                var sql = "select * from clinicas where id = ?";
                sql = mysql.format(sql, id);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data); 
                });
            });
        },
    
        post: function(clinica, done){
            comun.getConnectionCallBack(function(err, con){
                if(err) return done(err);
                var sql = 'insert into clinicas set ?';
                sql = mysql.format(sql, clinica);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        },
    
        put: function(clinica, done){
           comun.getConnectionCallBack(function(err, con){
                if(err) return done(err);
                var sql = 'update clinicas set ? where cif = ?';
                sql = mysql.format(sql, [clinica, clinica.cif]);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        },
    
        delete: function(id, done){
            comun.getConnectionCallBack(function(err, con){
                if (err) return done(err);
                var sql = "DELETE FROM clinicas WHERE id = ?";
                sql = mysql.format(sql, id);
                con.query(sql, function(err, data){
                    con.end();
                    if (err) return done(err);
                    done(null, data);
                });
            });
        }
    }





module.exports = clinicasDbApi;