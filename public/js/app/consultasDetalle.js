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
        $('#consultas > a > i').attr('class', 'fa fa-chevron-left');
        $("#fecha").datetimepicker({
            format: 'dd-mm-yyyy hh:ii',
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
        $('#btnAceptar').click( apiConsultasDetalle.recuperaCifPaciente);
        $('#btnSalir').click(apiConsultasDetalle.salir);

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

    recuperaCifPaciente: function(){
        if (vm.sPaciente()){
            var url = '/api/pacientes/paciente/'+vm.sPaciente();
            apiComunAjax.llamadaGeneral('GET', url, null, function(err, data){
                if (err) return;
                paciente = data[0].cifClinica;
                apiConsultasDetalle.recuperaCifEmpleado();
            });
        }else{return;}
       
    },

    recuperaCifEmpleado: function(){
        if(vm.sEmpleado()){
            var url = '/api/trabajadores/trabajadores/'+ vm.sEmpleado();
            apiComunAjax.llamadaGeneral('GET', url, null, function(err, data){
                if (err) return;
                empleado = data[0].cifClinica;
                setTimeout(function() {
                    apiConsultasDetalle.aceptar();
                }, 1000);
                
            });
        }else{return;}
    },

    cargarDatosPagina: function(consulta){
            copiaId = consulta.id;
            id = consulta.id;
            vm.sintomas(consulta.sintomas);
            vm.diagnostico(consulta.diagnostico);
            vm.tratamiento(consulta.tratamiento);
            vm.fechaConsulta(moment(consulta.fecha).format('DD-MM-YYYY HH:mm:ss'));
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
       
        apiConsultasDetalle. recuperaCifEmpleado();
        if (!apiConsultasDetalle.datosOK()) return;

        var fechaCon = moment(vm.fechaConsulta(), "DD-MM-YYYY hh:mm").format('YYYY-MM-DD hh:mm');
        var data = {
            id: id,
            estado: vm.sEstado(),
            dniPaciente: vm.sPaciente(),
            dniEspecialista: vm.sEmpleado(),
            fecha: fechaCon,
            sintomas: vm.sintomas(),
            diagnostico: vm.diagnostico(),
            tratamiento: vm.tratamiento()
        }
        var verbo = "POST"
        if (id > 0) verbo = "PUT";
        apiComunAjax.llamadaGeneral(verbo, "api/consultas", data, function(err, data){
            if (err) return;
            window.open('consultasGeneral.html', '_self');
        });
    },

    datosOK: function () {

        $('#fechaConsulta').val( moment(vm.fechaConsulta(), "DD-MM-YYYY hh:mm").format('YYYY-MM-DD hh:mm'));

        $.validator.addMethod('cif', function(value, element){
            return this.optional(element) || paciente == empleado;
        });

        $('#consultaDetalle-form').validate({
            rules: {
                cmbEstados: { required: true },
                cmbPacientes: { required: true, cif: true },
                cmbEmpleados: { required: true, cif: true },
                fechaConsulta: { required: true, date: true },
            },
            messages: {
                cmbPacientes :'El empleado y el paciente tienen que pertenecer a la misma clinica',
                cmbEmpleados :'El empleado y el paciente tienen que pertenecer a la misma clinica'
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