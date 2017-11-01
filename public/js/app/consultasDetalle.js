var vm;
var consultas;
var id;
var copiaId;
var paciente;
var empleado;

var cadena = location.href;

var apiConsultasDetalle = {
    ini: function() {
        var usuario = $.cookie('usuario_interdental');
        $('#usuario').text(' '+usuario);
        $("#fecha").datetimepicker({
            format: 'dd-mm-yyyy',
            language: 'es'
        });
        $('#cmbEstados').select2();
        $('#cmbPacientes').select2();
        $('#cmbEmpleados').select2();

        var indice = cadena.indexOf('id');
        id = cadena.substr(indice+3,);

        vm = new apiConsultasDetalle.datosPagina();
        ko.applyBindings(vm);

        apiConsultasDetalle.loadComboPacientes();
        apiConsultasDetalle.loadComboEmpleados();

        $('#consultaDetalle-form').submit(function () { return false; });
        $('#btnAceptar').click(apiConsultasDetalle.aceptar);

        if (id != 0){
            $('#dni').attr('readonly', 'readonly');
            apiConsultasDetalle.cargarconsulta(id);
        }
    },

    loadComboPacientes: function(consulta) {
        var url = '/api/pacientes';
        apiComunAjax.llamadaGeneral('GET', url, null, function(err, data){
            if (err) return;
            if(consulta != undefined){
                var options = [{ dni: "", paciente: "" }].concat(data);
                vm.optionsPacientes(options);
                $("#cmbPacientes option[value="+consulta.dniPaciente+"]").attr("selected",true).trigger('change');
            }else{
                var options = [{ dni: "", paciente: ""}].concat(data);
                vm.optionsPacientes(options);
                $("#cmbPacientes").val([0]).trigger('change');
            }
        });
    },

    loadComboEmpleados: function(consulta) {
        var url = '/api/trabajadores';
        apiComunAjax.llamadaGeneral('GET', url, null, function(err, data){
            if (err) return;
            if(consulta != undefined){
                var options = [{ dni: "", empleado: "" }].concat(data);
                vm.optionsEmpleados(options);
                $("#cmbEmpleados option[value="+consulta.dniEspecialista+"]").attr("selected",true).trigger('change');
            }else{
                var options = [{ dni: "", empleado: ""}].concat(data);
                vm.optionsEmpleados(options);
                $("#cmbEmpleados").val([0]).trigger('change');
            }
        });
    },


    loadComboEstado: function(consulta){
        $("#cmbEstados option[value="+ consulta.estado+"]").attr("selected",true).trigger('change');    
    },

    cargarDatosPagina: function(consulta){
            copiaId = consulta.id;
            id = consulta.id;
            vm.sintomas(consulta.sintomas);
            vm.diagnostico(consulta.diagnostico);
            vm.tratamiento(consulta.tratamiento);
            vm.fechaConsulta(moment(consulta.fecha).format('DD-MM-YYYY hh:mm'));
            apiConsultasDetalle.loadComboEmpleados(consulta);
            apiConsultasDetalle.loadComboPacientes(consulta);
            apiConsultasDetalle.loadComboEstado(consulta);
    },

    datosPagina: function() {
        var self = this;
        self.fechaConsulta = ko.observable();
        self.sintomas = ko.observable();
        self.diagnostico = ko.observable();
        self.tratamiento = ko.observable();
       

        self.optionsEstados = ko.observableArray([
            {
                'nombreEstado': ' ',
                'valorEstado': ' '
            }, 
            {
                'nombreEstado': 'Pendiente',
                'valorEstado': 'pendiente'
            }, 
            {
                'nombreEstado': 'Visitado',
                'valorEstado': 'visitado'
            }
        ]);
        self.selectedEstados = ko.observableArray([]);
        self.sEstado = ko.observable();
        
        self.optionsPacientes = ko.observableArray([]);
        self.selectedPacientes = ko.observableArray([]);
        self.sPaciente = ko.observable();

        self.optionsEmpleados = ko.observableArray([]);
        self.selectedEmpleados = ko.observableArray([]);
        self.sEmpleado= ko.observable();
    },

    cargarconsulta: function(id){
        apiComunAjax.llamadaGeneral("GET", "/api/consultas/"+id, null, function(err, data){
            if (err) return;
            apiConsultasDetalle.cargarDatosPagina(data[0]);
        });
    },

    aceptar: function(){
        if (!apiConsultasDetalle.datosOK()) return;
        var data = {
            id: id,
            estado: vm.sEstado(),
            dniPaciente: vm.sPaciente(),
            dniEspecialista: vm.sEmpleado(),
            fecha: moment(vm.fechaConsulta()).format('YYYY-MM-DD hh:mm'),
            sintomas: vm.sintomas(),
            diagnostico: vm.diagnostico(),
            tratamiento: vm.tratamiento()
        }
        var verbo = "POST"
        if (id > 0) verbo = "PUT";
        apiComunAjax.llamadaGeneral(verbo, "api/consultas", data, function(err, data){
            if (err) return;
            alert('exito');
        });
    },

    datosOK: function () {
       
        $('#consultaDetalle-form').validate({
            rules: {
                cmbEstados: { required: true },
                cmbPacientes: { required: true },
                cmbEmpleados: { required: true },
                fecha: { required: true, date: true },
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#consultaDetalle-form').valid();
    },

    salir: function(){
        window.open('consultasGeneral.html', '_self');
    }
}