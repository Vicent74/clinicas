var express = require('express');
var router = express.Router();
var especialidadesDb = require('./especialidades.db_mysql');


router.get('/', function(req, res){
    especialidadesDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});



router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de especialidad');
    especialidadesDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('especialidad no encontrada en el sistema');
        res.json(data);
    });
});



router.post('/', function(req, res){
    var especialidad = req.body;
    if (!especialidad) return res.status(400).send('Debe incluir un objeto de tipo especialidad en el cuerpo del mensaje');
    if (!especialidad.id) {
         especialidad.id = 0
         especialidadesDb.post(especialidad, function(err, data){
        if (err) return res.status(500).send(err.message);
            especialidadesDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        especialidadesDb.post(especialidad, function(err, data){
            if (err) return res.status(500).send(err.message);
                especialidadesDb.getById(especialidad.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var especialidad = req.body;
    if (!especialidad) return res.status(400).send('Debe incluir un objeto especialidad en el cuerpo del mensaje');
    especialidadesDb.put(especialidad, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        especialidadesDb.getById(especialidad.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    especialidadesDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado la especialidad');
        res.send('Se ha borrado la especialidad seleccionada');
    });
});



module.exports = router;