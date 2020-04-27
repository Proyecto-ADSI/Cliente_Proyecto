//API
const URL = 'http://localhost:8081';

var form = null;

$(function () {

    var stepPlanCorp;
    var stepCita;
    form = $("#Form_Registro_LlamadaNP").show();

    form.steps({
        headerTag: "h6",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#</span> #title#',
        onInit: function (event, currentIndex) {

            // Validacion de steps
            stepPlanCorp = form.steps("getStep", 2);
            stepCita = form.steps("getStep", 3);
            form.steps("remove", 2);
            form.steps("remove", 2);

            // Inicializar selects del formulario
            CargarDatosUbicacion();
            CargarOperadores();
            CargarCalificaciones();
            CargarRazonesOperador();
            CargarRazonesLlamada();
           

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
            RegistrarLlamadaNP();
        }
    }),
    form.validate({
            ignore: "input[type=hidden]",
            successClass: "text-success",
            errorClass: "form-control-feedback",
            errorElement: "div",
            errorPlacement: function (error, element) {

                if (element[0].id == "txtDetalle_Valor_Mensual" || element[0].name == "txtNumeroLinea") {
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
                // txtRazonSocial:{
                //     required: true,
                //     minlength: 5,
                //     SoloAlfanumericos: true
                // },
                // txtTelefono: {
                //     required: true,
                //     SoloNumeros: true,
                //     minlength: 5,
                //     maxlength: 10,
                // },
                txtNIT: {
                    ValidarNIT: true,
                    minlength: 5
                },
                txtEncargado: {
                    SoloLetras: true
                },
                txtExt_Tel_Contacto: {
                    SoloNumeros: true,
                    minlength: 2,
                    maxlength: 10
                },
                // txtPais: "required",
                // txtDepartamento: "required",
                // txtMunicipio: "required",
                // txtSubTipo: "required",
                // txtNombre_Lugar: "required",
                // txtDireccion: "required",

                // txtOperador: "required",
                // txtCalificacion: "required",
                txtDetalle_Cantidad_Lineas:{
                    required: true,
                    SoloNumeros: true
                },
                txtDetalle_Valor_Mensual:{
                    required: true,
                    SoloNumeros: true
                },
                detalleLineasRadios: "required",
                
            }
    });

    // Inicializar elementos:

        // bootstrap-switch
        
        $('.switch_corporativo').bootstrapSwitch({
            onText: "SI",
            offText: "NO",
            onColor: "success",
            offColor: "danger"
        });
    
        $('.switch_cita1').bootstrapSwitch({
            onText: "SI",
            offText: "NO",
            onColor: "success",
            offColor: "danger"
        });

        

        $('.switch_habeas_data').bootstrapSwitch({
            onText: "SI",
            offText: "NO",
            onColor: "success",
            offColor: "danger"
        });

        
    // Enlazar eventos de escucha: 
    
        // Estado del switch Cita 1
        $('.switch_cita1').on('switchChange.bootstrapSwitch', function (event, state) {

            if(state){
                form.steps("insert", 2, stepCita);
                
                InicializarFormCitas()
                


            }else{
                form.steps("remove", 2);
                EliminarStepCita();
            }
        })

        // Estado del switch Plan corporativo
        $('.switch_corporativo').on('switchChange.bootstrapSwitch', function (event, state) {

            if (state) {

                if($('.switch_cita1').bootstrapSwitch('state')){
                    $('.switch_cita1').bootstrapSwitch('state', false);
                }

                form.steps("insert", 2, stepPlanCorp);
            

                // Rango Fecha corporativo
                $("#Fecha_Corporativo").datepicker({
                    language: "es",
                    format: 'yyyy/mm/dd',
                    autoclose: true,
                    todayHighlight: true
                });

                $('#ValidacionCita').attr("style","display: none")
                
                $('.switch_cita2').bootstrapSwitch({
                    onText: "SI",
                    offText: "NO",
                    onColor: "success",
                    offColor: "danger"
                });
                
                
                // Estado del switch Cita 2
                $('.switch_cita2').on('switchChange.bootstrapSwitch', function (event, state) {

                    if(state){
                        form.steps("insert", 3, stepCita);
                        InicializarFormCitas()

                    }else{
                        form.steps("remove", 3);
                        EliminarStepCita();
                    }
                });

            } else {
            
                if($('.switch_cita2').bootstrapSwitch('state')){
                    $('.switch_cita2').bootstrapSwitch('state', false)
                }
                
                form.steps("remove", 2);
                $('#ValidacionCita').removeAttr("style");
            }
        });

        // Operador cliente
        $('#txtOperador').change(function(){

            let Id_Operador_Cita = parseInt($('#txtOperador option:selected').val());
            CargarOperadoresCita(Id_Operador_Cita)

        })

        // Ubicación cliente

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

        // Botones detalle líneas
    
        $("#btnLimpiar").click(function () {
            LimpiarDetalleLinea();
        });


        $("#btnGuardarDetalleLineas").click(function () {

            form.validate().settings.ignore = ":disabled,:hidden, .valDetalle";
            if(form.valid()){
                
                $('#txtDetalleId').val() == "0" ? RegistrarDetalleLinea() : EditarDetalleLinea();
                

                // Detalles líneas

                $(document).on('click','#DetallesLineasDetalle', function () {

                    let idLinea = $(this).attr("id_linea");
                    let DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));
        
                    DetalleLineas.forEach(function(linea,indice,array){
                    
                            if(linea.id == idLinea){

                                let minutos = "";

                                if(linea.minIlimitados){
                                    minutos += "Ilimitados";
                                }else{
                                    minutos += linea.minutos;
                                }

                                if(linea.todoOperador){
                                    minutos += ",todo operador";
                                }

                                if(linea.minOtro != ""){
                                    minutos += "," + linea.minOtro
                                }

                                let Valor_Total_Mensual = 0;
                                // Establecer valor total mensual de las lineas.
                                if(linea.valValorLineas == "1"){
                                    
                                    Valor_Total_Mensual += parseInt(linea.valorMensual);

                                }else if(linea.valValorLineas == "2"){
                                    
                                    Valor_Total_Mensual += (parseInt(linea.valorMensual) * parseInt(linea.cantidadLineas));

                                }
                            
                                $('#tbodyModalLinea').empty();
                                $('#tbodyModalLinea').append( `
                                <tr id="txtIdLineasModalNumeros" style="display:none" >
                                    <td>${linea.id}</td>
                                </tr>
                                    <tr>
                                        <td> Cantidad líneas </td>
                                        <td><p id="txtIncrementarLineas" class="float-right"> ${linea.cantidadLineas}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h5 class="text-danger font-weight-bold text-uppercase">Pago mensual</h5></td>
                                        <td>
                                            <i class="fa fa-dollar text-danger"></i>
                                            <h5 class="float-right text-danger font-weight-bold">
                                                ${Valor_Total_Mensual}
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Navegación</td>
                                        <td>
                                        ${linea.navegacion + ' ' + linea.unidad}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Minutos</td>
                                        <td>
                                            ${minutos}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Otros</td>
                                        <td>

                                        ${linea.mensajes ? '<input type="radio" class="with-gap" id="radio_tbl" checked> <label for="radio_tbl1">Mensajes</label>' : ""}

                                        ${linea.redes ? '<input type="radio" class="with-gap" id="radio_tbl" checked><label for="radio_tbl">Redes</label>' : ""}
                                        
                                        ${linea.llamadas ? '<input type="radio" class="with-gap" id="radio_tbl" checked>  <label for="radio_tbl1">Llamadas</label>' : ""}
                
                                        ${linea.roaming ? '<input type="radio" class="with-gap" id="radio_tbl" checked> <label for="radio_tbl">Roaming</label>' : ""}
                                        </td>
                                    </tr>


                                    `
                                );

                                // TouchSpin    
                                // $("#txtIncrementarLineas").TouchSpin({
                                //     min: 0,
                                //     max: 1000000000,
                                //     stepinterval: 50,
                                //     maxboostedstep: 10000000,
                                // });
                                
                                if(typeof linea.NumerosLineas !== "undefined"){

                                    $('#ModalNumerosLineas').empty();

                                    AgregarInput(linea.NumerosLineas.length,linea.NumerosLineas);

                                }else{
                                    
                                    $('#ModalNumerosLineas').empty();
                                    AgregarInput(linea.cantidadLineas,0,false);
                                }
                                
                                $('.txtNumeroLinea').each(function() {
                                    $(this).rules('add', {
                                        ValidarCelular: true,
                                        minlength: 10,
                                        maxlength: 10
                                    });
                                });

                            $('#LineasModal').modal("show");
                        }
                    });
                });

                // Editar linea

                $(document).on('click','#DetallesLineasEditar', function () {
                    let idLinea = $(this).attr("id_linea");
                    let DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));
        
                    DetalleLineas.forEach(function(valor,indice,array){
                        // console.log(valor);
                        if(valor.id == idLinea){
                            $('#txtDetalleId').val(valor.id);
                            $('#txtDetalle_Cantidad_Lineas').val(valor.cantidadLineas);
                            $('#txtDetalle_Valor_Mensual').val(valor.valorMensual);
                            valor.valValorLineas == "1" ? $('#txtDetalle_radio').prop("checked", true) :  $('#txtDetalle_radio2').prop("checked", true);
                            $('#txtDetalleNavegacion').val(valor.navegacion);
                            // $('#txtDetalleUnidad').val(),

                            if(valor.minIlimitados){
                                if(!$('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').is(":checked")){
                                    $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').trigger('click')
                                }
                            }else{

                                $('#txtDetalle_Minutos').val(valor.minutos)
                            }
                            valor.todoOperador ?  $('input:checkbox[name=txtDetalle_Minutos_TO]').prop('checked',true) : "" ;
                            valor.minOtro != "" ?  $('#txtDetalle_Minutos_Otro').val(valor.minOtro) : $('#txtDetalle_Minutos_Otro').val("");
                            valor.mensajes ? $('input:checkbox[name=txtDetalle_Mensajes]').prop('checked',true) : "";
                            valor.redes ? $('input:checkbox[name=txtDetalle_Redes]').prop('checked',true) : "";
                            valor.llamadas ? $('input:checkbox[name=txtDetalle_Llamadas]').prop('checked',true) : "";
                            valor.roaming ? $('input:checkbox[name=txtDetalle_Roaming]').prop('checked',true) : "";
                        }
                    });
        
                });


                // Eliminar línea.

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
});

// FUNCIONES:

let RegistrarLlamadaNP = () => {


    // Array Lineas
    let arrayLineas = [];

    let Cantidad_Total_Lineas = 0;
    let Valor_Total_Mensual = 0;

    if(sessionStorage.DetalleLineas){
        
        let DetalleLineas = JSON.parse(sessionStorage.DetalleLineas);
        
        let GrupoLineas = 0;
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

            GrupoLineas++;
            for(let i = 0; i < parseInt(lineaItem.cantidadLineas); i++){

                let linea = {
                    minutos: minutos,
                    navegacion: lineaItem.navegacion + " " + lineaItem.unidad,
                    mensajes: lineaItem.mensajes ? 1 : 0,
                    redes: lineaItem.redes ? 1 : 0,
                    llamadas: lineaItem.llamadas ? 1 : 0,
                    roaming: lineaItem.roaming ? 1 : 0,
                    cargo: lineaItem.valorMensual,
                    grupo: GrupoLineas
                }
                
                if(typeof lineaItem.NumerosLineas !== "undefined"){

                    Object.defineProperty(linea,'numero',{
                        value: lineaItem.NumerosLineas[i],
                        enumerable: true
                    });
                }

               arrayLineas.push(linea);
            }            
        }

        Cantidad_Total_Lineas = arrayLineas.length;
    }

    let arrayRazones = $("#txtRazones").val();
    let stringRazones = "";

    for(let razon of arrayRazones){
        stringRazones += razon + ", ";
    }

    let datos =
    {      
        // Llamada
        Id_Usuario: parseInt(sessionStorage.getItem("Id_Usuario")),
        Persona_Responde: $("#txtPersona_Responde").val(),
        Info_Habeas_Data: $('.switch_habeas_data').bootstrapSwitch('state') ? 1 : 0,
        Observacion: $("#txtObservacion").val(),
        // Id_Estado_Llamada: 

        // Cliente
        Razon_Social: $("#txtRazonSocial").val(),
        Telefono: $("#txtTelefono").val(),
        NIT_CDV: ($("#txtNIT").val()),
        Encargado: $("#txtEncargado").val(),
        Ext_Tel_Contacto: $("#txtExt_Tel_Contacto").val(),
        Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
        Direccion: $("#txtDireccion").val(),
        //DBL
        Id_Operador: parseInt($("#txtOperador").val()),
        Id_Calificacion_Operador: parseInt($("#txtCalificacion").val()),
        Razones: stringRazones,
        Cantidad_Lineas: Cantidad_Total_Lineas,
        Valor_Mensual: Valor_Total_Mensual.toString(),
        DetalleLineas: arrayLineas,
        
        // Validación
        Validacion_PLan_C: false,
        Validacion_Doc_S: false,
        Validacion_Cita : false
    };

    
    if($('.switch_corporativo').bootstrapSwitch('state')){

        let switchClausula = $('#switchClausula').children('label').children('input');

        datos.Validacion_PLan_C = true

        Object.defineProperties(datos,{
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

    if($('.switch_cita1').bootstrapSwitch('state') || $('.switch_cita2').bootstrapSwitch('state')){

        let switchRL = $('#switchRL').children('label').children('input');
        
        datos.Validacion_Cita = true;

        Object.defineProperties(datos,{
            "Clausula":{
                value: switchRL[0].checked ? 1 : 0,
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
    //     dataType: 'json',
    //     type: 'post',
    //     contentType: 'aplication/json',
    //     data: JSON.stringify(datos),
    //     processData: false
    // }).done(respuesta => {

    //     console.log(respuesta)

    //     if (respuesta.data.ok) {

    //         swal({
    //             title: "Registro exitoso.",
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
    //         })
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
    //     })
    // })
}

let InicializarFormCitas = () =>{

    // Operador cita
    let Id_Operador_Cita = parseInt($('#txtOperador option:selected').val());
    CargarOperadoresCita(Id_Operador_Cita)
    

    // Fecha hora Cita
    $('#date-format').bootstrapMaterialDatePicker({ 
        lang : 'es',
        format: 'dddd DD MMMM YYYY',
        minDate: new Date(),
        switchOnClick : true,
        time: false,
        weekStart : 1,
        // maxDate: moment().add(10, 'days'),
        disabledDays: [6,7]

    }).on('change', function(e, date){

        let fecha =  $('#date-format').val()
        // console.log(fecha)
        // console.log(date._d)
        
    })

    // Ubicación cita
    let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"))
    CargarPaisesCita(DatosUbicacion.Paises)
    CargarSubTiposCita(DatosUbicacion.Subtipos)

    
    $("#txtPaisCita").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Departamentos = DatosUbicacion.Departamentos;
        let Id_Pais = parseInt($('#txtPaisCita option:selected').val());
        
        let arrayDepartamentos = [];

        for (let item of Departamentos) {

            if (parseInt(item.Id_Pais) === Id_Pais) {
                arrayDepartamentos.push(item);
            }
        }

        CargarDepartamentosCita(arrayDepartamentos);

    });

    $("#txtDepartamentoCita").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Municipios = DatosUbicacion.Municipios;
        let Id_Departamento = parseInt($('#txtDepartamentoCita option:selected').val());

        let arrayMunicipios = [];

        for (let item of Municipios) {

            if (parseInt(item.Id_Departamento) === Id_Departamento) {
                arrayMunicipios.push(item);
            }
        }

        CargarMunicipiosCita(arrayMunicipios);

    });


    $("#txtMunicipioCita").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Barrios_Veredas = DatosUbicacion.Barrios_Veredas;
        let Id_Municipio = parseInt($('#txtMunicipioCita option:selected').val());
        let Id_SubTipo = parseInt($('#txtSubTipoCita option:selected').val());

        let arrayBarrios_Veredas = [];

        for (let item of Barrios_Veredas) {

            if (parseInt(item.Id_Municipio) === Id_Municipio) {
                if (parseInt(item.Id_SubTipo_Barrio_Vereda) === Id_SubTipo) {
                    arrayBarrios_Veredas.push(item);
                }
            }
        }

        CargarBarrios_VeredasCita(arrayBarrios_Veredas);
    });

    $("#txtSubTipoCita").change(function () {

        let DatosUbicacion = JSON.parse(sessionStorage.getItem("DatosUbicacion"));
        let Barrios_Veredas = DatosUbicacion.Barrios_Veredas;
        let Id_Municipio = parseInt($('#txtMunicipioCita option:selected').val());
        let Id_SubTipo = parseInt($('#txtSubTipoCita option:selected').val());

        let arrayBarrios_Veredas = [];

        for (let item of Barrios_Veredas) {

            if (parseInt(item.Id_Municipio) === Id_Municipio) {
                if (parseInt(item.Id_SubTipo_Barrio_Vereda) === Id_SubTipo) {
                    arrayBarrios_Veredas.push(item);
                }
            }
        }
        CargarBarrios_VeredasCita(arrayBarrios_Veredas);
    });

    // Validaciones Cita
    $('#ValidacionesCita').removeAttr("style")
    $('#OpcionesLlamada').attr("style","display:none")

    $('.switch_factura').bootstrapSwitch({
        onText: "SI",
        offText: "NO",
        onColor: "success",
        offColor: "danger"
    })

    $('.switch_direccion').bootstrapSwitch({
        onText: "Válida",
        offText: "Inválida",
        onColor: "success",
        offColor: "danger"
    })

    $('.switch_nit').bootstrapSwitch({
        onText: "Válido",
        offText: "Inválido",
        onColor: "success",
        offColor: "danger"
    })

    // Conclusión llamada
    ModificarConclusionLlamada(1)
}

let EliminarStepCita = () => {

    $('#OpcionesLlamada').removeAttr("style")
    $('#ValidacionesCita').attr("style","display:none")

    // Conclusión llamada
    ModificarConclusionLlamada(2)
}

let ModificarConclusionLlamada = (valSelect) =>{

    let arrayConclusion =  $('#txtConclusion option')

    for(let item of arrayConclusion){
        
        let valor = parseInt($(item).val())

        if(valor == valSelect ){
            $(item).removeAttr("disabled")
            $(item).attr("selected",true)
        }else{
            $(item).removeAttr("selected")
            $(item).attr("disabled", true)
        }
    }


}
 
let CargarDatosUbicacion = () => {

    $.ajax({
        url: `${URL}/Cliente/Datos/Ubicacion`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            sessionStorage.DatosUbicacion = JSON.stringify(datos.data);

            CargarPaises(datos.data.Paises);
            CargarSubTipos(datos.data.Subtipos);
        },
        error: function (error) {
            console.log(error);
        }

    })

}


let CargarPaises = (datos) => {
    
    $('#txtPais').empty();
    $('#txtPais').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Pais}`,
            value: `${item.Id_Pais}`,
        });

        $('#txtPais').append($opcion);
    }

}

let CargarDepartamentos = (datos) => {

    $('#txtDepartamento').empty();
    $('#txtDepartamento').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />',
            {
                text: `${item.Nombre_Departamento}`,
                value: `${item.Id_Departamento}`,
            });

        $('#txtDepartamento').append($opcion);
    }

}

let CargarMunicipios = (datos) => {

    $('#txtMunicipio').empty();
    $('#txtMunicipio').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Municipio}`,
            value: `${item.Id_Municipio}`,
        });

        $('#txtMunicipio').append($opcion);
    }
}

let CargarSubTipos = (datos) => {

    $('#txtSubTipo').empty();
    $('#txtSubTipo').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.SubTipo}`,
            value: `${item.Id_SubTipo_Barrio_Vereda}`,
        });

        $('#txtSubTipo').append($opcion);
    }

}

let CargarBarrios_Veredas = (datos) => {

    $('#txtNombre_Lugar').empty();
    $('#txtNombre_Lugar').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Barrio_Vereda}`,
            value: `${item.Id_Barrios_Veredas}`,
        });

        $('#txtNombre_Lugar').append($opcion);
    }

}

let CargarOperadores = () => {

    $.ajax({
        url: `${URL}/Operador`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtOperador').empty();
            $('#txtOperador').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Operador}`,
                    value: `${item.Id_Operador}`,
                });

                $('#txtOperador').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

let CargarCalificaciones = () => {

    $.ajax({
        url: `${URL}/Calificaciones`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtCalificacion').empty();
            $('#txtCalificacion').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Calificacion}`,
                    value: `${item.Id_Calificacion_Operador}`,
                });

                $('#txtCalificacion').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })
}

let CargarRazonesOperador = () => {

    $.ajax({
        url: `${URL}/Razones/Operador`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            $('#txtRazones').empty();

            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Razon}`,
                    value: `${item.Razon}`,
                });

                $('#txtRazones').append($opcion);
            }

            //  Select razones
            $("#txtRazones").select2({
                tags: true,
                tokenSeparators: [","]
            });
        },
        error: function (error) {
            console.log(error);
        }

    })
}

let CargarRazonesLlamada = () => {

    $.ajax({
        url: `${URL}/Razones/Llamada`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            $('#txtRazonesLlamada').empty();

            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Razon}`,
                    value: `${item.Razon}`,
                });

                $('#txtRazonesLlamada').append($opcion);
            }

            //  Select razones
            $("#txtRazonesLlamada").select2({
                tags: true,
                tokenSeparators: [","]
            });
        },
        error: function (error) {
            console.log(error);
        }

    })
}

// Cita

let CargarOperadoresCita = (Id_Operador_Cliente) => {

    $.ajax({
        url: `${URL}/Operador`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtOperadorCita').empty();
            $('#txtOperadorCita').prepend("<option selected disabled >Seleccione...</option>");
            let opcion = null
            for (let item of datos.data) {
                
                if(parseInt(item.Id_Operador) == Id_Operador_Cliente){
                    $opcion = $('<option />', {
                        text: `${item.Nombre_Operador}`,
                        value: `${item.Id_Operador}`,
                        disabled: true
                    });
                }else{
                    $opcion = $('<option />', {
                        text: `${item.Nombre_Operador}`,
                        value: `${item.Id_Operador}`
                    });
                }

                $('#txtOperadorCita').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

let CargarPaisesCita = (datos) => {

    $('#txtPaisCita').empty();
    $('#txtPaisCita').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Pais}`,
            value: `${item.Id_Pais}`,
        });

        $('#txtPaisCita').append($opcion);
    }

}

let CargarDepartamentosCita = (datos) => {

    $('#txtDepartamentoCita').empty();
    $('#txtDepartamentoCita').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />',
            {
                text: `${item.Nombre_Departamento}`,
                value: `${item.Id_Departamento}`,
            });

        $('#txtDepartamentoCita').append($opcion);
    }

}

let CargarMunicipiosCita = (datos) => {

    $('#txtMunicipioCita').empty();
    $('#txtMunicipioCita').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Municipio}`,
            value: `${item.Id_Municipio}`,
        });

        $('#txtMunicipioCita').append($opcion);
    }
}

let CargarSubTiposCita = (datos) => {

    $('#txtSubTipoCita').empty();
    $('#txtSubTipoCita').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.SubTipo}`,
            value: `${item.Id_SubTipo_Barrio_Vereda}`,
        });

        $('#txtSubTipoCita').append($opcion);
    }

}

let CargarBarrios_VeredasCita = (datos) => {

    $('#txtNombre_LugarCita').empty();
    $('#txtNombre_LugarCita').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Barrio_Vereda}`,
            value: `${item.Id_Barrios_Veredas}`,
        });

        $('#txtNombre_LugarCita').append($opcion);
    }

}



// Detalle Líneas

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