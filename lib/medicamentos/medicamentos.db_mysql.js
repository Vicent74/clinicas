var mysql = require('mysql'),
comun = require('../comun/comun');

var medicamentosDbApi = {


get: function(done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from medicamentos";
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
        var sql = "select * from medicamentos where id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

post: function(medicamento, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "insert into medicamentos set ?";
        sql = mysql.format(sql, medicamento);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

put: function(medicamento, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "UPDATE medicamentos SET ? WHERE id = ?"
        sql = mysql.format(sql, [medicamento, medicamento.id]);
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
        var sql = "DELETE FROM medicamentos WHERE id = ?";
        sql = mysql.format(sql, id);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
}
}

module.exports = medicamentosDbApi;