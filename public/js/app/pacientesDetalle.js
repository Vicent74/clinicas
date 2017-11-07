var vm;
var pacientes;
var id;
var copiaDni;
var copiaCifClinica;
var cadena = location.href;

var apiPacientesDetalle = {
    ini: function() {
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#pacientes > a > i').attr('class', 'fa fa-chevron-left');
        $("#fecha").datetimepicker({
            format: 'dd-mm-yyyy',
            language: 'es'
        });
        $('#fuma').select2();
        $('#alcohol').select2();
        $('#sexo').select2();
        $('#cmbClinicas').select2();

        var indice = cadena.indexOf('id');
        id = cadena.substr(indice+3,);

        vm = new apiPacientesDetalle.datosPagina();
        ko.applyBindings(vm);

        apiPacientesDetalle.loadComboClinicas();

        $('#pacienteDetalle-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPacientesDetalle.aceptar);
        $('#btnSalir').click(apiPacientesDetalle.salir);

        if (id != 0){
            $('#dni').attr('readonly', 'readonly');
            apiPacientesDetalle.cargarPaciente(id);
        }
    },

    loadComboClinicas: function(paciente) {
        var url = '/api/clinicas';
        apiComunAjax.llamadaGeneral('GET', url, null, function(err, data){
            if (err) return;
            if(paciente != undefined){
                var options = [{ cif: "", nombre: "" }].concat(data);
                vm.optionsClinicas(options);
                $("#cmbClinicas option[value="+paciente.cifClinica+"]").attr("selected",true).trigger('change');
            }else{
                var options = [{ cif: "", nombre: "" }].concat(data);
                vm.optionsClinicas(options);
                $("#cmbClinicas").val([0]).trigger('change');
            }
        });
    },

    loadCombos: function(paciente){
        $("#sexo option[value="+ paciente.sexo+"]").attr("selected",true).trigger('change');
        $("#fuma option[value="+ paciente.fuma+"]").attr("selected",true).trigger('change');
        $("#alcohol option[value="+ paciente.alcohol+"]").attr("selected",true).trigger('change');
        
    },

    cargarDatosPagina: function(paciente){
            copiaDni = paciente.dni;
            copiaCifClinica = paciente.cifClinica;
            id = paciente.id;
            vm.dni(paciente.dni);
            vm.nombre(paciente.nombre);
            vm.ape1(paciente.apellido1);
            vm.ape2(paciente.apellido2);
            vm.direccion(paciente.direccion);
            vm.ciudad(paciente.ciudad);
            vm.provincia(paciente.provincia);
            vm.telefono(paciente.telefono);
            vm.movil(paciente.movil);
            vm.email(paciente.email);
            vm.fechaNacimiento(moment(paciente.fechaNacimiento).format('DD-MM-YYYY'));
            apiPacientesDetalle.loadCombos(paciente);
            apiPacientesDetalle.loadComboClinicas(paciente);
    },

    datosPagina: function() {
        var self = this;
        self.dni = ko.observable();
        self.nombre = ko.observable();
        self.ape1 = ko.observable();
        self.ape2 = ko.observable();
        self.direccion = ko.observable();
        self.ciudad = ko.observable();
        self.provincia = ko.observable();
        self.telefono = ko.observable();
        self.movil = ko.observable();
        self.fechaNacimiento = ko.observable();
        self.email = ko.observable();

        self.opcionesSexo = ko.observableArray([
            {
                'nombreSexo': '',
                'valorSexo': ''
            }, 
            {
                'nombreSexo': 'Hombre',
                'valorSexo': 'H'
            }, 
            {
                'nombreSexo': 'Mujer',
                'valorSexo': 'M'
            }
        ]);
        self.selectedSexos = ko.observableArray([]);
        self.sSexo = ko.observable()

        self.opcionesAlcohol = ko.observableArray([
            {
                'tomaAlcohol': '',
                'valorAlcohol': ''
            }, 
            {
                'tomaAlcohol': 'Si',
                'valorAlcohol': 'si'
            }, 
            {
                'tomaAlcohol': 'No',
                'valorAlcohol': 'no'
            }, 
            {
                'tomaAlcohol': 'Ocasionalmente',
                'valorAlcohol': 'ocasionalmente'
            }
        ]);
        self.selectedAlcohol = ko.observableArray([]);
        self.sAlcohol = ko.observable();

        self.opcionesFuma = ko.observableArray([
            {
                'nombreFuma': '',
                'valorFuma': ''
            }, 
            {
                'nombreFuma': 'Si',
                'valorFuma': 'si'
            }, 
            {
                'nombreFuma': 'No',
                'valorFuma': 'no'
            }, 
            {
                'nombreFuma': 'Ocasionalmente',
                'valorFuma': 'ocasionalmente'
            }
        ]);
        self.selectedFuma = ko.observableArray([]);
        self.sFuma = ko.observable();

        self.optionsClinicas = ko.observableArray([]);
        self.selectedClinicas = ko.observableArray([]);
        self.sClinica = ko.observable();
    },

    cargarPaciente: function(id){
        apiComunAjax.llamadaGeneral("GET", "/api/pacientes/"+id, null, function(err, data){
            if (err) return;
            apiPacientesDetalle.cargarDatosPagina(data[0]);
        });
    },

    aceptar: function(){
        if (!apiPacientesDetalle.datosOK()) return;
        var data = {
            id: id,
            dni: vm.dni(),
            nombre: vm.nombre(),
            apellido1: vm.ape1(),
            apellido2: vm.ape2(),
            direccion: vm.direccion(),
            ciudad: vm.ciudad(),
            provincia: vm.provincia(),
            telefono: vm.telefono(),
            movil: vm.movil(),
            sexo: vm.selectedSexos(),
            fechaNacimiento: moment(vm.fechaNacimiento()).format('YYYY-MM-DD'),
            alcohol: vm.selectedAlcohol(),
            fuma: vm.selectedFuma(),
            cifClinica: vm.sClinica()
        }
        var verbo = "POST"
        if (vm.dni() == copiaDni) verbo = "PUT";
        apiComunAjax.llamadaGeneral(verbo, "api/pacientes", data, function(err, data){
            if (err) return;
            window.open('pacientesGeneral.html', '_self');
        });
    },

    datosOK: function () {
       
        $.validator.addMethod('dni', function(value, element){
            return this.optional(element) || /^(([X-Z]{1})(\d{7})([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))$/.test(value);
        });

        $.validator.addMethod('telefono', function(value, element){
            return this.optional(element) || /^([9|6|7]{1})(\d{8})$/.test(value);
        });

        $.validator.addMethod('movil', function(value, element){
            return this.optional(element) || /^([6|7]{1})(\d{8})$/.test(value);
        });

        $.validator.addMethod('email', function(value, element){
            return this.optional(element) ||  /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/.test(value);
        });

        $('#pacienteDetalle-form').validate({
            rules: {
                cmbClinicas: { required: true },
                fechaNacimiento: { required: true, date: true },
                dni: { required: true, dni:true, minlength: 9, maxlength: 9 },
                nombre: { required: true },
                ape1: { required: true },
                direccion: { required: true },
                ciudad: { required: true },
                provincia: { required: true },
                telefono: { required: true, telefono: true },
                email: { email: true },
                sexo: { required: true},
                fuma:{ required: true },
                alcohol: { required: true }
            },
            messages: {
                dni:'formato DNI/NIE incorrecto',
                telefono: 'Introduzca un numero fijo o movil valido',
                telefono: 'Introduzca un numero de movil valido',
                email: 'Introduzca un Email valido'
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#pacienteDetalle-form').valid();
    },

    salir: function(){
        window.open('pacientesGeneral.html', '_self');
    }
}