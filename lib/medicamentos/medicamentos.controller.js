var express = require('express');
var router = express.Router();
var medicamentosDb = require('./medicamentos.db_mysql');


router.get('/', function(req, res){
    medicamentosDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de medicamento');
    medicamentosDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('medicamento no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var medicamento = req.body;
    if (!medicamento) return res.status(400).send('Debe incluir un objeto de tipo medicamento en el cuerpo del mensaje');
    if (!medicamento.id) {
        medicamento.id = 0;
            medicamentosDb.post(medicamento, function(err, data){
                if (err) return res.status(500).send(err.message);
                    medicamentosDb.get(function(err, data){
                        if (err) return res.status(500).send(err.message);
                        var indice = data.length-1
                        res.json(data[indice]);
                    });
                
            });
    }else{
        medicamentosDb.post(medicamento, function(err, data){
            if (err) return res.status(500).send(err.message);
                medicamentosDb.getById(medicamento.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var medicamento = req.body;
    if (!medicamento) return res.status(400).send('Debe incluir un objeto medicamento en el cuerpo del mensaje');
    medicamentosDb.put(medicamento, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        medicamentosDb.getById(medicamento.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    medicamentosDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado la medicamento');
        res.send('Se ha borrado la medicamento seleccionada');
    });
});



module.exports = router;