var express = require("express");
var router = express.Router();
var pacientesAlergiasDb = require("./pacientesAlergias.db_mysql");


router.get('/', function(req, res){
    pacientesAlergiasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:dniPaciente', function(req, res){
    var dniPaciente = req.params.dniPaciente;
    if (!dniPaciente) return res.status(400).send('Debe indicar el dniPaciente del empleado');
    pacientesAlergiasDb.getBydniPaciente(dniPaciente, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El empleado con dniPaciente '+dniPaciente+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var pacienteAlergia = req.body;
    if (!pacienteAlergia) return res.status(400).send('Debe incluir un objeto de pacienteAlergia en el cuerpo del mensaje');
    pacientesAlergiasDb.post(pacienteAlergia, function(err, data){
        if (err) return res.status(500).send(err.message);
        pacientesAlergiasDb.getBydniPaciente(pacienteAlergia.dniPaciente, function(err, data){
            if (err) res.status(500).send(err.message);
            var indice = data.length - 1;
            res.json(data[indice]);
        });
    });
});

router.put('/', function(req, res){
    var pacienteAlergia = req.body;
    if (!pacienteAlergia) return res.status(400).send('Debe incluir un objeto de pacienteAlergia en el cuerpo del mensaje');
    pacientesAlergiasDb.put(pacienteAlergia, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        pacientesAlergiasDb.getBydniPaciente(pacienteAlergia[0].dniPaciente, function(err, data){
            if (err) return res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/', function(req, res){
    var pacienteAlergia = req.body;
    if (!pacienteAlergia) return res.status(400).send('Debe indicar el dni del paciente y la alergia que padece para borrar');
    pacientesAlergiasDb.delete(pacienteAlergia, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el pacienteAlergia');
        res.send('Se ha borrado el pacienteAlergia seleccionado');
    });
});



module.exports = router;