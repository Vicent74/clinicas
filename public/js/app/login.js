/*Funciones propias de la página login.html*/
var vm;


var apiPaginaLogin = {
    ini: function(){
        $.backstretch("imagenes_optimizadas/dentista2.jpg");
        vm = new this.datosPagina();
        ko.applyBindings(vm);
        $('#btnEnviar').click(this.btnLogin);
        $("#login-form").submit(function () { return false; });
    },
    datosPagina: function(){
        var self = this;
        self.login = ko.observable();
        self.password = ko.observable();
    },
    btnLogin: function () {
        if (!apiPaginaLogin.datosOK()) return;
        var data = {

                "login": vm.login(),
                "password": vm.password()
            
        };
        apiPaginaLogin.lanzarLogin(data);
    },
    datosOK: function () {
        
        $('#login-form').validate({
            rules: {
                login: { required: true },
                password: { required: true }
            },
            messages: {
                login: {
                    required: "Campo obligatorio",

                },
                password: {
                    required: "Campo obligatorio"
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#login-form').valid();
    },

    lanzarLogin: function (data) {
        apiComunAjax.llamadaGeneral("POST", "/usuarios/login", data, function (err, data) {
            if (err) return;
            if (!data) {
                this.mostrarMensaje('Login y/o password incorrectos');
            } else {
        
                $.cookie('usuario', data[0].login, {path: '/'});
                window.open('Index.html', '_self');
            }
        });
    },
    mostrarMensaje: function (mensaje) {
        $("#mensaje").text(mens);
    },
}
   
    
    