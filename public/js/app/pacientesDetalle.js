var apiPacientesDetalle = {
    ini: function() {
        var usuario = $.cookie('usuario');
        $('#usuario').text(' '+usuario);
        $("#fecha").datetimepicker({
            format: 'dd-mm-yyyy',
            language: 'es'
        });
        $('#fuma').select2();
        $('#alcohol').select2();
        $('#sexo').select2();
        $('#cif').select2();

        var cabecera = window.location.href;
        var idPaciente = parseInt(cabecera.substring(47));
        console.log(id);
    },
}