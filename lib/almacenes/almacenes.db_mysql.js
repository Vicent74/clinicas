var mysql = require('mysql'),
comun = require('../comun/comun');

var almacenesDbApi = {


get: function(done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from almacenes";
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
        var sql = "select * from almacenes where id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

post: function(almacen, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "insert into almacenes set ?";
        sql = mysql.format(sql, almacen);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

put: function(almacen, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "UPDATE almacenes SET ? WHERE id = ?"
        sql = mysql.format(sql, [almacen, almacen.id]);
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
        var sql = "DELETE FROM almacenes WHERE id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
}
}

module.exports = almacenesDbApi;