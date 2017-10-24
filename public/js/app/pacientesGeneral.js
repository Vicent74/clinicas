var data;

var apiPaginaPacientesGeneral = {
    ini: function() {
        var verbo = "GET";
        var url = "api/pacientes";
        var datos = null;
        
        var usuario = $.cookie('usuario');
        $('#usuario').text(' '+usuario);
        $('#pacientes').attr('class', 'active');
        $('#pacientes-form').submit(function () { return false; });
        $('#btnNuevo').click(apiPaginaPacientesGeneral.nuevo);
        apiComunAjax.llamadaGeneral(verbo, url, datos, function(err, data){
            if (err) {
                apiComunNotificaciones.errorAjax(err);
            }else{
                apiPaginaPacientesGeneral.iniUsuariosTabla();
                apiPaginaPacientesGeneral. cargaTablaPacientes(data);
            }
        });//lamada ajax que devuelve los pacientes existentes, un error si este se produce y si no carga los pacientes en tabla
    },

    iniUsuariosTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_pacientes');
        options.data = data;
        options.columns = [{
            data: "dni"
        }, {
            data: "nombre"
        }, {
            data: "telefono"
        }, {
            data: "dni",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaPacientesGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaPacientesGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_pacientes').DataTable(options);
    },

    cargaTablaPacientes: function(pacientes){
        var dt = $('#dt_pacientes').dataTable();
        dt.fnClearTable();
        if (pacientes.length > 0) dt.fnAddData(pacientes);
        dt.fnDraw();
    },

    nuevo: function(){
        window.open('pacientesDetalle.html?id=0', '_self');
    }
}