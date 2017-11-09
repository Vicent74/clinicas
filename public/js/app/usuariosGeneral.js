var data;

var apiUsuariosGeneral = {
    ini: function() {
        var verbo = "GET";
        var url = " /usuarios";
        var datos = null;
        
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#usuarios > a > i').attr('class', 'fa fa-chevron-left');
        $('#usuarios-form').submit(function () { return false; });
        $('#btnNuevo').click(apiUsuariosGeneral.nuevo);
        apiComunAjax.llamadaGeneral(verbo, url, datos, function(err, data){
            if (err) return
            apiUsuariosGeneral.iniUsuariosTabla();
            apiUsuariosGeneral. cargaTablaUsuarios(data);
            
        });//lamada ajax que devuelve los usuarios existentes, un error si este se produce y si no carga los usuarios en tabla
    },

    iniUsuariosTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_usuarios');
        options.data = data;
        options.columns = [{
            data: "id"
        },{
            data: "login"
        }, {
            data: "password"
        }, {
            data: "id",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiUsuariosGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiUsuariosGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_usuarios').DataTable(options);
    },

    cargaTablaUsuarios: function(usuarios){
        var dt = $('#dt_usuarios').dataTable();
        dt.fnClearTable();
        if (usuarios.length > 0) dt.fnAddData(usuarios);
        dt.fnDraw();
    },

    nuevo: function(){
        window.open('usuariosDetalle.html?id=0', '_self');
    },

    editar: function(id){
        window.open(sprintf('usuariosDetalle.html?id=%s', id), '_self');
    },

    eliminar: function(id){
        apiComunAjax.llamadaGeneral("DELETE", "/usuarios/"+id, null, function(err, data){
            if (err) return; 
            location.reload(true);
        });
    }
   
}