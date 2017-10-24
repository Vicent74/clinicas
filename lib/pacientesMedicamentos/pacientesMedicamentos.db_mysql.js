var mysql = require('mysql'),
comun = require('../comun/comun');

var pacientesMedicamentosDbApi = {

    get: function(done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "SELECT * FROM pacientesMedicamentos";
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
            var sql = "select * from pacientesMedicamentos where dniPaciente = ?";
            sql = mysql.format(sql, dniPaciente);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data); 
            });
        });
    },

    post: function(pacienteMedicamento, done){
        comun.getConnectionCallBack(function(err, con){
            if(err) return done(err);
            var sql = 'insert into pacientesMedicamentos set ?';
            sql = mysql.format(sql, pacienteMedicamento);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    put: function(pacienteMedicamento, done){
        comun.getConnectionCallBack(function(err, con){
            if(err) return done(err);
            var sql = 'update pacientesMedicamentos set ? where dniPaciente = ? and idMedicamento = ?';
            sql = mysql.format(sql, [pacienteMedicamento[1], pacienteMedicamento[0].dniPaciente, pacienteMedicamento[0].idMedicamento]);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    delete: function(pacienteMedicamento, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "DELETE FROM pacientesMedicamentos WHERE dniPaciente = ? and idMedicamento = ?";
            sql = mysql.format(sql, [pacienteMedicamento.dniPaciente, pacienteMedicamento.idMedicamento]);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    }
}


module.exports = pacientesMedicamentosDbApi;