var vm;
var clinica;
var id;
var copiaCif;
var cadena = location.href;

var apiClinicasDetalle = {
    ini: function() {
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#clinicas > a > i').attr('class', 'fa fa-chevron-left');
        $("#fecha").datetimepicker({
            format: 'dd-mm-yyyy',
            language: 'es'
        });
       
    
        var indice = cadena.indexOf('id');
        id = cadena.substr(indice+3,);

        vm = new  apiClinicasDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#clinicaDetalle-form').submit(function () { return false; });
        $('#btnAceptar').click( apiClinicasDetalle.aceptar);
        $('#btnSalir').click(apiClinicasDetalle.salir);

        if (id != 0){
            $('#cif').attr('readonly', 'readonly');
             apiClinicasDetalle.cargarclinica(id);
        }else{
            vm.id(0);
        }
    },

    cargarDatosPagina: function(clinica){
            copiaCif = clinica.cif;
            id = clinica.id;
            vm.id(clinica.id);
            vm.cif(clinica.cif);
            vm.nombre(clinica.nombre);
            vm.direccion(clinica.direccion);
            vm.ciudad(clinica.ciudad);
            vm.provincia(clinica.provincia);
            vm.telefono(clinica.telefono);
            vm.email(clinica.email);
    },

    datosPagina: function() {
        var self = this;
        self.id = ko.observable();
        self.cif = ko.observable();
        self.nombre = ko.observable();
        self.direccion = ko.observable();
        self.ciudad = ko.observable();
        self.provincia = ko.observable();
        self.telefono = ko.observable();
        self.email = ko.observable();
    },

    cargarclinica: function(id){
        apiComunAjax.llamadaGeneral("GET", "/api/clinicas/"+id, null, function(err, data){
            if (err) return;
             apiClinicasDetalle.cargarDatosPagina(data[0]);
        });
    },

    aceptar: function(){
        if (! apiClinicasDetalle.datosOK()) return;
        var data = {
            id: id,
            id: vm.id(),
            cif: vm.cif(),
            nombre: vm.nombre(),
            direccion: vm.direccion(),
            ciudad: vm.ciudad(),
            provincia: vm.provincia(),
            telefono: vm.telefono(),
            email: vm.email()
        }
        var verbo = "POST"
        if (vm.cif() == copiaCif) verbo = "PUT";
        apiComunAjax.llamadaGeneral(verbo, "api/clinicas", data, function(err, data){
            if (err) return;
            window.open('clinicasGeneral.html', '_self');
        });
    },

    datosOK: function () {
       
        $.validator.addMethod('telefono', function(value, element){
            return this.optional(element) || /^([9|6|7]{1})(\d{8})$/.test(value);
        });

        $.validator.addMethod('movil', function(value, element){
            return this.optional(element) || /^([6|7]{1})(\d{8})$/.test(value);
        });

        $.validator.addMethod('email', function(value, element){
            return this.optional(element) ||  /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/.test(value);
        });

        $('#clinicaDetalle-form').validate({
            rules: {
                nombre: { required: true },
                direccion: { required: true },
                ciudad: { required: true },
                provincia: { required: true },
                telefono: { required: true, telefono: true }
            },
            messages: {
                cif:'formato cif/NIE incorrecto',
                telefono: 'Introduzca un numero fijo o movil valido',
                movil: 'Introduzca un numero de movil valido',
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#clinicaDetalle-form').valid();
    },

    salir: function(){
        window.open('clinicasGeneral.html', '_self');
    }
}