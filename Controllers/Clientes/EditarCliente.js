
// Variables globales de control
var UsuarioBD;
var UsuarioValido = false;

// Para editar
var Id_Cliente;
var Id_DBL;

CargarDatosModalEditar = (datos) => {
    
    Informacion = datos.data;

    // Llenar formulario 
    Id_Cliente = Informacion.Id_Cliente;
    Id_DBL =  Informacion.Id_DBL;


    $("#txtNIT_E").val(Informacion.NIT_CDV);
    $("#txtRazonSocial_E").val(Informacion.Razon_Social);
    $("#txtTelefono_E").val(Informacion.Telefono);

    // $("#txtPais").val(Informacion.Apellidos);
    // $("#txtDepartamento").val(Informacion.Correo);
    // $("#txtMunicipio").val(Informacion.Correo);
    // $("#txtTipo").val(Informacion.Correo);
    // $("#txtBarrio_Vereda").val(Informacion.Correo);

    $("#txtDireccion_E").val(Informacion.Direccion);
    CargarOperadores(Informacion.Id_Operador);
    $("#txtEncargado_E").val(Informacion.Encargado);
    $("#txtTelefono_Contacto_E").val(Informacion.Telefono_Contacto);
    $("#txtExtension_E").val(Informacion.Extension);
    $("#txtCantidad_Lineas_E").val(Informacion.Cantidad_Lineas);
    $("#txtValor_Mensual_E").val(Informacion.Valor_Mensual);
    $("#txtMinutos_E").val(Informacion.Cantidad_Minutos);
    $("#txtNavegacion_E").val(Informacion.Cantidad_Navegacion);
    $("#txtMensajes_E").val(Informacion.Mensajes_Texto);
    $("#txtApps_E").val(Informacion.Aplicaciones);
    $("#txtRoaming_E").val(Informacion.Roaming_Internacional);
    $("#txtLlamadas_Inter_E").val(Informacion.Llamadas_Internacionales);


    console.log(Informacion.Fecha_Inicio);


    $("#txtFecha_Inicio_E").datepicker("update", Informacion.Fecha_Inicio );
    $("#txtFecha_Fin_E").datepicker("update", Informacion.Fecha_Fin );

 
    $("#txtDescripcion_E").val(Informacion.Descripcion);

    // Mostrar Modal con formulario para editar
    $('.ModalEditar').modal('show');

}

CargarOperadores = (Id_Operador) => {
    
    $.ajax({
        url: `${URL}/Operador`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarOperadores(Id_Operador, datos);
        },
        error: function(error){
            console.log(error);
        }

    })

}

ListarOperadores = (Id_Operador,datos) => {

    $('#txtOperador_E').empty();

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

            $('#txtOperador_E').append($opcion);
        }
}

CargarSexos = (Id_Sexo) => {
    
    $.ajax({
        url: `${URL}/Sexo`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarSexos(Id_Sexo, datos);
        },
        error: function(error){
            console.log(error);
        }

    })

}

ListarSexos = (Id_Sexo,datos) => {
    
    $('#txtSexo').empty();
        $('#txtSexo').prepend("<option disabled >Seleccione...</option>");

        for (let item of datos.data) {

            if (item.Id_Sexo == Id_Sexo) {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Sexo}`,
                    selected: true
                })

            } else {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Sexo}`
                })
            }

            $('#txtSexo').append($opcion);
        }
}

CargarTurnos = (Id_Turno) => {
    
    $.ajax({
        url: `${URL}/Turnos`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarTurnos(Id_Turno, datos);
        },
        error: function(error){
            console.log(error);
        }

    })

}

ListarTurnos = (Id_Turno,datos) => {
    
    $('#txtTurno').empty();
        $('#txtTurno').prepend("<option disabled >Seleccione...</option>");

        for (let item of datos.data) {

            if (item.Id_Turno == Id_Turno) {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Turno}`,
                    selected: true
                })

            } else {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Turno}`
                })
            }

            $('#txtTurno').append($opcion);
        }
}

CargarRoles = (Id_Rol) => {
    
    $.ajax({
        url: `${URL}/Rol`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarRoles(Id_Rol, datos);
        },
        error: function(error){
            console.log(error);
        }

    })

}

ListarRoles = (Id_Rol,datos) => {
    
    $('#txtRol').empty();
        $('#txtRol').prepend("<option disabled >Seleccione...</option>");

        for (let item of datos.data) {

            if (item.Id_Rol == Id_Rol) {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Rol}`,
                    selected: true
                })

            } else {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Turno}`
                })
            }

            $('#txtRol').append($opcion);
        }
}

EditarCliente = () => {

    if ($("#txtFecha_inicio").val().length > 0 && $("#txtCamara_Comercio").get(0).files.length == 0) {

        // Objeto JSON con plan sin documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: true,
            Validacion_Doc_S: false,

            // Cliente
            NIT_CDV: ($("#txtNIT_E").val()),
            Razon_Social: $("#txtRazonSocial_E").val(),
            Telefono: $("#txtTelefono_E").val(),
            Direccion: $("#txtDireccion_E").val(),
            Encargado: $("#txtEncargado_E").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto_E").val(),
            Extension: $("#txtExtension_E").val(),
            Id_Barrios_Veredas: parseInt($("#txtNombre_Lugar_E").val()),
     

            //DBL
            Id_Operador: parseInt($("#txtOperador_E").val()),
            Cantidad_Lineas: parseInt($("#txtNumero_Lineas_E").val()),
            Valor_Mensual: $("#txtValor_Mensual_E").val(),
            Cantidad_Minutos: $("#txtMinutos_E").val(),
            Cantidad_Navegacion: $("#txtNavegacion_E").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter_E").val(),
            Mensajes_Texto: $("#txtMensajes_E").val(),
            Aplicaciones: $("#txtApps_E").val(),
            Roaming_Internacional: $("#txtRoaming_E").val(),

            //Plan Corporativo
            Fecha_Inicio: $("#txtFecha_inicio_E").val(),
            Fecha_Fin: $("#txtFecha_fin_E").val(),
            Descripcion: $("#txtDescripcion_E").val(),
        };
    } else if ($("#txtFecha_inicio").val().length > 0 && $("#txtCamara_Comercio").get(0).files.length > 0) {

        //Objeto JSON con plan y con documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: true,
            Validacion_Doc_S: true,

            // Cliente
            NIT_CDV: ($("#txtNIT_E").val()),
            Razon_Social: $("#txtRazonSocial_E").val(),
            Telefono: $("#txtTelefono_E").val(),
            Direccion: $("#txtDireccion_E").val(),
            Encargado: $("#txtEncargado_E").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto_E").val(),
            Extension: $("#txtExtension_E").val(),
            Id_Barrios_Veredas: parseInt($("#txtNombre_Lugar_E").val()),

            //DBL
            Id_Operador: parseInt($("#txtOperador_E").val()),
            Cantidad_Lineas: parseInt($("#txtNumero_Lineas_E").val()),
            Valor_Mensual: $("#txtValor_Mensual_E").val(),
            Cantidad_Minutos: $("#txtMinutos_E").val(),
            Cantidad_Navegacion: $("#txtNavegacion_E").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter_E").val(),
            Mensajes_Texto: $("#txtMensajes_E").val(),
            Aplicaciones: $("#txtApps_E").val(),
            Roaming_Internacional: $("#txtRoaming_E").val(),

            //Plan Corporativo
            Fecha_Inicio: $("#txtFecha_inicio_E").val(),
            Fecha_Fin: $("#txtFecha_fin_E").val(),
            Descripcion: $("#txtDescripcion_E").val(),

            // Documentos Soporte
            Camara_Comercio: $("#txtCamara_Comercio_E").val(),
            Cedula_RL: $("#txtCedula_E").val(),
            Soporte_Ingresos: $("#txtSoporte_E").val(),
            Detalles_Plan_Corporativo: $("#txtDetalles_E").val()
        };
    } else if ($("#txtFecha_inicio").val().length == 0) {

        //Objeto JSON sin plan y sin documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: false,

            // Cliente
            NIT_CDV: ($("#txtNIT_E").val()),
            Razon_Social: $("#txtRazonSocial_E").val(),
            Telefono: $("#txtTelefono_E").val(),
            Direccion: $("#txtDireccion_E").val(),
            Encargado: $("#txtEncargado_E").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto_E").val(),
            Extension: $("#txtExtension_E").val(),
            Id_Barrios_Veredas: parseInt($("#txtNombre_Lugar_E").val()),

            //DBL
            Id_Operador: parseInt($("#txtOperador_E").val()),
            Cantidad_Lineas: parseInt($("#txtNumero_Lineas_E").val()),
            Valor_Mensual: $("#txtValor_Mensual_E").val(),
            Cantidad_Minutos: $("#txtMinutos_E").val(),
            Cantidad_Navegacion: $("#txtNavegacion_E").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter_E").val(),
            Mensajes_Texto: $("#txtMensajes_E").val(),
            Aplicaciones: $("#txtApps_E").val(),
            Roaming_Internacional: $("#txtRoaming_E").val(),
        };
    }
        
        console.log(datos);

        $.ajax({
            url:`${URL}/Usuarios`,
            type: 'put',
            dataType: 'json',
            data: JSON.stringify(datos),
            contentType: 'application/json',
            processData: false
        }).done(respuesta =>{
            
            if (respuesta.data.ok) {

                swal({
                    title: "Información modificada correctamente.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#2F6885",
                    confirmButtonText: "Continuar",
                    closeOnConfirm: false,
                }, function (isConfirm) {
                    if (isConfirm) {
                    
                        location.href = "Directorio.html";
                    }
                });
            } else {
                swal({
                    title: "Error al modificar.",
                    text: "Ha ocurrido un error al modificar, intenta de nuevo",
                    type: "danger",
                    showCancelButton: false,
                    confirmButtonColor: "#2F6885",
                    confirmButtonText: "Continuar",
                    closeOnConfirm: false,
                }, function (isConfirm) {
                    if (isConfirm) {
                        
                        console.log(respuesta.data);
                    }
                });
            }

        }).fail(error => {

            console.log(error);

        });
}


$(function () {

    CargarOperadores();

    var form = $("#Form_Editar_Clientes").show();

    $("#Form_Editar_Clientes").steps({
        headerTag: "h6",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#</span> #title#',
        onStepChanging: function (event, currentIndex, newIndex) {
            return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
        },
        onFinishing: function (event, currentIndex) {
            return form.validate().settings.ignore = ":disabled", form.valid()
        },
        onFinished: function (event, currentIndex) {
        
            EditarCliente();
        }
    }),
        $("#Form_Editar_Clientes").validate({
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
                txtNIT_E: {
                    ValidarNIT: true,
                    minlength: 5
                },
                txtRazonSocial_E:{
                    required: true,
                    minlength: 5,
                    SoloAlfanumericos: true
                },
                txtTelefono_E: {
                    required: true,
                    SoloNumeros: true,
                    minlength: 5,
                    maxlength: 10,
                },
                // txtPais: "required",
                // txtDepartamento: "required",
                // txtMunicipio: "required",
                // txtSubTipo: "required",
                // txtNombre_Lugar: "required",
                // txtDireccion: "required",
                txtOperador_E: "required",
                txtEncargado_E: {
                    SoloLetras: true
                },
                txtTelefono_Contacto_E: {
                    SoloNumeros: true,
                    minlength: 5,
                    maxlength: 10
                },
                txtExtension_E: {
                    SoloNumeros: true,
                    minlength: 2,
                    maxlength: 4
                },
                txtCantidad_Lineas_E: {
                    SoloNumeros2: true,
                },
                txtValor_Mensual_E: {
                    SoloNumeros2: true
                },
                txtMinutos_E: {
                    SoloAlfanumericos: true
                },
                txtNavegacion_E: {
                    SoloAlfanumericos: true
                },
                txtLlamadas_Inter_E: {
                    SoloAlfanumericos: true
                },
                txtMensajes_E: {
                    SoloAlfanumericos: true
                },
                txtApps_E: {
                    SoloAlfanumericos: true
                },
                txtRoaming_E: {
                    SoloAlfanumericos: true
                },
                txtDescripcion_E: {
                    SoloAlfanumericos: true
                }
            }
        });

    
    // DatePicker fecha
    $("#Fecha_DatePicker").datepicker({
        language: "es",
        format: 'dd-mm-yyyy',
        autoclose: true,
        todayHighlight: true,
    });
    
})