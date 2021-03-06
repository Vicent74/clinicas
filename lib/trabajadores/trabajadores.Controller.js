var express = require("express");
var router = express.Router();
var trabajadoresDb = require("./trabajadores.db_mysql");


router.get('/', function(req, res){
    trabajadoresDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el id del empleado');
    trabajadoresDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El empleado con id '+dni+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.get('/trabajadores/:dni', function(req, res){
    var dni = req.params.dni;
    if (!dni) return res.status(400).send('Debe indicar el id del empleado');
    trabajadoresDb.getByDni(dni, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El empleado con dni '+dni+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.get('/empleado/pacientes/:cifClinica', function(req, res ){
    var cifClinica = req.params.cifClinica;
    trabajadoresDb.getByCif(cifClinica, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('consulta no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var trabajador = req.body;
    if (!trabajador) return res.status(400).send('Debe incluir un objeto de trabajador en el cuerpo del mensaje');
    trabajadoresDb.post(trabajador, function(err, data){
        if (err) return res.status(500).send(err.message);
        trabajadoresDb.getById(trabajador.dni, function(err, data){
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
        trabajadoresDb.getById(trabajador.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar la id del empleado');
    trabajadoresDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el empleado');
        res.json(data);
    });
});



module.exports = router;