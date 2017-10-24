var express = require('express');
var router = express.Router();
var almacenesDb = require('./almacenes.db_mysql');


router.get('/', function(req, res){
    almacenesDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de almacen');
    almacenesDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('almacen no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var almacen = req.body;
    if (!almacen) return res.status(400).send('Debe incluir un objeto de tipo almacen en el cuerpo del mensaje');
    if (!almacen.id) {
         almacen.id = 0
         almacenesDb.post(almacen, function(err, data){
        if (err) return res.status(500).send(err.message);
            almacenesDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        almacenesDb.post(almacen, function(err, data){
            if (err) return res.status(500).send(err.message);
                almacenesDb.getById(almacen.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var almacen = req.body;
    if (!almacen) return res.status(400).send('Debe incluir un objeto almacen en el cuerpo del mensaje');
    almacenesDb.put(almacen, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        almacenesDb.getById(almacen.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    almacenesDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el almacen');
        res.send('Se ha borrado el almacen seleccionado');
    });
});



module.exports = router;