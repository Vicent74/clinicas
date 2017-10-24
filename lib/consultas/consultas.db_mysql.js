var mysql = require('mysql'),
    comun = require('../comun/comun');

var consultasDbApi = {


get: function(done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from consultas";
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

getByEstado: function(estado, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from consultas where estado = ?";
        sql = mysql.format(sql, estado);
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
        var sql = "select * from consultas where id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

post: function(consulta, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "insert into consultas set ?";
        sql = mysql.format(sql, consulta);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

put: function(consulta, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "UPDATE consultas SET ? WHERE id = ?"
        sql = mysql.format(sql, [consulta, consulta.id]);
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
        var sql = "DELETE FROM consultas WHERE id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
}
}

module.exports = consultasDbApi;