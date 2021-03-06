var responsiveHelper_dt_basic = undefined;
var responsiveHelper_datatable_fixed_column = undefined;
var responsiveHelper_datatable_col_reorder = undefined;
var responsiveHelper_datatable_tabletools = undefined;

var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};




var apiComunGeneral = {
    
    initTableOptions: function (table) {
        var options = {
            "sDom": "<'dt-toolbar'<'col-lg-4 col-xs-12 col-sm-6 col-lg-12'f><'col-lg-2 col-sm-6 col-xs-12  hidden-sm hidden-xs'l><'col-lg-3 col-sm-6 col-xs-12 hidden-xs'C><'col-lg-3 col-sm-6 col-xs-12 hidden-xs'T >r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            "oColVis": {
                "buttonText": "Mostrar / ocultar columnas"
            },
            "oTableTools": {
                "aButtons": [
                    {
                        "sExtends": "pdf",
                        "sTitle": "Registros Seleccionadas",
                        "sPdfMessage": "proasistencia PDF Export",
                        "sPdfSize": "A4",
                        "sPdfOrientation": "landscape",
                        "oSelectorOpts": { filter: 'applied', order: 'current' }
                    },
                    {
                        "sExtends": "csv",
                        "sMessage": "Registros filtradas <i>(pulse Esc para cerrar)</i>",
                        "oSelectorOpts": { filter: 'applied', order: 'current' }
                    },
                    {
                        "sExtends": "xls",
                        "sMessage": "Registros filtradas <i>(pulse Esc para cerrar)</i>",
                        "oSelectorOpts": { filter: 'applied', order: 'current' }
                    }
                ],
                "sSwfPath": "js/libs/datatables/swf/copy_csv_xls_pdf.swf"
            },
            "autoWidth": true,
            "preDrawCallback": function () {
                // Initialize the responsive datatables helper once.
                if (!responsiveHelper_dt_basic) {
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#' + table), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_dt_basic.createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_dt_basic.respond();
            }
        };
       
        return options;
    }
}