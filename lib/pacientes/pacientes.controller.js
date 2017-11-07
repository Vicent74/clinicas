var express = require("express");
var router = express.Router();
var pacientesDb = require("./pacientes.db_mysql");

router.get('/', function(req, res){
    pacientesDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:idPaciente', function(req, res){
    var idPaciente = req.params.idPaciente;
    pacientesDb.getById(idPaciente, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El paciente con id '+idPaciente+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var paciente = req.body;
    pacientesDb.post(paciente, function(err, data){
        if (err) return res.status(500).send(err.message);
        pacientesDb.getById(paciente.dni, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.put('/', function(req, res){
    var paciente = req.body;
    pacientesDb.put(paciente, function(err, data){
        if (err) return res.status(500).send(err.message);
            if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
            pacientesDb.getById(paciente.id, function(err, data){
                if (err) res.status(500).send(err.message);
                res.json(data);
            })
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    pacientesDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el paciente');
        res.send('Se ha borrado el paciente seleccionado');
    });
});



module.exports = router;