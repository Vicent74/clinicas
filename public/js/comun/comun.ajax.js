/*
comun.ajax.js
Funciones generales generales de llamadas ajax (JQUERY)
*/
var apiComunAjax = {
   llamadaGeneral: function (verbo, url, datos, fretorno) {
       var opciones = {
           type: verbo,
           url: url,
           dataType: "json",
           contentType: "application/json",
           success: function (data, status) {
               fretorno(null, data);
           },
           error: function (err) {
               if(err.status != 200){
               apiComunNotificaciones.errorAjax(err);
               fretorno(err);
            }
           }
       };
       if (datos) {
           opciones.data = JSON.stringify(datos);
       }
       $.ajax(opciones);
   }
}