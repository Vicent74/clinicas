var express = require("express");
var router = express.Router();
var estanteriasDb = require("./estanterias.db_mysql");


router.get('/', function(req, res){
    estanteriasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:numeroEstanteria', function(req, res){
    var numeroEstanteria = req.params.numeroEstanteria;
    if (!numeroEstanteria) return res.status(400).send('Debe indicar el numero de estanteria del almacen');
    estanteriasDb.getBynumeroEstanteria(numeroEstanteria, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('La estanteria '+numeroEstanteria+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var estanteria = req.body;
    if (!estanteria) return res.status(400).send('Debe incluir un objeto de estanteria en el cuerpo del mensaje');
    estanteriasDb.post(estanteria, function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.put('/', function(req, res){
    var estanteria = req.body;
    if (!estanteria) return res.status(400).send('Debe incluir un objeto de estanteria en el cuerpo del mensaje');
    estanteriasDb.put(estanteria, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        estanteriasDb.getBydniPaciente(estanteria.dniPaciente, function(err, data){
            if (err) return res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/', function(req, res){
    var estanteria = req.body;
    if (!estanteria) return res.status(400).send('Debe indicar el dni del paciente y la alergia que padece para borrar');
    estanteriasDb.delete(estanteria, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el estanteria');
        res.send('Se ha borrado el estanteria seleccionado');
    });
});



module.exports = router;