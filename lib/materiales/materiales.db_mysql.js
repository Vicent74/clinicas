var mysql = require('mysql'),
comun = require('../comun/comun');

var materialesDbApi = {


get: function(done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from materiales";
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
        var sql = "select * from materiales where id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

post: function(material, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "insert into materiales set ?";
        sql = mysql.format(sql, material);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

put: function(material, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "UPDATE materiales SET ? WHERE id = ?"
        sql = mysql.format(sql, [material, material.id]);
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
        var sql = "DELETE FROM materiales WHERE id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
}
}

module.exports = materialesDbApi;