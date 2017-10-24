var mysql = require('mysql'),
    comun = require('../comun/comun');


var pacientesDbApi = {

    get: function(done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "SELECT * FROM pacientes";
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    getById: function(dniPaciente, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "select * from pacientes where dni = ?";
            sql = mysql.format(sql, dniPaciente);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data); 
            });
        });
    },

    post: function(paciente, done){
        comun.getConnectionCallBack(function(err, con){
            if(err) return done(err);
            var sql = 'insert into pacientes set ?';
            sql = mysql.format(sql, paciente);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    put: function(paciente, done){
        comun.getConnectionCallBack(function(err, con){
            if(err) return done(err);
            var sql = 'update pacientes set ? where dni = ?';
            sql = mysql.format(sql, [paciente, paciente.dni]);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    delete: function(dniPaciente, done){
        comun.getConnectionCallBack(function(err, con){
            if (err) return done(err);
            var sql = "DELETE FROM pacientes WHERE dni = ?";
            sql = mysql.format(sql, dniPaciente);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    }
}



module.exports = pacientesDbApi;