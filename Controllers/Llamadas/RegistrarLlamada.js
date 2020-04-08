$(function(){


    // TouchSpin    
    $("#txtValor_Mensual").TouchSpin({
        min: 0,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000
    });


    // Rango Fecha corporativo
    $("#Fecha_Corporativo").datepicker({
        language: "es",
        format: 'yyyy/mm/dd',
        autoclose: true,
        todayHighlight: true,
    });

     // DatePicker fecha
    //  $("#txtFecha").datepicker({
    //     language: "es",
    //     format: 'yyyy/mm/dd',
    //     autoclose: true,
    //     todayHighlight: true,
    // });

    // Fecha hora Cita
    $('#date-format').bootstrapMaterialDatePicker({ 
        lang : 'es',
        format: 'dddd DD MMMM YYYY - HH:mm',
        minDate: new Date(),
        switchOnClick : true,
        shortTime : true
     });

    //  Select razones
     $(".Select_Razones").select2({
        tags: true,
        tokenSeparators: [","]
     });
});