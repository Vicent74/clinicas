var express = require("express");
var router = express.Router();
var clinicasDb = require("./clinicas.db_mysql");


router.get('/', function(req, res){
    clinicasDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:cif', function(req, res){
    var cif = req.params.cif;
    if (!cif) return res.status(400).send('Debe indicar el cif de la clinica');
    clinicasDb.getByCif(cif, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('El clinica con cif '+cif+' no se encueentra en el sistema');
        res.json(data);
    });
});

router.post('/', function(req, res){
    var clinica = req.body;
    if (!clinica) return res.status(400).send('Debe incluir un objeto de clinica en el cuerpo del mensaje');
    clinicasDb.post(clinica, function(err, data){
        if (clinica.cif == undefined || clinica.cif == "" || clinica.ciudad == undefined 
        ||  clinica.ciudad == "" || clinica.provincia == undefined 
        || clinica.provincia == "") return res.status(404).send('Faltan campos obligatorios');
        if (err) return res.status(500).send(err.message);
        clinicasDb.getByCif(clinica.cif, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.put('/', function(req, res){
    var clinica = req.body;
    if (!clinica) return res.status(400).send('Debe incluir un objeto de clinica en el cuerpo del mensaje');
    clinicasDb.put(clinica, function(err, data){
        if (err) return res.status(500).send(err.message);
            if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
            clinicasDb.getByCif(clinica.cif, function(err, data){
                if (err) res.status(500).send(err.message);
                res.json(data);
            })
    });
});

router.delete('/:cif', function(req, res){
    var cif = req.params.cif;
    if (!cif) return res.status(400).send('Debe indicar el cif de la clinica');
    clinicasDb.delete(cif, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el usuario');
        res.send('Se ha borrado la clinica seleccionada');
    });
});









module.exports = router;