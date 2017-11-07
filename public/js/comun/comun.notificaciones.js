var apiComunNotificaciones = {
   errorAjax: function (err) {
        dhtmlx.alert({
            title:"Alert",
            type:"alert-error",
            text:"<h4>Se ha producido un error de servidor</h4> "+err.status+' '+ err.statusText+' '+err.responseText
        });
    },
}