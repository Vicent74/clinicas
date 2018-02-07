var express = require('express');
var router = express.Router();
var alergiasDb = require('./alergias.db_mysql');

realizo un cambio fatal
router.get('/', function(req, res){
    alergiasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de alergia');
    alergiasDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('Alergia no encontrada en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var alergia = req.body;
    if (!alergia) return res.status(400).send('Debe incluir un objeto de tipo alergia en el cuerpo del mensaje');
    if (!alergia.id) {
         alergia.id = 0
         alergiasDb.post(alergia, function(err, data){
        if (err) return res.status(500).send(err.message);
            alergiasDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        alergiasDb.post(alergia, function(err, data){
            if (err) return res.status(500).send(err.message);
                alergiasDb.getById(alergia.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var alergia = req.body;
    if (!alergia) return res.status(400).send('Debe incluir un objeto alergia en el cuerpo del mensaje');
    alergiasDb.put(alergia, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        alergiasDb.getById(alergia.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    alergiasDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado la alergia');
        res.send('Se ha borrado la alergia seleccionada');
    });
});



module.exports = router;