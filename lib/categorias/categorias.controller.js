var express = require('express');
var router = express.Router();
var categoriasDb = require('./categorias.db_mysql');


router.get('/', function(req, res){
    categoriasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de categoria');
    categoriasDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('categoria no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var categoria = req.body;
    if (!categoria) return res.status(400).send('Debe incluir un objeto de tipo categoria en el cuerpo del mensaje');
    if (!categoria.id) {
         categoria.id = 0
         categoriasDb.post(categoria, function(err, data){
        if (err) return res.status(500).send(err.message);
            categoriasDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        categoriasDb.post(categoria, function(err, data){
            if (err) return res.status(500).send(err.message);
                categoriasDb.getById(categoria.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var categoria = req.body;
    if (!categoria) return res.status(400).send('Debe incluir un objeto categoria en el cuerpo del mensaje');
    categoriasDb.put(categoria, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        categoriasDb.getById(categoria.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    categoriasDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el categoria');
        res.send('Se ha borrado el categoria seleccionado');
    });
});



module.exports = router;