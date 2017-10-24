/*Funciones propias de la página index.html*/

var apiPaginaIndex = {
    ini: function(){
        if (!$.cookie('usuario')) window.open('login.html', '_self');
        var usuario = $.cookie('usuario');
        $('#usuario').text(' '+usuario);
        $('#index').attr('class', 'active');
    }
}