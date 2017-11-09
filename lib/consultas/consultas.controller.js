var express = require('express');
var router = express.Router();
var consultasDb = require('./consultas.db_mysql');


router.get('/', function(req, res){
    consultasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/estado/:estado', function(req, res){
    var estado = req.params.estado;
    if (!estado) return res.status(400).send('Debe indicar el identificador de consulta');
    consultasDb.getByEstado(estado, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('estado no encontrado en el sistema');
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de consulta');
    consultasDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('consulta no encontrada en el sistema');
        res.json(data);
    });
});



router.post('/', function(req, res){
    var consulta = req.body;
    if (!consulta) return res.status(400).send('Debe incluir un objeto de tipo consulta en el cuerpo del mensaje');
    if (!consulta.id) {
         consulta.id = 0
         consultasDb.post(consulta, function(err, data){
        if (err) return res.status(500).send(err.message);
            consultasDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        consultasDb.post(consulta, function(err, data){
            if (err) return res.status(500).send(err.message);
                consultasDb.getById(consulta.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var consulta = req.body;
    if (!consulta) return res.status(400).send('Debe incluir un objeto consulta en el cuerpo del mensaje');
    consultasDb.put(consulta, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        consultasDb.getById(consulta.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    consultasDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado la consulta');
        res.json(data);
    });
});



module.exports = router;