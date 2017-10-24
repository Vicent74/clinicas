var mysql = require('mysql'),
comun = require('../comun/comun');

var usuariosDbApi = {


get: function(done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "select * from usuarios";
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
    var sql = "select * from usuarios where id = ?";
    sql = mysql.format(sql, id);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

post: function(usuario, done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "insert into usuarios set ?";
    sql = mysql.format(sql, usuario);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

put: function(usuario, done){
comun.getConnectionCallBack(function(err, con){
    if (err) return done(err);
    var sql = "UPDATE usuarios SET ? WHERE id = ?"
    sql = mysql.format(sql, [usuario, usuario.id]);
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
    var sql = "DELETE FROM usuarios WHERE id = ?";
    sql = mysql.format(sql, id);
    con.query(sql, function(err, data){
        con.end();
        if (err) return done(err);
        done(null, data);
    });
});
},

login: function(login, password, done){
    comun.getConnectionCallBack(function(err, con){
        if(err) return done(err);
        var sql = "select * from usuarios where login = ? and password = ?";
        sql = mysql.format(sql, [login, password]);
        con.query(sql, function(err, data){
            con.end();
            if(err) return done(err);
            if (data.length == 0) return  done(null, data);
            done (null, data);
        });
    });
}


}

module.exports = usuariosDbApi;