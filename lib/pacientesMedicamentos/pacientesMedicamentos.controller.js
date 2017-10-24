var express = require("express");
var router = express.Router();
var pacientesMedicamentosDb = require("./pacientesMedicamentos.db_mysql");


router.get('/', function(req, res){
    pacientesMedicamentosDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:dniPaciente', function(req, res){
    var dniPaciente = req.params.dniPaciente;
    if (!dniPaciente) return res.status(400).send('Debe indicar el dniPaciente del empleado');
    pacientesMedicamentosDb.getBydniPaciente(dniPaciente, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El empleado con dniPaciente '+dniPaciente+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var pacienteMedicamento = req.body;
    if (!pacienteMedicamento) return res.status(400).send('Debe incluir un objeto de pacienteMedicamento en el cuerpo del mensaje');
    pacientesMedicamentosDb.post(pacienteMedicamento, function(err, data){
        if (err) return res.status(500).send(err.message);
        pacientesMedicamentosDb.getBydniPaciente(pacienteMedicamento.dniPaciente, function(err, data){
            if (err) res.status(500).send(err.message);
            var indice = data.length - 1;
            res.json(data[indice]);
        });
    });
});

router.put('/', function(req, res){
    var pacienteMedicamento = req.body;
    if (!pacienteMedicamento) return res.status(400).send('Debe incluir un objeto de pacienteMedicamento en el cuerpo del mensaje');
    pacientesMedicamentosDb.put(pacienteMedicamento, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        pacientesMedicamentosDb.getBydniPaciente(pacienteMedicamento[0].dniPaciente, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/', function(req, res){
    var pacienteMedicamento = req.body;
    if (!pacienteMedicamento) return res.status(400).send('Debe indicar el dni del paciente y la alergia que padece para borrar');
    pacientesMedicamentosDb.delete(pacienteMedicamento, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el pacienteMedicamento');
        res.send('Se ha borrado el pacienteMedicamento seleccionado');
    });
});



module.exports = router;