var mysql = require('mysql'),
    comun = require('../comun/comun');

var alergiasDbApi = {

    
    get: function(done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "select * from alergias";
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
            var sql = "select * from alergias where id = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    post: function(alergia, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "insert into alergias set ?";
            sql = mysql.format(sql, alergia);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    put: function(alergia, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "UPDATE alergias SET ? WHERE id = ?"
            sql = mysql.format(sql, [alergia, alergia.id]);
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
            var sql = "DELETE FROM alergias WHERE id = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    }
}

module.exports = alergiasDbApi;