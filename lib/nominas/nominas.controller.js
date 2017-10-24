var express = require('express');
var router = express.Router();
var nominasDb = require('./nominas.db_mysql');


router.get('/', function(req, res){
    nominasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});


router.get('/:dniEmpleado', function(req, res){
    var dniEmpleado = req.params.dniEmpleado;
    if (!dniEmpleado) return res.status(400).send('Debe indicar el DNI del empleado');
    nominasDb.getByDni(dniEmpleado, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('nomina no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var nomina = req.body;
    if (!nomina) return res.status(400).send('Debe incluir un objeto de tipo nomina en el cuerpo del mensaje');
    if (!nomina.id) {
         nomina.id = 0
         nominasDb.post(nomina, function(err, data){
        if (err) return res.status(500).send(err.message);
            nominasDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        nominasDb.post(nomina, function(err, data){
            if (err) return res.status(500).send(err.message);
                nominasDb.getById(nomina.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.post('/yearMoth', function(req, res){
    var body = req.body;
    if (!body) return res.status(400).send('Debe indicar el año y mes de la nomina');
    nominasDb.getByYearMoth(body, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('nomina no encontrada en el sistema');
        res.json(data);
    });

});

router.put('/', function(req, res){
    var nomina = req.body;
    if (!nomina) return res.status(400).send('Debe incluir un objeto nomina en el cuerpo del mensaje');
    nominasDb.put(nomina, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        nominasDb.getById(nomina.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    nominasDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado la nomina');
        res.send('Se ha borrado la nomina seleccionada');
    });
});



module.exports = router;