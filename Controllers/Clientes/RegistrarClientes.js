//API

const URL = 'http://localhost:8081'


let RegistrarUsuario = () => {

    if ($("#txtFecha_inicio").val() != null && $("#txtCamara_Comercio").val() == null) {

        console.log($("#txtCamara_Comercio").val());

        // Objeto JSON con plan sin documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: true,
            Validacion_Doc_S: false,

            // Cliente
            NIT_CDV: ($("#txtNIT").val()),
            Razon_Social: $("#txtRazonSocial").val(),
            Telefono: $("#txtTelefono").val(),
            Direccion: $("#txtDireccion").val(),
            Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
            Estado_Cliente: 1,

            //DBL
            Id_Operador: parseInt($("#txtOperador").val()),
            Encargado: $("#txtEncargado").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto").val(),
            Extension: $("#txtExtension").val(),
            Cantidad_Lineas: parseInt($("#txtNumero_Lineas").val()),
            Valor_Mensual: $("#txtValor_Mensual").val(),
            Cantidad_Minutos: $("#txtMinutos").val(),
            Cantidad_Navegacion: $("#txtNavegacion").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter").val(),
            Mensajes_Texto: $("#txtMensajes").val(),
            Aplicaciones: $("#txtApps").val(),
            Roaming_Internacional: $("#txtRoaming").val(),
            Estado_DBL: 1,

            //Plan Corporativo
            Fecha_Inicio: $("#txtFecha_inicio").val(),
            Fecha_Fin: $("#txtFecha_fin").val(),
            Descripcion: $("#txtDescripcion").val(),
            Estado_Plan_Corporativo: 1
        };
    } else if ($("#txtFecha_inicio").val() != null && $("#txtCamara_Comercio").val() != null) {

        //Objeto JSON con plan y con documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: true,
            Validacion_Doc_S: true,

            // Cliente
            NIT_CDV: ($("#txtNIT").val()),
            Razon_Social: $("#txtRazonSocial").val(),
            Telefono: $("#txtTelefono").val(),
            Direccion: $("#txtDireccion").val(),
            Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
            Estado_Cliente: 1,

            //DBL
            Id_Operador: parseInt($("#txtOperador").val()),
            Encargado: $("#txtEncargado").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto").val(),
            Extension: $("#txtExtension").val(),
            Cantidad_Lineas: parseInt($("#txtNumero_Lineas").val()),
            Valor_Mensual: $("#txtValor_Mensual").val(),
            Cantidad_Minutos: $("#txtMinutos").val(),
            Cantidad_Navegacion: $("#txtNavegacion").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter").val(),
            Mensajes_Texto: $("#txtMensajes").val(),
            Aplicaciones: $("#txtApps").val(),
            Roaming_Internacional: $("#txtRoaming").val(),
            Estado_DBL: 1,

            //Plan Corporativo
            Fecha_Inicio: $("#txtFecha_inicio").val(),
            Fecha_Fin: $("#txtFecha_fin").val(),
            Descripcion: $("#txtDescripcion").val(),
            Estado_Plan_Corporativo: 1,

            // Documentos Soporte
            Camara_Comercio: $("#txtCamara_Comercio").val(),
            Cedula_RL: $("#txtCedula").val(),
            Soporte_Ingresos: $("#txtSoporte").val(),
            Detalles_Plan_Corporativo: $("#txtDetalles").val()
        };
    } else if ($("#txtFecha_inicio").val() == null) {

        //Objeto JSON sin plan y sin documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: false,

            // Cliente
            NIT_CDV: ($("#txtNIT").val()),
            Razon_Social: $("#txtRazonSocial").val(),
            Telefono: $("#txtTelefono").val(),
            Direccion: $("#txtDireccion").val(),
            Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
            Estado_Cliente: 1,

            //DBL
            Id_Operador: parseInt($("#txtOperador").val()),
            Encargado: $("#txtEncargado").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto").val(),
            Extension: $("#txtExtension").val(),
            Cantidad_Lineas: parseInt($("#txtNumero_Lineas").val()),
            Valor_Mensual: $("#txtValor_Mensual").val(),
            Cantidad_Minutos: $("#txtMinutos").val(),
            Cantidad_Navegacion: $("#txtNavegacion").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter").val(),
            Mensajes_Texto: $("#txtMensajes").val(),
            Aplicaciones: $("#txtApps").val(),
            Roaming_Internacional: $("#txtRoaming").val(),
            Estado_DBL: 1
        };
    }
    $.ajax({
        url: `${URL}/Cliente`,
        dataType: 'json',
        type: 'post',
        contentType: 'aplication/json',
        data: JSON.stringify(datos),
        processData: false

        // done -> capturar respuesta del servidor 
    }).done(respuesta => {
        // La api devuelve un booleando
        if (respuesta.data.ok) {

            swal({
                title: "Cliente registrado correctamente.",
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
                title: "Error al registrar.",
                text: "Ha ocurrido un error al registrar, intenta de nuevo",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#2F6885",
                confirmButtonText: "Continuar",
                closeOnConfirm: false,
            }, function (isConfirm) {
                if (isConfirm) {
                    location.href = "AgregarEmpresa.html";
                    console.log(respuesta.data);
                }
            });
        }

    }).fail(error => {

        swal({
            title: "Error al registrar.",
            text: "Ha ocurrido un error al registrar, intenta de nuevo",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#2F6885",
            confirmButtonText: "Continuar",
            closeOnConfirm: false,
        }, function (isConfirm) {
            if (isConfirm) {
                location.href = "AgregarEmpresa.html";
                console.log(error);
            }
        });


    });

}


$(function () {

    // Inicializar selects del formulario
    // CargarPais();
    // CargarSubTipo();

    var form = $(".Form_Registro_Clientes").show();

    $(".Form_Registro_Clientes").steps({
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

            RegistrarUsuario();
        }
    }),
        $(".Form_Registro_Clientes").validate({
            ignore: "input[type=hidden]",
            successClass: "text-success",
            errorClass: "form-control-feedback",
            errorElement: "div",
            errorPlacement: function (error, element) {
                
            
                if (element[0].id == "txtValor_Mensual") {
                    console.log("HOla")
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
                txtNIT: {
                    ValidarNIT: true,
                    minlength: 5
                },
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
                // txtPais: "required",
                // txtDepartamento: "required",
                // txtMunicipio: "required",
                // txtSubTipo: "required",
                // txtNombre_Lugar: "required",
                // txtDireccion: "required",
                // txtOperador: "required",
                txtEncargado: {
                    SoloLetras: true
                },
                txtTelefono_Contacto: {
                    SoloNumeros: true,
                    minlength: 5,
                    maxlength: 10
                },
                txtExtension: {
                    SoloNumeros: true,
                    minlength: 2,
                    maxlength: 4
                },
                txtNumero_Lineas: {
                    SoloNumeros2: true,
                },
                txtValor_Mensual: {
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
                }
            }
        })

    // DatePicker
    $(".RegistrarClienteDatePicker").datepicker({
        language: "es",
        autoclose: true,
        todayHighlight: true
    });

    // TouchSpin
    $("#txtValor_Mensual").TouchSpin({
        min: 0,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000,
        postfix: 'COP'
    });

});





