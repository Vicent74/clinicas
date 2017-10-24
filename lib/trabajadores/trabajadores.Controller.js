var express = require("express");
var router = express.Router();
var trabajadoresDb = require("./trabajadores.db_mysql");


router.get('/', function(req, res){
    trabajadoresDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:dni', function(req, res){
    var dni = req.params.dni;
    if (!dni) return res.status(400).send('Debe indicar el DNI del empleado');
    trabajadoresDb.getBydni(dni, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El empleado con dni '+dni+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var trabajador = req.body;
    if (!trabajador) return res.status(400).send('Debe incluir un objeto de trabajador en el cuerpo del mensaje');
    trabajadoresDb.post(trabajador, function(err, data){
        if (err) return res.status(500).send(err.message);
        trabajadoresDb.getBydni(trabajador.dni, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.put('/', function(req, res){
    var trabajador = req.body;
    if (!trabajador) return res.status(400).send('Debe incluir un objeto de trabajador en el cuerpo del mensaje');
    trabajadoresDb.put(trabajador, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        trabajadoresDb.getBydni(trabajador.dni, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:dni', function(req, res){
    var dni = req.params.dni;
    if (!dni) return res.status(400).send('Debe indicar el DNI del empleado');
    trabajadoresDb.delete(dni, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el empleado');
        res.send('Se ha borrado el trabajador seleccionado');
    });
});



module.exports = router;