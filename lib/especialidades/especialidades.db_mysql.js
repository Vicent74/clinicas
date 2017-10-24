var mysql = require('mysql'),
comun = require('../comun/comun');

var especialidadesDbApi = {


get: function(done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "select * from especialidades";
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
    var sql = "select * from especialidades where id = ?";
    sql = mysql.format(sql, id);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

post: function(especialidad, done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "insert into especialidades set ?";
    sql = mysql.format(sql, especialidad);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

put: function(especialidad, done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "UPDATE especialidades SET ? WHERE id = ?"
    sql = mysql.format(sql, [especialidad, especialidad.id]);
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
    var sql = "DELETE FROM especialidades WHERE id = ?";
    sql = mysql.format(sql, id);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
}
}

module.exports = especialidadesDbApi;