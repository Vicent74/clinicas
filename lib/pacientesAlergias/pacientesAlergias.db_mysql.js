var mysql = require('mysql'),
comun = require('../comun/comun');

var pacientesAlergiasDbApi = {

    get: function(done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "SELECT * FROM pacientesAlergias";
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
            var sql = "select * from pacientesAlergias where dniPaciente = ?";
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
            var sql = 'insert into pacientesAlergias set ?';
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
            var sql = 'update pacientesAlergias set ? where dniPaciente = ? and idAlergia = ?';
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
            var sql = "DELETE FROM pacientesAlergias WHERE dniPaciente = ? and idAlergia = ?";
            sql = mysql.format(sql, [pacienteAlergia.dniPaciente, pacienteAlergia.idAlergia]);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    }
}


module.exports = pacientesAlergiasDbApi;