var data;

var apiPacientesGeneral = {
    ini: function() {
        var verbo = "GET";
        var url = "api/pacientes";
        var datos = null;
        
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#pacientes > a > i').attr('class', 'fa fa-chevron-left');
        $('#pacientes-form').submit(function () { return false; });
        $('#btnNuevo').click(apiPacientesGeneral.nuevo);
        apiComunAjax.llamadaGeneral(verbo, url, datos, function(err, data){
            if (err) {
                apiComunNotificaciones.errorAjax(err);
            }else{
                apiPacientesGeneral.iniUsuariosTabla();
                apiPacientesGeneral. cargaTablaPacientes(data);
            }
        });//lamada ajax que devuelve los pacientes existentes, un error si este se produce y si no carga los pacientes en tabla
    },

    iniUsuariosTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_pacientes');
        options.data = data;
        options.columns = [{
            data: "id"
        },{
            data: "dni"
        }, {
            data: "nombre"
        },{
            data: "apellido1"
        }, {
            data: "apellido2"
        },{
            data: "telefono"
        }, {
            data: "id",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPacientesGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPacientesGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
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
    },

    editar: function(id){
        window.open(sprintf('pacientesDetalle.html?id=%s', id), '_self');
    },

    eliminar: function(id){
        apiComunAjax.llamadaGeneral("DELETE", "api/pacientes/"+id, null, function(err, data){
            if (err) apiComunNotificaciones.errorAjax(err);
            location.reload(true);

        });
    }
   
}