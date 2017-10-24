var mysql = require('mysql'),
comun = require('../comun/comun');

var nominasDbApi = {


get: function(done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "select * from nominas";
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

getByYearMoth: function(body, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from nominas where anyo = ? and mes = ?";
        sql = mysql.format(sql, [body.anyo, body.mes]);
        con.query(sql, function(err, data){
            con.end();
            if (err) return done(err);
            done(null, data);
        });
    });
},

getByDni: function(dniEmpleado, done){
    comun.getConnectionCallBack(function(err, con){
        if (err) return done(err);
        var sql = "select * from nominas where dniEmpleado = ?";
        sql = mysql.format(sql, dniEmpleado);
        con.query(sql, function(err, data){
            if (err) return done(err);
            done(null, data);
        });
    });
},

post: function(nomina, done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "insert into nominas set ?";
    sql = mysql.format(sql, nomina);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

put: function(nomina, done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "UPDATE nominas SET ? WHERE id = ?"
    sql = mysql.format(sql, [nomina, nomina.id]);
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
    var sql = "DELETE FROM nominas WHERE id = ?";
    sql = mysql.format(sql, id);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
}
}

module.exports = nominasDbApi;