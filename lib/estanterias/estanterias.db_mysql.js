var mysql = require('mysql'),
comun = require('../comun/comun');

var estanteriasDbApi = {

    get: function(done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "SELECT * FROM estanterias";
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    getBydniPaciente: function(dniPaciente, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "select * from estanterias where dniPaciente = ?";
            sql = mysql.format(sql, dniPaciente);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data); 
            });
        });
    },

    post: function(pacienteAlergia, done){
        comun.getConnectionCallBack(function(err, con){
            if(err) return done(err);
            var sql = 'insert into estanterias set ?';
            sql = mysql.format(sql, pacienteAlergia);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    put: function(pacienteAlergia, done){
        comun.getConnectionCallBack(function(err, con){
            if(err) return done(err);
            var sql = 'update estanterias set ? where dniPaciente = ? and idAlergia = ?';
            sql = mysql.format(sql, [pacienteAlergia[1], pacienteAlergia[0].dniPaciente,  pacienteAlergia[0].idAlergia]);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    delete: function(pacienteAlergia, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "DELETE FROM estanterias WHERE dniPaciente = ? and idAlergia = ?";
            sql = mysql.format(sql, [pacienteAlergia.dniPaciente, pacienteAlergia.idAlergia]);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    }
}


module.exports = estanteriasDbApi;