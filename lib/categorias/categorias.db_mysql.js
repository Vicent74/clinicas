var mysql = require('mysql'),
comun = require('../comun/comun');

var categoriasDbApi = {


get: function(done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from categorias";
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
        var sql = "select * from categorias where id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

post: function(categoria, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "insert into categorias set ?";
        sql = mysql.format(sql, categoria);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

put: function(categoria, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "UPDATE categorias SET ? WHERE id = ?"
        sql = mysql.format(sql, [categoria, categoria.id]);
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
        var sql = "DELETE FROM categorias WHERE id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
}
}

module.exports = categoriasDbApi;