//API

const URL = 'http://localhost:8081'

$(function () {
    var stepPlanCorp;
    var stepDoc;
    var form = $("#Form_Registro_Clientes").show();

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
            CargarOperadores();
            // select calificacion
            // Select razones.
            
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
        },
        onFinishing: function (event, currentIndex) {
            return form.validate().settings.ignore = ":disabled", form.valid()
        },
        onFinished: function (event, currentIndex) {

            RegistrarCliente();
        }
    }),
        form.validate({
            ignore: "input[type=hidden]",
            successClass: "text-success",
            errorClass: "form-control-feedback",
            errorElement: "div",
            errorPlacement: function (error, element) {


                if (element[0].id == "txtValor_Mensual") {
                    error.insertAfter(element.parent(".input-group"));
                } else {
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
                    minlength: 5,
                    maxlength: 10
                },
                // txtPais: "required",
                // txtDepartamento: "required",
                // txtMunicipio: "required",
                // txtSubTipo: "required",
                // txtNombre_Lugar: "required",
                // txtDireccion: "required",
                // txtOperador: "required",
                txtCantidad_Total_Lineas: {
                    SoloNumeros2: true,
                },
                txtValor_Total_Mensual: {
                    SoloNumeros2: true
                },
                txtMinutos: {
                    SoloAlfanumericos: true
                },
                txtNavegacion: {
                    SoloAlfanumericos: true
                },
                txtLlamadas_Inter: {
                    SoloAlfanumericos: true
                },
                txtMensajes: {
                    SoloAlfanumericos: true
                },
                txtApps: {
                    SoloAlfanumericos: true
                },
                txtRoaming: {
                    SoloAlfanumericos: true
                },
                txtDescripcion: {
                    SoloAlfanumericos: true
                }
            }
        });

// Inicializar elementos:

    // Rango Fecha corporativo
    $("#Fecha_Corporativo").datepicker({
        language: "es",
        format: 'yyyy/mm/dd',
        autoclose: true,
        todayHighlight: true,
    });

    // TouchSpin    
    $("#txtValor_Mensual").TouchSpin({
        min: 0,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000,
        postfix: 'COP'
    });

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


// Enlazar eventos: 

    // Estado del switch Plan corporativo
    $('.switch_corporativo').on('switchChange.bootstrapSwitch', function (event, state) {

        if (state) {
            form.steps("insert", 2, stepPlanCorp);
            form.steps("insert", 3, stepDoc);
        } else {
            form.steps("remove", 2);
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

    $("#btnGuardarDetalleLineas").click(function (){

    //     let DetalleLineas = [];
    //     if(sessionStorage.DetalleLineas){
    //         DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));
    //     }
        
    //     let minutos = "";
    //     if($('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').is(":checked")){
    //         minutos += "Ilimitados ";
    //     }else{
    //         minutos += $('#txtDetalle_Minutos').val();
    //     }
    //     if($('input:checkbox[name=txtDetalle_Minutos_TO]').is(":checked")){
    //         minutos +=  " todo operador "
    //     }
    //     minutos += $('#txtDetalle_Minutos_Otro').val();
        
        
    //     let arrayDetalleLinea = {
    //         id: uuid.v4(),
    //         cantidadLineas: $('#txtDetalle_Cantidad_Lineas').val(),
    //         valorMensual: $('#txtDetalle_Valor_Mensual').val(),
    //         valValorLienas: $('input:radio[name=detalleLineasRadios]:checked').val(),
    //         navegacion: $('#txtDetalleNavegacion').val() +' '+ $('#txtDetalleUnidad').val(),
    //         minutos: minutos,
    //         mensajes: $('input:checkbox[name=txtDetalle_Mensajes]').is(":checked"),
    //         llamadas: $('input:checkbox[name=txtDetalle_Llamadas]').is(":checked"),
    //         redes: $('input:checkbox[name=txtDetalle_Redes]').is(":checked"),
    //         roaming: $('input:checkbox[name=txtDetalle_Roaming]').is(":checked")
    //    };

    //     DetalleLineas.push(arrayDetalleLinea);

    //     sessionStorage.DetalleLineas = JSON.stringify(DetalleLineas);

        ListarDetalleLineas();

        $('#DetallesLineasEditar').on('click',function(element){
            
            console.log($(this).attr("id_linea"))
        })
    });

    

    // Validación minutos ilimitados.
    $('input:checkbox[name=txtDetalle_Validacion_Ilimitados]').change(function(){
        
        if($(this).is(":checked")) {
            $('#txtDetalle_Minutos').prop('disabled', true);

        }else{
            $('#txtDetalle_Minutos').prop('disabled', false);
        }
    });

  
});

// FUNCIONES:

let RegistrarCliente = () => {

    var datos =
    {
        // Varaibles de control
        Validacion_PLan_C: true,
        Validacion_Doc_S: false,

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
        Id_Operador: parseInt($("#txtCalificacion").val()),
        Cantidad_Lineas: parseInt($("#txtCantidad_Total_Lineas").val()),
        Valor_Mensual: $("#txtValor_Total_Mensual").val()
        // Cantidad_Minutos: $("#txtMinutos").val(),
        // Cantidad_Navegacion: $("#txtNavegacion").val(),
        // Llamadas_Internacionales: $("#txtLlamadas_Inter").val(),
        // Mensajes_Texto: $("#txtMensajes").val(),
        // Aplicaciones: $("#txtApps").val(),
        // Roaming_Internacional: $("#txtRoaming").val(),
        // Estado_DBL: 1,

        //Plan Corporativo
        // Fecha_Inicio: $("#txtFecha_inicio").val(),
        // Fecha_Fin: $("#txtFecha_fin").val(),
        // Descripcion: $("#txtDescripcion").val(),
        // Estado_Plan_Corporativo: 1
    };

    console.log(datos);



    // if ($("#txtFecha_inicio").val().length > 0 && $("#txtCamara_Comercio").get(0).files.length == 0) {

    //     // Objeto JSON con plan sin documentos

    // } else if ($("#txtFecha_inicio").val().length > 0 && $("#txtCamara_Comercio").get(0).files.length > 0) {

    //     //Objeto JSON con plan y con documentos
    //     var datos =
    //     {
    //         // Varaibles de control
    //         Validacion_PLan_C: true,
    //         Validacion_Doc_S: true,

    //         // Cliente
    //         NIT_CDV: ($("#txtNIT").val()),
    //         Razon_Social: $("#txtRazonSocial").val(),
    //         Telefono: $("#txtTelefono").val(),
    //         Direccion: $("#txtDireccion").val(),
    //         Encargado: $("#txtEncargado").val(),
    //         Telefono_Contacto: $("#txtTelefono_Contacto").val(),
    //         Extension: $("#txtExtension").val(),
    //         Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
    //         Estado_Cliente: 1,

    //         //DBL
    //         Id_Operador: parseInt($("#txtOperador").val()),
    //         Cantidad_Lineas: parseInt($("#txtNumero_Lineas").val()),
    //         Valor_Mensual: $("#txtValor_Mensual").val(),
    //         Cantidad_Minutos: $("#txtMinutos").val(),
    //         Cantidad_Navegacion: $("#txtNavegacion").val(),
    //         Llamadas_Internacionales: $("#txtLlamadas_Inter").val(),
    //         Mensajes_Texto: $("#txtMensajes").val(),
    //         Aplicaciones: $("#txtApps").val(),
    //         Roaming_Internacional: $("#txtRoaming").val(),
    //         Estado_DBL: 1,

    //         //Plan Corporativo
    //         Fecha_Inicio: $("#txtFecha_inicio").val(),
    //         Fecha_Fin: $("#txtFecha_fin").val(),
    //         Descripcion: $("#txtDescripcion").val(),
    //         Estado_Plan_Corporativo: 1,

    //         // Documentos Soporte
    //         Camara_Comercio: $("#txtCamara_Comercio").val(),
    //         Cedula_RL: $("#txtCedula").val(),
    //         Soporte_Ingresos: $("#txtSoporte").val(),
    //         Detalles_Plan_Corporativo: $("#txtDetalles").val()
    //     };
    // } else if ($("#txtFecha_inicio").val().length == 0) {

    //     //Objeto JSON sin plan y sin documentos
    //     var datos =
    //     {
    //         // Varaibles de control
    //         Validacion_PLan_C: false,

    //         // Cliente
    //         NIT_CDV: ($("#txtNIT").val()),
    //         Razon_Social: $("#txtRazonSocial").val(),
    //         Telefono: $("#txtTelefono").val(),
    //         Direccion: $("#txtDireccion").val(),
    //         Encargado: $("#txtEncargado").val(),
    //         Telefono_Contacto: $("#txtTelefono_Contacto").val(),
    //         Extension: $("#txtExtension").val(),
    //         Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
    //         Estado_Cliente: 1,

    //         //DBL
    //         Id_Operador: parseInt($("#txtOperador").val()),
    //         Cantidad_Lineas: parseInt($("#txtNumero_Lineas").val()),
    //         Valor_Mensual: $("#txtValor_Mensual").val(),
    //         Cantidad_Minutos: $("#txtMinutos").val(),
    //         Cantidad_Navegacion: $("#txtNavegacion").val(),
    //         Llamadas_Internacionales: $("#txtLlamadas_Inter").val(),
    //         Mensajes_Texto: $("#txtMensajes").val(),
    //         Aplicaciones: $("#txtApps").val(),
    //         Roaming_Internacional: $("#txtRoaming").val(),
    //         Estado_DBL: 1
    //     };
    // }

    // $.ajax({
    //     url: `${URL}/Cliente`,
    //     dataType: 'json',
    //     type: 'post',
    //     contentType: 'aplication/json',
    //     data: JSON.stringify(datos),
    //     processData: false

    //     // done -> capturar respuesta del servidor 
    // }).done(respuesta => {

    //     console.log(respuesta)
    //     // La api devuelve un booleando
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

let ListarDetalleLineas = () => {
    
    if(sessionStorage.DetalleLineas){

        DetalleLineas = JSON.parse(sessionStorage.getItem("DetalleLineas"));

        $('#TblRegistroDetalleLineas').empty();
        let contador = 0;
        for(let item of DetalleLineas){
            contador++;
            
            $('#TblRegistroDetalleLineas').append(`
            
                <tr>
                    <td>${contador}</td>
                    <td>${item.cantidadLineas}</td>
                    <td>${item.valorMensual} <span class="label label-info">${parseInt(item.valValorLienas) == 1 ? "En total" : "Por línea" }</span></td>
                    <td>${item.navegacion}</td>
                    <td>${item.minutos}</td>
                    <td>
                        ${item.mensajes ? '<input type="radio" class="with-gap" id="radio_tbl" checked> <label for="radio_tbl1">Mensajes</label>' : "" }

                        ${item.redes ? '<input type="radio" class="with-gap" id="radio_tbl" checked><label for="radio_tbl">Redes</label>' : "" }
                        
                        ${item.llamadas ? '<input type="radio" class="with-gap" id="radio_tbl" checked>  <label for="radio_tbl1">Llamadas</label>' : ""}

                        ${item.roaming ? '<input type="radio" class="with-gap" id="radio_tbl" checked> <label for="radio_tbl">Roaming</label>' : ""}
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
    }
}










