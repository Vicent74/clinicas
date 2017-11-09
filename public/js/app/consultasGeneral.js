var data;

var apiConsultasGeneral = {
    ini: function() {
        var verbo = "GET";
        var url = "api/consultas";
        var datos = null;
        
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $('#consultas > a > i').attr('class', 'fa fa-chevron-left');
        $('#consultas-form').submit(function () { return false; });
        $('#btnNuevo').click(apiConsultasGeneral.nuevo);
        apiComunAjax.llamadaGeneral(verbo, url, datos, function(err, data){
            if (err) return;
            if(data.length > 0) data[0].fecha = moment(data[0].fecha).format('DD-MM-YYYY hh:mm');
            apiConsultasGeneral.iniconsultasTabla();
            apiConsultasGeneral. cargaTablaConsultas(data);
            
        });//lamada ajax que devuelve los consultas existentes, un error si este se produce y si no carga los consultas en tabla
    },

    iniconsultasTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_consultas');
        options.data = data;
        options.columns = [{
            data: "id"
        },{
            data: "estado"
        }, {
            data: "sintomas"
        },{
            data: "fecha"
        }, {
            data: "paciente"
        },{
            data: "dentista"
        }, {
            data: "id",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiConsultasGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiConsultasGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_consultas').DataTable(options);
    },

    cargaTablaConsultas: function(consultas){
        var dt = $('#dt_consultas').dataTable();
        dt.fnClearTable();
        if (consultas.length > 0) dt.fnAddData(consultas);
        dt.fnDraw();
    },

    nuevo: function(){
        window.open('consultasDetalle.html?id=0', '_self');
    },

    editar: function(id){
        window.open(sprintf('consultasDetalle.html?id=%s', id), '_self');
    },

    eliminar: function(id){
        apiComunAjax.llamadaGeneral("DELETE", "api/consultas/"+id, null, function(err, data){
            if (err);
            location.reload(true);
            
        });
    }
   
   
}