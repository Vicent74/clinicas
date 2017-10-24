var express = require('express');
var router = express.Router();
var materialesDb = require('./materiales.db_mysql');


router.get('/', function(req, res){
    materialesDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de material');
    materialesDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('material no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var material = req.body;
    if (!material) return res.status(400).send('Debe incluir un objeto de tipo material en el cuerpo del mensaje');
    if (!material.id) {
         material.id = 0
         materialesDb.post(material, function(err, data){
        if (err) return res.status(500).send(err.message);
            materialesDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        materialesDb.post(material, function(err, data){
            if (err) return res.status(500).send(err.message);
                materialesDb.getById(material.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var material = req.body;
    if (!material) return res.status(400).send('Debe incluir un objeto material en el cuerpo del mensaje');
    materialesDb.put(material, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        materialesDb.getById(material.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    materialesDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el material');
        res.send('Se ha borrado el material seleccionado');
    });
});



module.exports = router;