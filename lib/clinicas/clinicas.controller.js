var express = require("express");
var router = express.Router();
var clinicasDb = require("./clinicas.db_mysql");


router.get('/', function(req, res){
    clinicasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar la id de la clinica');
    clinicasDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El clinica con id '+id+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var clinica = req.body;
    if (!clinica) return res.status(400).send('Debe incluir un objeto de clinica en el cuerpo del mensaje');
    clinicasDb.post(clinica, function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.put('/', function(req, res){
    var clinica = req.body;
    if (!clinica) return res.status(400).send('Debe incluir un objeto de clinica en el cuerpo del mensaje');
    clinicasDb.put(clinica, function(err, data){
        if (err) return res.status(500).send(err.message);
            if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
            clinicasDb.getById(clinica.id, function(err, data){
                if (err) res.status(500).send(err.message);
                res.json(data);
            })
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar la id de la clinica');
    clinicasDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el usuario');
        res.json(data);
    });
});









module.exports = router;