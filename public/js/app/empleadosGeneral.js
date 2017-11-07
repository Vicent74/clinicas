var data;

var apiEmpleadosGeneral = {
    ini: function() {
        var verbo = "GET";
        var url = "api/trabajadores";
        var datos = null;
        
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#empleados > a > i').attr('class', 'fa fa-chevron-left');
        $('#empleados-form').submit(function () { return false; });
        $('#btnNuevo').click(apiEmpleadosGeneral.nuevo);
        apiComunAjax.llamadaGeneral(verbo, url, datos, function(err, data){
            if (err) return;
            apiEmpleadosGeneral.iniUsuariosTabla();
            apiEmpleadosGeneral. cargaTablaempleados(data);
            
        });//lamada ajax que devuelve los empleados existentes, un error si este se produce y si no carga los empleados en tabla
    },

    iniUsuariosTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_empleados');
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
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiEmpleadosGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiEmpleadosGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_empleados').DataTable(options);
    },

    cargaTablaempleados: function(empleados){
        var dt = $('#dt_empleados').dataTable();
        dt.fnClearTable();
        if (empleados.length > 0) dt.fnAddData(empleados);
        dt.fnDraw();
    },

    nuevo: function(){
        window.open('empleadosDetalle.html?id=0', '_self');
    },

    editar: function(id){
        window.open(sprintf('empleadosDetalle.html?id=%s', id), '_self');
    },

    eliminar: function(id){
        apiComunAjax.llamadaGeneral("DELETE", "api/trabajadores/"+id, null, function(err, data){
            if (err)  return;
            location.reload(true);
        });
    }
   
}