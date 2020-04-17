//API
const URL = 'http://localhost:8081';

// Variables globales de control
var UsuarioBD;
var UsuarioValido = false;

// Para editar
var Id_Cliente;
var Id_DBL;
var Id_Plan_Corporativo;
var Id_Documentos;



$(function(){

    var stepPlanCorp;
    var stepDoc;
    var form = $("#Form_Editar_Clientes").show();

    form.steps({
        headerTag: "h6",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#</span> #title#',
        onInit: function (event, currentIndex) {

            // Validacion de steps
            stepPlanCorp = form.steps("getStep", 2);
            stepDoc = form.steps("getStep", 3);
            form.steps("remove", 2);
            form.steps("remove", 2);

            // Inicializar selects del formulario
            CargarDatosUbicacion();
           
            // select calificacion
            // Select razones.

            if(sessionStorage.DetalleLineas){
                sessionStorage.removeItem("DetalleLineas");
            }

        },
        onStepChanging: function (event, currentIndex, newIndex) {
            return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden, .detalleLinea", form.valid())
        },
        onFinishing: function (event, currentIndex) {
            return form.validate().settings.ignore = ":disabled, .detalleLinea", form.valid()
        },
        onFinished: function (event, currentIndex) {

            if(sessionStorage.DatosUbicacion){
                sessionStorage.removeItem("DatosUbicacion");
            }
            EditarCliente();
        }
    }),
    form.validate({
            ignore: "input[type=hidden]",
            successClass: "text-success",
            errorClass: "form-control-feedback",
            errorElement: "div",
            errorPlacement: function (error, element) {

                if (element[0].id == "txtDetalle_Valor_Mensual") {
                    error.insertAfter(element.parent(".input-group"));
                } else if(element[0].name == "detalleLineasRadios" ) {

                    error.insertAfter($("#lblDetalle_radio2"));

                }
                else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parents(".form-group").addClass("has-danger").removeClass("has-success");
                $(element).addClass("form-control-danger").removeClass("form-control-success");
            },
            unhighlight: function (element) {
                $(element).parents(".form-group").addClass("has-success").removeClass("has-danger");
                $(element).addClass("form-control-success").removeClass("form-control-danger");
            },
            rules: {
                txtRazonSocial:{
                    required: true,
                    minlength: 5,
                    SoloAlfanumericos: true
                },
                txtTelefono: {
                    required: true,
                    SoloNumeros: true,
                    minlength: 5,
                    maxlength: 10,
                },
                txtNIT: {
                    ValidarNIT: true,
                    minlength: 5
                },
                txtEncargado: {
                    SoloLetras: true
                },
                txtExt_Tel_Contacto: {
                    SoloNumeros: true,
                    minlength: 5,
                    maxlength: 10
                },
                // txtPais: "required",
                // txtDepartamento: "required",
                // txtMunicipio: "required",
                // txtSubTipo: "required",
                // txtNombre_Lugar: "required",
                // txtDireccion: "required",
                
                // txtCantidad_Total_Lineas: {
                //     required: true,
                //     SoloNumeros: true,
                // },
                txtOperador: "required",
                // txtValor_Total_Mensual: {
                //     SoloNumeros: true
                // },
                txtDetalle_Cantidad_Lineas:{
                    required: true,
                    SoloNumeros: true
                },
                txtDetalle_Valor_Mensual:{
                    required: true,
                    SoloNumeros: true
                },
                detalleLineasRadios: "required",
                txtDetalleNavegacion: {
                   SoloNumeros: true
                },
                txtDetalle_Minutos: {
                    SoloAlfanumericos: true
                },
                txtDetalle_Minutos_Otro:{
                    SoloAlfanumericos: true
                }
            }
    });

    // // Inicializar elementos:

    // // TouchSpin    
    // $("#txtValor_Total_Mensual").TouchSpin({
    //     min: 0,
    //     max: 1000000000,
    //     stepinterval: 50,
    //     maxboostedstep: 10000000,
    //     postfix: 'COP'
    // });

    //  Select razones
    $(".Select_Razones").select2({
        tags: true,
        tokenSeparators: [","]
    });

    // bootstrap-switch
    $('.switch_corporativo').bootstrapSwitch({
        onText: "SI",
        offText: "NO",
        onColor: "success",
        offColor: "danger"
    });
  
    
    // Enlazar eventos de escucha: 
    
    // Estado del switch Plan corporativo
    $('.switch_corporativo').on('switchChange.bootstrapSwitch', function (event, state) {

        if (state) {
            form.steps("insert", 2, stepPlanCorp);
           

            // Rango Fecha corporativo
            $("#Fecha_Corporativo").datepicker({
                language: "es",
                format: 'yyyy/mm/dd',
                autoclose: true,
                todayHighlight: true
            });

            

            $('.switch_doc').bootstrapSwitch({
                onText: "SI",
                offText: "NO",
                onColor: "success",
                offColor: "danger"
            });
            
            $('.switch_doc').on('switchChange.bootstrapSwitch', function (event, state) {

                if(state){
                    form.steps("insert", 3, stepDoc);
                }else{
                    form.steps("remove", 3);
                }
            });

        } else {
            form.steps("remove", 2);
          
        }
    });

    $("#txtPais").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Departamentos = DatosUbicacion.Departamentos;
        let Id_Pais = parseInt($('#txtPais option:selected').val());

        let arrayDepartamentos = [];

        for (let item of Departamentos) {

            if (parseInt(item.Id_Pais) === Id_Pais) {
                arrayDepartamentos.push(item);
            }
        }

        CargarDepartamentos(arrayDepartamentos);

    });

    $("#txtDepartamento").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Municipios = DatosUbicacion.Municipios;
        let Id_Departamento = parseInt($('#txtDepartamento option:selected').val());

        let arrayMunicipios = [];

        for (let item of Municipios) {

            if (parseInt(item.Id_Departamento) === Id_Departamento) {
                arrayMunicipios.push(item);
            }
        }

        CargarMunicipios(arrayMunicipios);

    });


    $("#txtMunicipio").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Barrios_Veredas = DatosUbicacion.Barrios_Veredas;
        let Id_Municipio = parseInt($('#txtMunicipio option:selected').val());
        let Id_SubTipo = parseInt($('#txtSubTipo option:selected').val());

        let arrayBarrios_Veredas = [];

        for (let item of Barrios_Veredas) {

            if (parseInt(item.Id_Municipio) === Id_Municipio) {
                if (parseInt(item.Id_SubTipo_Barrio_Vereda) === Id_SubTipo) {
                    arrayBarrios_Veredas.push(item);
                }
            }
        }

        CargarBarrios_Veredas(arrayBarrios_Veredas);
    });

    $("#txtSubTipo").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Barrios_Veredas = DatosUbicacion.Barrios_Veredas;
        let Id_Municipio = parseInt($('#txtMunicipio option:selected').val());
        let Id_SubTipo = parseInt($('#txtSubTipo option:selected').val());

        let arrayBarrios_Veredas = [];

        for (let item of Barrios_Veredas) {

            if (parseInt(item.Id_Municipio) === Id_Municipio) {
                if (parseInt(item.Id_SubTipo_Barrio_Vereda) === Id_SubTipo) {
                    arrayBarrios_Veredas.push(item);
                }
            }
        }
        CargarBarrios_Veredas(arrayBarrios_Veredas);
    });

    $("#btnLimpiar").click(function () { LimpiarDetalleLinea(); });

    $("#btnGuardarDetalleLineas").click(function () {

        form.validate().settings.ignore = ":disabled,:hidden, .valDetalle";
        if(form.valid()){
            
            $('#txtDetalleId').val() == "0" ? RegistrarDetalleLinea() : EditarDetalleLinea();
           
            
        }        
    });

    // Validación minutos ilimitados.
    $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').change(function () {

        if ($(this).is(":checked")) {
            $('#txtDetalle_Minutos').prop('disabled', true);

        } else {
            $('#txtDetalle_Minutos').prop('disabled', false);
        }
    });

    $(document).on('click','#DetallesLineasEditar', function () {
        let idLinea = $(this).attr("id_linea");
        let DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));

        DetalleLineas.forEach(function(valor,indice,array){

            if(valor.id == idLinea){
        
                $('#txtId_Lineas').empty();
                if(typeof valor.id_lineas !== "undefined"){
                    for (let id of valor.id_lineas) {

                        let $opcion = $('<option />', {
                            text: `${id}`,
                            value: `${id}`
                        });
                        $('#txtId_Lineas').append($opcion);
                    }
                }
                
                $('#txtDetalleId').val(valor.id);
                $('#txtDetalleId').attr("grupo",valor.grupo);
                $('#txtDetalle_Cantidad_Lineas').val(valor.cantidadLineas);
                $('#txtDetalle_Valor_Mensual').val(valor.valorMensual);
                valor.valValorLineas == "1" ? $('#txtDetalle_radio').prop("checked", true) :  $('#txtDetalle_radio2').prop("checked", true);
                $('#txtDetalleNavegacion').val(valor.navegacion);
                // $('#txtDetalleUnidad').val(),
                valor.minIlimitados ? $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').trigger('click') : $('#txtDetalle_Minutos').val(valor.minutos);
                valor.todoOperador ?  $('input:checkbox[name=txtDetalle_Minutos_TO]').prop('checked',true) : "" ;
                valor.minOtro != "" ?  $('#txtDetalle_Minutos_Otro').val(valor.minOtro) : $('#txtDetalle_Minutos_Otro').val("");
                valor.mensajes ? $('input:checkbox[name=txtDetalle_Mensajes]').prop('checked',true) : "";
                valor.redes ? $('input:checkbox[name=txtDetalle_Redes]').prop('checked',true) : "";
                valor.llamadas ? $('input:checkbox[name=txtDetalle_Llamadas]').prop('checked',true) : "";
                valor.roaming ? $('input:checkbox[name=txtDetalle_Roaming]').prop('checked',true) : "";
            }
        });

   });

   $(document).on('click','#DetallesLineasEliminar', function () {

       let idLinea = $(this).attr("id_linea");
       let DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));

       DetalleLineas.forEach(function(valor,indice,array){

           if(valor.id == idLinea){
               
               DetalleLineas.splice(indice,1);
           }
       });
       sessionStorage.DetalleLineas = JSON.stringify(DetalleLineas);
       ListarDetalleLineas();
   });

    Informacion = JSON.parse(sessionStorage.getItem("DatosEditarCliente"));
    

    console.log(Informacion);
    // ************************************ Llenar formulario ********************************************************
    Id_Cliente = Informacion.Id_Cliente;
    Id_DBL = Informacion.Id_DBL;
    Id_Plan_Corporativo = Informacion.Id_Plan_Corporativo;
    Id_Documentos = Informacion.Id_Documentos;

    // Información de contacto.
    $("#txtRazonSocial").val(Informacion.Razon_Social);
    $("#txtTelefono").val(Informacion.Telefono);
    $("#txtNIT").val(Informacion.NIT_CDV);
    $("#txtEncargado").val(Informacion.Encargado);
    $("#txtExt_Tel_Contacto").val(Informacion.Ext_Tel_Contacto);

    // Ubicación.
    setTimeout(function(){
        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        CargarPaises(DatosUbicacion.Paises,Informacion.Id_Pais);
        CargarDepartamentos(DatosUbicacion.Departamentos,Informacion.Id_Pais, Informacion.Id_Departamento);
        CargarMunicipios(DatosUbicacion.Municipios,Informacion.Id_Departamento, Informacion.Id_Municipio);
        CargarSubTipos(DatosUbicacion.Subtipos,Informacion.Id_SubTipo_Barrio_Vereda);
        CargarBarrios_Veredas(DatosUbicacion.Barrios_Veredas,Informacion.Id_Barrios_Veredas);
    },2000);

    $("#txtDireccion").val(Informacion.Direccion);

    // Datos básicos líneas.
    if(parseInt(Informacion.Id_Plan_Corporativo) > 0){
        
    }
    CargarOperadores(Informacion.Id_Operador);
    // Select calificación.
    // select razones.

    // Detalle líneas.
    if(typeof Informacion.Detalle_Lineas !== 'undefined'){
        let ArrayLineasGrupo = [];
        for(let lineaBD of Informacion.Detalle_Lineas){
            if(ArrayLineasGrupo.length > 0){
                let control = false;
                // Comprobar si el grupo ya está agregado.
                for(let linea of ArrayLineasGrupo){ 
                    if(linea.grupo === lineaBD.Grupo){
                        linea.cantidadLineas += 1;
                        linea.id_lineas.push(lineaBD.Id_Linea);
                        control = true;
                    }
                }
                if(!control){
                    let linea =  CrearLineaSession(lineaBD);
                    ArrayLineasGrupo.push(linea);
                }
            }else{
                let linea =  CrearLineaSession(lineaBD)
                ArrayLineasGrupo.push(linea);
            }
        }
        sessionStorage.DetalleLineas = JSON.stringify(ArrayLineasGrupo);
        ListarDetalleLineas();
    }

    // Plan Corporativo
    if(parseInt(Informacion.Id_Plan_Corporativo) > 0){
        $('.switch_corporativo').trigger('click');
        let Fecha_Inicio = new Date(Informacion.Fecha_Inicio.replace(/-/g, '\/'));
        $("#Fecha_Corporativo").children('#txtFecha_inicio').datepicker("setUTCDate", Fecha_Inicio);
        let Fecha_Fin = new Date(Informacion.Fecha_Fin.replace(/-/g, '\/'));
        $("#Fecha_Corporativo").children('#txtFecha_fin').datepicker("setUTCDate", Fecha_Fin);
        $("#txtDescripcion").val(Informacion.Descripcion);
    } 

    if(parseInt(Informacion.Id_Documentos) > 0){
        $('.switch_doc').trigger('click');
        $("#txtCamara_Comercio").closest('.fileinput').children('.form-control').children('span').text(Informacion.Camara_Comercio);
        $("#txtCedula").closest('.fileinput').children('.form-control').children('span').text(Informacion.Cedula_RL);
        $("#txtSoporte").closest('.fileinput').children('.form-control').children('span').text(Informacion.Soporte_Ingresos);
        $("#txtDetalles").closest('.fileinput').children('.form-control').children('span').text(Informacion.Detalles_Plan_Corporativo);
    }

});



// FUNCIONES:

let EditarCliente = () => {


    // Array Lineas
    let arrayLineas = [];

    let Cantidad_Total_Lineas = 0;
    let Valor_Total_Mensual = 0;

    if(sessionStorage.DetalleLineas){
        
        let DetalleLineas = JSON.parse(sessionStorage.DetalleLineas);
        

        for(let lineaItem of DetalleLineas){

            let minutos = "";

            if(lineaItem.minIlimitados){
                minutos += "Ilimitados";
            }else{
                minutos += lineaItem.minutos;
            }

            if(lineaItem.todoOperador){
                minutos += ",todo operador";
            }

            if(lineaItem.minOtro != ""){
                minutos += "," + lineaItem.minOtro
            }

            // Establecer valor total mensual de las lineas.
            if(lineaItem.valValorLineas == "1"){
                
                Valor_Total_Mensual += parseInt(lineaItem.valorMensual);

            }else if(lineaItem.valValorLineas == "2"){
                
                Valor_Total_Mensual += (parseInt(lineaItem.valorMensual) * parseInt(lineaItem.cantidadLineas));

            }

            if(typeof lineaItem.id_lineas !== "undefined"){

                if(parseInt(lineaItem.cantidadLineas) === lineaItem.id_lineas.length){

                    for(let id of lineaItem.id_lineas){

                        let linea = {
                            id: id,
                            grupo: lineaItem.grupo,
                            minutos: minutos,
                            navegacion: lineaItem.navegacion + " " + lineaItem.unidad,
                            mensajes: lineaItem.mensajes ? 1 : 0,
                            redes: lineaItem.redes ? 1 : 0,
                            llamadas: lineaItem.llamadas ? 1 : 0,
                            roaming: lineaItem.roaming ? 1 : 0,
                            cargo: lineaItem.valorMensual
                        }
    
                        arrayLineas.push(linea);
                    }
                }else if(parseInt(lineaItem.cantidadLineas) < lineaItem.id_lineas.length ){

                    for(let i = 1; i <= parseInt(lineaItem.cantidadLineas); i++){

                        let linea = {
                            id: lineaItem.id_lineas[i],
                            minutos: minutos,
                            navegacion: lineaItem.navegacion + " " + lineaItem.unidad,
                            mensajes: lineaItem.mensajes ? 1 : 0,
                            redes: lineaItem.redes ? 1 : 0,
                            llamadas: lineaItem.llamadas ? 1 : 0,
                            roaming: lineaItem.roaming ? 1 : 0,
                            cargo: lineaItem.valorMensual
                        }

                        arrayLineas.push(linea);
                    }
                    
                }else if(parseInt(lineaItem.cantidadLineas) > lineaItem.id_lineas.length ){

                    let lineasAdicionales = parseInt(lineaItem.cantidadLineas) -lineaItem.id_lineas.length;

                    for(let id of lineaItem.id_lineas){

                        let linea = {
                            id: id,
                            minutos: minutos,
                            navegacion: lineaItem.navegacion + " " + lineaItem.unidad,
                            mensajes: lineaItem.mensajes ? 1 : 0,
                            redes: lineaItem.redes ? 1 : 0,
                            llamadas: lineaItem.llamadas ? 1 : 0,
                            roaming: lineaItem.roaming ? 1 : 0,
                            cargo: lineaItem.valorMensual
                        }
    
                        arrayLineas.push(linea);
                    }

                    for(let i = 1; i <= lineasAdicionales; i++){

                        let linea = {
                            minutos: minutos,
                            navegacion: lineaItem.navegacion + " " + lineaItem.unidad,
                            mensajes: lineaItem.mensajes ? 1 : 0,
                            redes: lineaItem.redes ? 1 : 0,
                            llamadas: lineaItem.llamadas ? 1 : 0,
                            roaming: lineaItem.roaming ? 1 : 0,
                            cargo: lineaItem.valorMensual
                        }
        
                        arrayLineas.push(linea);
                    }

                }

            }else{

                for(let i = 1; i <= parseInt(lineaItem.cantidadLineas); i++){

                    let linea = {
                        minutos: minutos,
                        navegacion: lineaItem.navegacion + " " + lineaItem.unidad,
                        mensajes: lineaItem.mensajes ? 1 : 0,
                        redes: lineaItem.redes ? 1 : 0,
                        llamadas: lineaItem.llamadas ? 1 : 0,
                        roaming: lineaItem.roaming ? 1 : 0,
                        cargo: lineaItem.valorMensual
                    }
    
                    arrayLineas.push(linea);
                }  
                
            }

                      
        }

        Cantidad_Total_Lineas = arrayLineas.length;
    }

    let arrayRazones = $("#Select_Razones").val();
    let stringRazones = "";

    for(let razon of arrayRazones){
        stringRazones += razon + ", ";
    }

    let datos =
    {   
        // Cliente
        Id_Cliente: parseInt(Id_Cliente),
        Razon_Social: $("#txtRazonSocial").val(),
        Telefono: $("#txtTelefono").val(),
        NIT_CDV: ($("#txtNIT").val()),
        Encargado: $("#txtEncargado").val(),
        Ext_Tel_Contacto: $("#txtExt_Tel_Contacto").val(),
        Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
        Direccion: $("#txtDireccion").val(),
        //DBL
        Id_DBL: parseInt(Id_DBL),
        Id_Operador: parseInt($("#txtOperador").val()),
        Id_Calificacion_Operador: parseInt($("#txtCalificacion").val()),
        Razones: stringRazones,
        Cantidad_Lineas: Cantidad_Total_Lineas,
        Valor_Mensual: Valor_Total_Mensual.toString(),
        DetalleLineas: arrayLineas,
        
        // Validacion
        Validacion_PLan_C: false,
        Validacion_Doc_S: false
    };

    
    if($('.switch_corporativo').bootstrapSwitch('state')){

        let switchClausula = $('#switchClausula').children('label').children('input');

        datos.Validacion_PLan_C = true

        Object.defineProperties(datos,{
            "Id_Plan_Corporativo":{
                value: parseInt(Id_Plan_Corporativo),
                enumerable: true
            },
            "Clausula":{
                value: switchClausula[0].checked ? 1 : 0,
                enumerable: true
            },
            "Fecha_Inicio":{
                value: $("#txtFecha_inicio").val(),
                enumerable: true
            },
            "Fecha_Fin":{
                value: $("#txtFecha_fin").val(),
                enumerable: true
            },
            "Descripcion":{
                value: $("#txtDescripcion").val(),
                enumerable: true
            }
        });
    }

    if($('.switch_doc').bootstrapSwitch('state')){

        datos.Validacion_Doc_S = true;

        Object.defineProperties(datos,{
            "Id_Documentos":{
                value: parseInt(Id_Documentos),
                enumerable: true
            },
           "Camara_Comercio":{
                value: $("#txtCamara_Comercio").val(),
                enumerable: true
            },
            "Cedula_RL":{
                value: $("#txtCedula").val(),
                enumerable: true
            },
            "Soporte_Ingresos":{
                value:$("#txtSoporte").val(),
                enumerable: true
            },
            "Detalles_Plan_Corporativo":{
                value: $("#txtDetalles").val(),
                enumerable: true
            }
        });
    }

    console.log(datos);

    // $.ajax({
    //     url: `${URL}/Cliente`,
    //     type: 'put',
    //     dataType: 'json',
    //     data: JSON.stringify(datos),
    //     contentType: 'application/json',
    //     processData: false
    // }).done(respuesta => {

    //     console.log(respuesta)

    //     if (respuesta.data.ok) {

    //         swal({
    //             title: "Cliente registrado correctamente.",
    //             type: "success",
    //             showCancelButton: false,
    //             confirmButtonColor: "#2F6885",
    //             confirmButtonText: "Continuar",
    //             closeOnConfirm: false,
    //         }, function (isConfirm) {
    //             if (isConfirm) {
    //                  sessionStorage.removeItem('DetalleLineas');
    //                 location.href = "Directorio.html";
    //             }
    //         });
    //     } else {
    //         swal({
    //             title: "Error al registrar.",
    //             text: "Ha ocurrido un error al registrar, intenta de nuevo",
    //             type: "error",
    //             showCancelButton: false,
    //             confirmButtonColor: "#2F6885",
    //             confirmButtonText: "Continuar",
    //             closeOnConfirm: false,
    //         }, function (isConfirm) {
    //             if (isConfirm) {
    //                 location.href = "AgregarEmpresa.html";
    //                 console.log(respuesta.data);
    //             }
    //         });
    //     }

    // }).fail(error => {

    //     swal({
    //         title: "Error al registrar.",
    //         text: "Ha ocurrido un error al registrar, intenta de nuevo",
    //         type: "error",
    //         showCancelButton: false,
    //         confirmButtonColor: "#2F6885",
    //         confirmButtonText: "Continuar",
    //         closeOnConfirm: false,
    //     }, function (isConfirm) {
    //         if (isConfirm) {
    //             location.href = "AgregarEmpresa.html";
    //             console.log(error);
    //         }
    //     });
    // });

}


let CrearLineaSession = (lineaBD) => {

    let regex = /(\d+)/g;
    let regex2 = /([A-Za-z]+)/g;
    let regex3 = /(\w+)/g;
    let navegacion = lineaBD.Navegacion.match(regex);
    let unidad = lineaBD.Navegacion.match(regex2);
    let minutosRegex = lineaBD.Minutos.match(regex3);

    let ilimitados = false;
    let minutos = "";
    let todoOperador = false;
    let minOtro = "";

    if(minutosRegex[0] === "Ilimitados"){

        ilimitados = true;

        if(lineaBD.Minutos.indexOf(",todo operador") != -1 ){
            todoOperador = true;

            let posicion = lineaBD.Minutos.indexOf(",todo operador");
            let inicioIndex = posicion + 15;
            minOtro =  lineaBD.Minutos.substring(inicioIndex);

        }else{
            
            minOtro =  lineaBD.Minutos.substring(11);
        }   

    }else{

        minutos = minutosRegex[0];
        if(lineaBD.Minutos.indexOf(",todo operador") != -1 ){
            todoOperador = true;

            let posicion = lineaBD.Minutos.indexOf(",todo operador");
            let inicioIndex = posicion + 15;
            minOtro =  lineaBD.Minutos.substring(inicioIndex);

        }else{ 
            minOtro =  lineaBD.Minutos.substring(minutos.length + 1);
        }
    }

    arrayId = [lineaBD.Id_Linea];

    let linea = {
        id: uuid.v4(),
        grupo: lineaBD.Grupo,
        id_lineas: arrayId,
        cantidadLineas: 1,
        valorMensual: lineaBD.Cargo_Basico,
        valValorLineas: "2",
        navegacion: navegacion[0],
        unidad: unidad[0],
        minutos: minutos,
        minIlimitados: ilimitados,
        todoOperador: todoOperador,
        minOtro: minOtro,
        mensajes: lineaBD.Mensajes === "1" ? true : false ,
        llamadas: lineaBD.Llamadas_Inter === "1" ? true : false ,
        redes: lineaBD.Redes_Sociales === "1" ? true : false ,
        roaming: lineaBD.Roaming === "1" ? true : false ,
    };


    return linea;
}



let CargarDatosUbicacion = () => {

    $.ajax({
        url: `${URL}/Cliente/Datos/Ubicacion`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            sessionStorage.DatosUbicacion = JSON.stringify(datos.data);
        },
        error: function (error) {
            console.log(error);
        }

    })

}


let CargarPaises = (datos,Id_Pais) => {

    $('#txtPais').empty();
    for (let item of datos) {
        if (item.Id_Pais == Id_Pais) {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Pais}`,
                value: `${item.Id_Pais}`,
                selected: true
            })
        } else {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Pais}`,
                value: `${item.Id_Pais}`
            })
        }
        $('#txtPais').append($opcion);
    }
}


let CargarDepartamentos = (datos,Id_Departamento) => {

    $('#txtDepartamento').empty();
    for (let item of datos) {
        if (item.Id_Departamento == Id_Departamento) {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Departamento}`,
                value: `${item.Id_Departamento}`,
                selected: true
            })
        } else {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Departamento}`,
                value: `${item.Id_Departamento}`
            })
        }
        $('#txtDepartamento').append($opcion);
    }

}

let CargarMunicipios = (datos,Id_Municipio) => {

    $('#txtMunicipio').empty();
    for (let item of datos) {
        if (item.Id_Municipio == Id_Municipio) {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Municipio}`,
                value: `${item.Id_Municipio}`,
                selected: true
            });
        } else {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Municipio}`,
                value: `${item.Id_Municipio}`
            });
        }
        $('#txtMunicipio').append($opcion);
    }
}

let CargarSubTipos = (datos, Id_SubTipo_Barrio_Vereda) => {

    $('#txtSubTipo').empty();
    for (let item of datos) {
        if (item.Id_SubTipo_Barrio_Vereda == Id_SubTipo_Barrio_Vereda) {
            var $opcion = $('<option />', {
                text: `${item.SubTipo}`,
                value: `${item.Id_SubTipo_Barrio_Vereda}`,
                selected: true
            })
        } else {
            var $opcion = $('<option />', {
                text: `${item.SubTipo}`,
                value: `${item.Id_SubTipo_Barrio_Vereda}`
            });
        }
        $('#txtSubTipo').append($opcion);
    }

}

let CargarBarrios_Veredas = (datos, Id_Barrios_Veredas) => {

    $('#txtNombre_Lugar').empty();
    for (let item of datos) {
        if (item.Id_Barrios_Veredas == Id_Barrios_Veredas) {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Barrio_Vereda}`,
                value: `${item.Id_Barrios_Veredas}`,
                selected: true
            })
        } else {
            var $opcion = $('<option />', {
                text: `${item.Nombre_Barrio_Vereda}`,
                value: `${item.Id_Barrios_Veredas}`
            });
        }
        $('#txtNombre_Lugar').append($opcion);
    }

}


let CargarOperadores = (Id_Operador) => {

    $.ajax({
        url: `${URL}/Operador`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtOperador').empty();

            for (let item of datos.data) {

                if (item.Id_Operador == Id_Operador) {

                    var $opcion = $('<option />', {
                        text: `${item.Nombre_Operador}`,
                        value: `${item.Id_Operador}`,
                        selected: true
                    })
                } else {
                    var $opcion = $('<option />', {
                        text: `${item.Nombre_Operador}`,
                        value: `${item.Id_Operador}`
                    })
                }

                $('#txtOperador').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

// // Detalle Líneas

let RegistrarDetalleLinea = () => {

        let DetalleLineas = [];
        if(sessionStorage.DetalleLineas){
            DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));
        }

        let arrayDetalleLinea = {
            id: uuid.v4(),
            cantidadLineas: $('#txtDetalle_Cantidad_Lineas').val(),
            valorMensual: $('#txtDetalle_Valor_Mensual').val(),
            valValorLineas: $('input:radio[name=detalleLineasRadios]:checked').val(),
            navegacion: $('#txtDetalleNavegacion').val(),
            unidad: $('#txtDetalleUnidad').val(),
            minutos: $('#txtDetalle_Minutos').val(),
            minIlimitados: $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').is(":checked"),
            todoOperador: $('input:checkbox[name=txtDetalle_Minutos_TO]').is(":checked"),
            minOtro: $('#txtDetalle_Minutos_Otro').val(),
            mensajes: $('input:checkbox[name=txtDetalle_Mensajes]').is(":checked"),
            llamadas: $('input:checkbox[name=txtDetalle_Llamadas]').is(":checked"),
            redes: $('input:checkbox[name=txtDetalle_Redes]').is(":checked"),
            roaming: $('input:checkbox[name=txtDetalle_Roaming]').is(":checked")
       };

        DetalleLineas.push(arrayDetalleLinea);

        sessionStorage.DetalleLineas = JSON.stringify(DetalleLineas);

        LimpiarDetalleLinea();
        ListarDetalleLineas();
}

let ListarDetalleLineas = () => {

    if (sessionStorage.DetalleLineas) {

        let DetalleLineas;
        let Cantidad_Lineas = 0;
        let Valor_Mensual = 0;
        let contador = 0;
        DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));

        $('#TblRegistroDetalleLineas').empty();
        
        for (let item of DetalleLineas) {
            contador++;
            Cantidad_Lineas += parseInt(item.cantidadLineas);

            if(parseInt(item.valValorLineas) == 1){
                Valor_Mensual += parseInt(item.valorMensual);
            }else if(parseInt(item.valValorLineas) == 2){
                Valor_Mensual += (parseInt(item.valorMensual) * parseInt(item.cantidadLineas));
            } 
            
            $('#TblRegistroDetalleLineas').append(`
                <tr>
                    <td>${contador}</td>
                    <td>${item.cantidadLineas}</td>
                    <td>
                        <i class="fa fa-dollar"></i>
                        <div class="float-right">${item.valorMensual}</div> 
                    </td>
                    <td>${item.navegacion+ ' '+item.unidad}</td>
                    <td>${item.minIlimitados ? "Ilimitados " : item.minutos}${item.todoOperador ? " todo operador " : ""} ${item.minOtro != "" ? item.minOtro : ""}</td>
                    <td>
                        ${item.mensajes ? '<input type="radio" class="with-gap" id="radio_tbl" checked> <label for="radio_tbl1">Mensajes</label>' : ""}

                        ${item.redes ? '<input type="radio" class="with-gap" id="radio_tbl" checked><label for="radio_tbl">Redes</label>' : ""}
                        
                        ${item.llamadas ? '<input type="radio" class="with-gap" id="radio_tbl" checked>  <label for="radio_tbl1">Llamadas</label>' : ""}

                        ${item.roaming ? '<input type="radio" class="with-gap" id="radio_tbl" checked> <label for="radio_tbl">Roaming</label>' : ""}
                        
                    </td>
                    <td>
                        <span class="label label-info">${parseInt(item.valValorLineas) == 1 ? "En total" : "Por línea"}</span>
                    </td>
                    <td>
                        
                        <button type="button" id="DetallesLineasEditar" id_linea="${item.id}" class="btn btn-outline-info btn-sm">
                            <i class="fa fa-pencil"></i>
                        </button>
                
                        <button type="button" id="DetallesLineasEliminar" id_linea="${item.id}" class="btn btn-outline-danger btn-sm">
                            <i class="fa fa-close"></i>
                        </button>
                    </td>
                </tr>

            `);
        }

        $("#tFootRegistroDetalleCliente").empty();
        $("#tFootRegistroDetalleCliente").append(`
            <tr>
                <td>
                    <h5 class="box-title">Total:</h5>
                </td>
                <td>${Cantidad_Lineas}</td>
                <td>
                    <i class="fa fa-dollar"></i>
                    <div class="float-right">${Valor_Mensual}</div> 
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        `);

    }
}


let EditarDetalleLinea = () => {

    let idLinea = $('#txtDetalleId').val();
    let DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));
  
    DetalleLineas.forEach(function(valor,indice,array){

        if(valor.id == idLinea){

            DetalleLineas.splice(indice,1);
        }
    });

        let arrayDetalleLinea = {
            id: $('#txtDetalleId').val(),
            grupo: $('#txtDetalleId').attr("grupo"),
            cantidadLineas: $('#txtDetalle_Cantidad_Lineas').val(),
            valorMensual: $('#txtDetalle_Valor_Mensual').val(),
            valValorLineas: $('input:radio[name=detalleLineasRadios]:checked').val(),
            navegacion: $('#txtDetalleNavegacion').val(),
            unidad: $('#txtDetalleUnidad').val(),
            minutos: $('#txtDetalle_Minutos').val(),
            minIlimitados: $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').is(":checked"),
            todoOperador: $('input:checkbox[name=txtDetalle_Minutos_TO]').is(":checked"),
            minOtro: $('#txtDetalle_Minutos_Otro').val(),
            mensajes: $('input:checkbox[name=txtDetalle_Mensajes]').is(":checked"),
            llamadas: $('input:checkbox[name=txtDetalle_Llamadas]').is(":checked"),
            redes: $('input:checkbox[name=txtDetalle_Redes]').is(":checked"),
            roaming: $('input:checkbox[name=txtDetalle_Roaming]').is(":checked")
       };

        if ($('#txtId_Lineas').val() !== null) {
            
            let arrayId = [];

            for(let option of $('#txtId_Lineas')[0]){
                arrayId.push(option.value);
            }
        
            Object.defineProperty(arrayDetalleLinea,'id_lineas',{
                value: arrayId,
                enumerable: true
            });

        } 

        DetalleLineas.push(arrayDetalleLinea);

        sessionStorage.DetalleLineas = JSON.stringify(DetalleLineas);

        LimpiarDetalleLinea();
        ListarDetalleLineas();
}

let LimpiarDetalleLinea = () => {

    $('#txtDetalleId').val(0)
    $('#txtDetalle_Cantidad_Lineas').val("");
    $('#txtDetalle_Valor_Mensual').val("");
    $('input:radio[name=detalleLineasRadios]:checked').prop('checked',false);
    $('#txtDetalleNavegacion').val("");
    // $('#txtDetalleUnidad').val(),
    $('#txtDetalle_Minutos').val("");
    if($('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').is(":checked")){
        $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').prop('checked',false);
        $('#txtDetalle_Minutos').prop('disabled', false);
    }else{
        $('#txtDetalle_Minutos').val("");
    }
    $('input:checkbox[name=txtDetalle_Minutos_TO]').prop('checked',false);
    $('#txtDetalle_Minutos_Otro').val("");
    $('input:checkbox[name=txtDetalle_Mensajes]').prop('checked',false);
    $('input:checkbox[name=txtDetalle_Llamadas]').prop('checked',false);
    $('input:checkbox[name=txtDetalle_Redes]').prop('checked',false);
    $('input:checkbox[name=txtDetalle_Roaming]').prop('checked',false);
    
}







