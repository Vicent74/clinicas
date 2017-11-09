var data;

var apiClinicasGeneral = {
    ini: function() {
        var verbo = "GET";
        var url = "api/clinicas";
        var datos = null;
        
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#clinicas > a > i').attr('class', 'fa fa-chevron-left');
        $('#clinicas-form').submit(function () { return false; });
        $('#btnNuevo').click(apiClinicasGeneral.nuevo);
        apiComunAjax.llamadaGeneral(verbo, url, datos, function(err, data){
            if (err) return
            apiClinicasGeneral.iniUsuariosTabla();
            apiClinicasGeneral. cargaTablaClinicas(data);
            
        });//lamada ajax que devuelve los clinicas existentes, un error si este se produce y si no carga los clinicas en tabla
    },

    iniUsuariosTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_clinicas');
        options.data = data;
        options.columns = [{
            data: "id"
        },{
            data: "cif"
        }, {
            data: "nombre"
        },{
            data: "email"
        }, {
            data: "direccion"
        },{
            data: "ciudad"
        },{
            data: "provincia"
        },{
            data: "telefono"
        }, {
            data: "id",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiClinicasGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiClinicasGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_clinicas').DataTable(options);
    },

    cargaTablaClinicas: function(clinicas){
        var dt = $('#dt_clinicas').dataTable();
        dt.fnClearTable();
        if (clinicas.length > 0) dt.fnAddData(clinicas);
        dt.fnDraw();
    },

    nuevo: function(){
        window.open('clinicasDetalle.html?id=0', '_self');
    },

    editar: function(id){
        window.open(sprintf('clinicasDetalle.html?id=%s', id), '_self');
    },

    eliminar: function(id){
        apiComunAjax.llamadaGeneral("DELETE", "api/clinicas/"+id, null, function(err, data){
            if (err) return; 
            location.reload(true);
        });
    }
   
}