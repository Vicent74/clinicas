var vm;
var usuario;
var id;
var cadena = location.href;

var apiUsuariosDetalle = {
    ini: function() {
        var usuario_cookie = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario_cookie);
        $('#usuarios > a > i').attr('class', 'fa fa-chevron-left');
        $('#usuarioDetalle-form').submit(function () { return false; });
    
        var indice = cadena.indexOf('id');
        id = cadena.substr(indice+3,);

        vm = new  apiUsuariosDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#btnAceptar').click(apiUsuariosDetalle.aceptar);
        $('#btnSalir').click(apiUsuariosDetalle.salir);

        if (id == 0){
            vm.id(0);
        }else{
            apiUsuariosDetalle.cargarusuario(id);
        }
    },

    cargarDatosPagina: function(usuario){
            vm.id(usuario.id);
            vm.login(usuario.login);
            vm.password(usuario.password);
    },

    datosPagina: function() {
        var self = this;
        self.id = ko.observable();
        self.login = ko.observable();
        self.password = ko.observable();
    },

    cargarusuario: function(id){
        apiComunAjax.llamadaGeneral("GET", "usuarios/"+id, null, function(err, data){
            if (err) return;
             apiUsuariosDetalle.cargarDatosPagina(data[0]);
        });
    },

    aceptar: function(){
        if (!apiUsuariosDetalle.datosOK()) return;
        var data = {
            id: vm.id(),
            login: vm.login(),
            password: vm.password()
        }
        var verbo = "POST"
        if (vm.id() > 0) verbo = "PUT";
        apiComunAjax.llamadaGeneral(verbo, "usuarios/", data, function(err, data){
            if (err) return;
            window.open('usuariosGeneral.html', '_self');
        });
    },

    datosOK: function () {
       
        $('#usuarioDetalle-form').validate({
            rules: {
                login: { required: true },
                password: { required: true },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#usuarioDetalle-form').valid();
    },

    salir: function(){
        window.open('usuariosGeneral.html', '_self');
    }
}