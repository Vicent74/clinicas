var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jsonParser);

// mounting routes
var router = express.Router();

// using cors for cross class
app.use(cors());

// servidor html estático
app.use(express.static(__dirname + "/public"));


// -- general GET (to know if the server is up and runnig)
router.get('/', function (req, res) {
    res.json('CLINICAS / SERVER -- runnig');
});


app.use('/api/pacientes', require('./lib/pacientes/pacientes.controller'));
app.use('/api/clinicas', require('./lib/clinicas/clinicas.controller'));
app.use('/api/trabajadores', require('./lib/trabajadores/trabajadores.controller'));
app.use('/api/alergias', require('./lib/alergias/alergias.controller'));
app.use('/api/medicamentos', require('./lib/medicamentos/medicamentos.controller'));
app.use('/api/pacientesMedicamentos', require('./lib/pacientesMedicamentos/pacientesMedicamentos.controller'));
app.use('/api/pacientesAlergias', require('./lib/pacientesAlergias/pacientesAlergias.controller'));
app.use('/api/consultas', require('./lib/consultas/consultas.controller'));
app.use('/usuarios', require('./lib/usuarios/usuarios.controller'));
app.use('/api/especialidades', require('./lib/especialidades/especialidades.controller'));
app.use('/api/nominas', require('./lib/nominas/nominas.controller'));
app.use('/api/almacenes', require('./lib/almacenes/almacenes.controller'));
app.use('/api/materiales', require('./lib/materiales/materiales.controller'));
app.use('/api/categorias', require('./lib/categorias/categorias.controller'));
app.use('/api/estanterias', require('./lib/estanterias/estanterias.controller'));
app.listen(8099);

