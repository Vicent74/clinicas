var express = require('express');
var router = express.Router();
var usuariosDb = require('./usuarios.db_mysql');


router.get('/', function(req, res){
    usuariosDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});



router.get('/:id', function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send('Debe indicar el identificador de usuario');
    usuariosDb.getById(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('usuario no encontrada en el sistema');
        res.json(data);
    });
});



router.post('/', function(req, res){
    var usuario = req.body;
    if (!usuario) return res.status(400).send('Debe incluir un objeto de tipo usuario en el cuerpo del mensaje');
    if (!usuario.id) {
         usuario.id = 0
         usuariosDb.post(usuario, function(err, data){
        if (err) return res.status(500).send(err.message);
            usuariosDb.get(function(err, data){
                if (err) return res.status(500).send(err.message);
                var indice = data.length-1
                res.json(data[indice]);
        });
    });
    }else{
        usuariosDb.post(usuario, function(err, data){
            if (err) return res.status(500).send(err.message);
                usuariosDb.getById(usuario.id, function(err, data){
                        if (err) return res.status(500).send(err.message);
                        res.json(data);
                    });
                });
    }
});

router.put('/', function(req, res){
    var usuario = req.body;
    if (!usuario) return res.status(400).send('Debe incluir un objeto usuario en el cuerpo del mensaje');
    usuariosDb.put(usuario, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha relizado ningún cambio');
        usuariosDb.getById(usuario.id, function(err, data){
            if (err) res.status(500).send(err.message);
            res.json(data);
        });
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    usuariosDb.delete(id, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('No se ha borrado el usuario');
        res.json(data);
    });
});

router.post('/login', function (req, res) {
    var usuario = req.body;
    if (usuario.length == 0) return res.status(400).send('Los campos login y password son obligatorios');
    usuariosDb.login(usuario.login, usuario.password, function (err, data) {
        if (err) return res.status(500).send(err.message);
        if(data.length == 0) return res.status(401).send('Login o password incorrectos, No autorizado');
            res.send(data);
    
    })
});


module.exports = router;