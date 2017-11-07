var vm;
var empleado;
var id;
var copiaDni;
var copiaCifClinica;
var cadena = location.href;

var apiEmpleadosDetalle = {
    ini: function() {
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#empleados > a > i').attr('class', 'fa fa-chevron-left');
        $("#fecha").datetimepicker({
            format: 'dd-mm-yyyy',
            language: 'es'
        });
       
        $('#cmbClinicas').select2();

        var indice = cadena.indexOf('id');
        id = cadena.substr(indice+3,);

        vm = new  apiEmpleadosDetalle.datosPagina();
        ko.applyBindings(vm);

         apiEmpleadosDetalle.loadComboClinicas();

        $('#empleadoDetalle-form').submit(function () { return false; });
        $('#btnAceptar').click( apiEmpleadosDetalle.aceptar);
        $('#btnSalir').click(apiEmpleadosDetalle.salir);

        if (id != 0){
            $('#dni').attr('readonly', 'readonly');
             apiEmpleadosDetalle.cargarempleado(id);
        }
    },

    loadComboClinicas: function(empleado) {
        var url = '/api/clinicas';
        apiComunAjax.llamadaGeneral('GET', url, null, function(err, data){
            if (err) return;
            if(empleado != undefined){
                var options = [{ cif: "", nombre: "" }].concat(data);
                vm.optionsClinicas(options);
                $("#cmbClinicas option[value="+empleado.cifClinica+"]").attr("selected",true).trigger('change');
            }else{
                var options = [{ cif: "", nombre: "" }].concat(data);
                vm.optionsClinicas(options);
                $("#cmbClinicas").val([0]).trigger('change');
            }
        });
    },

    
    cargarDatosPagina: function(empleado){
            copiaDni = empleado.dni;
            copiaCifClinica = empleado.cifClinica;
            id = empleado.id;
            vm.dni(empleado.dni);
            vm.nombre(empleado.nombre);
            vm.ape1(empleado.apellido1);
            vm.ape2(empleado.apellido2);
            vm.direccion(empleado.direccion);
            vm.ciudad(empleado.ciudad);
            vm.provincia(empleado.provincia);
            vm.telefono(empleado.telefono);
            vm.movil(empleado.movil);
            vm.email(empleado.email);
            vm.numCol(empleado.numeroColegiado);
            vm.puesto(empleado.puesto);
            vm.fechaNacimiento(moment(empleado.fechaNacimiento).format('DD-MM-YYYY'));
            apiEmpleadosDetalle.loadComboClinicas(empleado);
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
        self.numCol = ko.observable();
        self.puesto = ko.observable();
        self.optionsClinicas = ko.observableArray([]);
        self.selectedClinicas = ko.observableArray([]);
        self.sClinica = ko.observable();
    },

    cargarempleado: function(id){
        apiComunAjax.llamadaGeneral("GET", "/api/trabajadores/"+id, null, function(err, data){
            if (err) return;
             apiEmpleadosDetalle.cargarDatosPagina(data[0]);
        });
    },

    aceptar: function(){
        if (! apiEmpleadosDetalle.datosOK()) return;
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
            numeroColegiado: vm.numCol(),
            puesto: vm.puesto(),
            fechaNacimiento: moment(vm.fechaNacimiento()).format('YYYY-MM-DD'),
            cifClinica: vm.sClinica()
        }
        var verbo = "POST"
        if (vm.dni() == copiaDni) verbo = "PUT";
        apiComunAjax.llamadaGeneral(verbo, "api/trabajadores", data, function(err, data){
            if (err) return;
            alert('exito');
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

        $('#empleadoDetalle-form').validate({
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
                movil: { movil: true },
                email: { email: true },
                numCol: { required: true, digits: true, minlength: 8, maxlength: 8},
                puesto: { required: true }
            },
            messages: {
                dni:'formato DNI/NIE incorrecto',
                telefono: 'Introduzca un numero fijo o movil valido',
                movil: 'Introduzca un numero de movil valido',
                email: 'Introduzca un Email valido'
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#empleadoDetalle-form').valid();
    },

    salir: function(){
        window.open('empleadosGeneral.html', '_self');
    }
}