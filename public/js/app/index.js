/*Funciones propias de la página index.html*/

var apiPaginaIndex = {
    ini: function(){
        if (!$.cookie('usuario_interdental')) window.open('login.html', '_self');
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#index').attr('class', 'active');
    }
}