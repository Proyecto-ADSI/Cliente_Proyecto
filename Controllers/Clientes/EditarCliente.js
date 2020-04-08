// Variables globales de control
var UsuarioBD;
var UsuarioValido = false;

// Para editar
var Id_Cliente;
var Id_DBL;
var Id_Plan_Corporativo;
var Id_Documentos;

CargarDatosModalEditar = (datos) => {

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
                txtRazonSocial_E: {
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
        format: 'yyyy/mm/dd',
        autoclose: true,
        todayHighlight: true,
    });


    // Detectar cambios en el select
    $("#txtPais_E").change(function () {

        let Id_Pais = $('#txtPais_E option:selected').val();
        $('#txtDepartamento_E').empty();
        $('#txtDepartamento_E').prepend("<option selected disabled >Seleccione...</option>");
        $('#txtMunicipio_E').empty();
        $('#txtMunicipio_E').prepend("<option selected disabled value='0' >Seleccione...</option>");
        $('#txtSubTipo_E').empty();
        $('#txtSubTipo_E').prepend("<option selected disabled value='0' >Seleccione...</option>");
        $('#txtNombre_Lugar_E').empty();
        $('#txtNombre_Lugar_E').prepend("<option selected disabled >Seleccione...</option>");
        ListarDepartamentos(Id_Pais);
        ListarSubTipos();

    });

    $("#txtDepartamento_E").change(function () {

        let Id_Departamento = $('#txtDepartamento_E option:selected').val();
        $('#txtMunicipio_E').empty();
        $('#txtMunicipio_E').prepend("<option selected disabled value='0' >Seleccione...</option>");
        $('#txtNombre_Lugar_E').empty();
        $('#txtNombre_Lugar_E').prepend("<option selected disabled >Seleccione...</option>");
        ListarMunicipios(Id_Departamento);

    });


    var Id_Municipio;
    var Id_SubTipo;


    $("#txtMunicipio_E").change(function () {

        Id_Municipio = parseInt($('#txtMunicipio_E option:selected').val());
        Id_SubTipo = parseInt($('#txtSubTipo_E option:selected').val());
       
        if (Id_Municipio || Id_Municipio != 0) {
            if (Id_SubTipo || Id_SubTipo != 0) {
                $('#txtNombre_Lugar_E').empty();
                $('#txtNombre_Lugar_E').prepend("<option selected disabled >Seleccione...</option>");
                ListarBarrios_Veredas(Id_Municipio, Id_SubTipo);
            }
        }
    });

    $("#txtSubTipo_E").change(function () {

        Id_Municipio = $('#txtMunicipio_E option:selected').val();
        Id_SubTipo = $('#txtSubTipo_E option:selected').val();

        if (Id_Municipio || Id_Municipio != 0) {
            if (Id_SubTipo || Id_SubTipo != 0) {
                $('#txtNombre_Lugar_E').empty();
                $('#txtNombre_Lugar_E').prepend("<option selected disabled >Seleccione...</option>");
                ListarBarrios_Veredas(Id_Municipio, Id_SubTipo);
            }
        }
    });


    Informacion = datos.data;

    // Llenar formulario 
    Id_Cliente = Informacion.Id_Cliente;
    Id_DBL = Informacion.Id_DBL;
    Id_Plan_Corporativo = Informacion.Id_Plan_Corporativo;
    Id_Documentos = Informacion.Id_Documentos;

    $("#txtNIT_E").val(Informacion.NIT_CDV);
    $("#txtRazonSocial_E").val(Informacion.Razon_Social);
    $("#txtTelefono_E").val(Informacion.Telefono);
    CargarPaises(Informacion.Id_Pais);
    CargarDepartamentos(Informacion.Id_Pais, Informacion.Id_Departamento);
    CargarMunicipios(Informacion.Id_Departamento, Informacion.Id_Municipio);
    CargarSubTipos(Informacion.Id_SubTipo_Barrio_Vereda);
    CargarBarriosVeredas(Informacion.Id_Barrios_Veredas, Informacion.Id_Municipio, Informacion.Id_SubTipo_Barrio_Vereda);
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

    if (Informacion.Fecha_Inicio) {
        let Fecha_Inicio = new Date(Informacion.Fecha_Inicio.replace(/-/g, '\/'));
        $("#Fecha_DatePicker").children('.txtFecha_inicio_E').datepicker("setUTCDate", Fecha_Inicio);
    }

    if (Informacion.Fecha_Fin) {
        let Fecha_Fin = new Date(Informacion.Fecha_Fin.replace(/-/g, '\/'));
        $("#Fecha_DatePicker").children('.txtFecha_fin_E').datepicker("setUTCDate", Fecha_Fin);
    }

    $("#txtDescripcion_E").val(Informacion.Descripcion);
    $("#txtCamara_Comercio_Actual").find('.fileinput-filename').text(Informacion.Camara_Comercio);
    $("#txtCedula_Actual").find('.fileinput-filename').text(Informacion.Cedula_RL);
    $("#txtSoporte_Actual").find('.fileinput-filename').text(Informacion.Soporte_Ingresos);
    $("#txtDetalles_Actual").find('.fileinput-filename').text(Informacion.Detalles_Plan_Corporativo);


    // Mostrar Modal con formulario para editar
    $('.ModalEditar').modal('show');

}

CargarOperadores = (Id_Operador) => {

    $.ajax({
        url: `${URL}/Operador`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

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

        },
        error: function (error) {
            console.log(error);
        }
    });
}

CargarPaises = (Id_Pais) => {

    $.ajax({
        url: `${URL}/Pais`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtPais_E').empty();

            for (let item of datos.data) {

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

                $('#txtPais_E').append($opcion);
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}

CargarDepartamentos = (Id_Pais, Id_Departamento) => {
    $.ajax({
        url: `${URL}/Departamento/ConsultarDepartamento/${Id_Pais}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            $('#txtDepartamento_E').empty();
            for (let item of datos.data) {
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
                $('#txtDepartamento_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

CargarMunicipios = (Id_Departamento, Id_Municipio) => {
    $.ajax({
        url: `${URL}/Municipio/ConsultarMunicipio/${Id_Departamento}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            $('#txtMunicipio_E').empty();
            for (let item of datos.data) {
                if (item.Id_Municipio == Id_Municipio) {
                    var $opcion = $('<option />', {
                        text: `${item.Nombre_Municipio}`,
                        value: `${item.Id_Municipio}`,
                        selected: true
                    })
                } else {
                    var $opcion = $('<option />', {
                        text: `${item.Nombre_Municipio}`,
                        value: `${item.Id_Municipio}`
                    })
                }
                $('#txtMunicipio_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

CargarSubTipos = (Id_SubTipo_Barrio_Vereda) => {
    $.ajax({
        url: `${URL}/SubTipo`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            $('#txtSubTipo_E').empty();
            for (let item of datos.data) {
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
                $('#txtSubTipo_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


CargarBarriosVeredas = (Id_Barrios_Veredas, Id_Municipio, Id_SubTipo_Barrio_Vereda) => {
    $.ajax({
        url: `${URL}/BarriosVeredas/ConsultarBarriosVeredas/${Id_Municipio}/${Id_SubTipo_Barrio_Vereda}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            $('#txtNombre_Lugar_E').empty();
            for (let item of datos.data) {
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
                $('#txtNombre_Lugar_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// Actualizar selects

ListarDepartamentos = (Id_Pais) => {

    $.ajax({
        url: `${URL}/Departamento/ConsultarDepartamento/${Id_Pais}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {


            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Departamento}`,
                    value: `${item.Id_Departamento}`,
                });

                $('#txtDepartamento_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

ListarMunicipios = (Id_Departamento) => {

    $.ajax({
        url: `${URL}/Municipio/ConsultarMunicipio/${Id_Departamento}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {


            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Municipio}`,
                    value: `${item.Id_Municipio}`,
                });

                $('#txtMunicipio_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

ListarSubTipos = () => {

    $.ajax({
        url: `${URL}/SubTipo`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtSubTipo_E').empty();
            $('#txtSubTipo_E').prepend("<option selected disabled value='0' >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.SubTipo}`,
                    value: `${item.Id_SubTipo_Barrio_Vereda}`,
                });

                $('#txtSubTipo_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

ListarBarrios_Veredas = (Id_Municipio, Id_SubTipo) => {

    $.ajax({
        url: `${URL}/BarriosVeredas/ConsultarBarriosVeredas/${Id_Municipio}/${Id_SubTipo}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {


            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Barrio_Vereda}`,
                    value: `${item.Id_Barrios_Veredas}`,
                });

                $('#txtNombre_Lugar_E').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })
}





EditarCliente = () => {


    if ($("#txtFecha_inicio_E").val().length > 0 && $("#txtCamara_Comercio_Actual").find('.fileinput-filename').text().length == 0) {

        // Objeto JSON con plan sin documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: true,
            Validacion_Doc_S: false,

            // Cliente
            Id_Cliente: parseInt(Id_Cliente),
            NIT_CDV: ($("#txtNIT_E").val()),
            Razon_Social: $("#txtRazonSocial_E").val(),
            Telefono: $("#txtTelefono_E").val(),
            Direccion: $("#txtDireccion_E").val(),
            Encargado: $("#txtEncargado_E").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto_E").val(),
            Extension: $("#txtExtension_E").val(),
            Id_Barrios_Veredas: parseInt($("#txtNombre_Lugar_E").val()),


            //DBL
            Id_DBL: parseInt(Id_DBL),
            Id_Operador: parseInt($("#txtOperador_E").val()),
            Cantidad_Lineas: parseInt($("#txtCantidad_Lineas_E").val()),
            Valor_Mensual: $("#txtValor_Mensual_E").val(),
            Cantidad_Minutos: $("#txtMinutos_E").val(),
            Cantidad_Navegacion: $("#txtNavegacion_E").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter_E").val(),
            Mensajes_Texto: $("#txtMensajes_E").val(),
            Aplicaciones: $("#txtApps_E").val(),
            Roaming_Internacional: $("#txtRoaming_E").val(),

            //Plan Corporativo
            Id_Plan_Corporativo: parseInt(Id_Plan_Corporativo),
            Fecha_Inicio: $("#txtFecha_inicio_E").val(),
            Fecha_Fin: $("#txtFecha_fin_E").val(),
            Descripcion: $("#txtDescripcion_E").val(),
        };
    } else if ($("#txtFecha_inicio_E").val().length > 0 && $("#txtCamara_Comercio_Actual").find('.fileinput-filename').text().length > 0) {

        //Objeto JSON con plan y con documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: true,
            Validacion_Doc_S: true,

            // Cliente
            Id_Cliente: parseInt(Id_Cliente),
            NIT_CDV: ($("#txtNIT_E").val()),
            Razon_Social: $("#txtRazonSocial_E").val(),
            Telefono: $("#txtTelefono_E").val(),
            Direccion: $("#txtDireccion_E").val(),
            Encargado: $("#txtEncargado_E").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto_E").val(),
            Extension: $("#txtExtension_E").val(),
            Id_Barrios_Veredas: parseInt($("#txtNombre_Lugar_E").val()),

            //DBL
            Id_DBL: parseInt(Id_DBL),
            Id_Operador: parseInt($("#txtOperador_E").val()),
            Cantidad_Lineas: parseInt($("#txtCantidad_Lineas_E").val()),
            Valor_Mensual: $("#txtValor_Mensual_E").val(),
            Cantidad_Minutos: $("#txtMinutos_E").val(),
            Cantidad_Navegacion: $("#txtNavegacion_E").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter_E").val(),
            Mensajes_Texto: $("#txtMensajes_E").val(),
            Aplicaciones: $("#txtApps_E").val(),
            Roaming_Internacional: $("#txtRoaming_E").val(),

            //Plan Corporativo
            Id_Plan_Corporativo: parseInt(Id_Plan_Corporativo),
            Fecha_Inicio: $("#txtFecha_inicio_E").val(),
            Fecha_Fin: $("#txtFecha_fin_E").val(),
            Descripcion: $("#txtDescripcion_E").val(),

            // Documentos Soporte
            Id_Documentos: parseInt(Id_Documentos),
            Camara_Comercio: null,
            Cedula_RL: null,
            Soporte_Ingresos: null,
            Detalles_Plan_Corporativo: null
        };

        if ($("#txtCamara_Comercio_E").val().length < 0) {
            datos.Camara_Comercio = $("#txtCamara_Comercio_E").val()
        } else {
            datos.Camara_Comercio = $("#txtCamara_Comercio_Actual").find('.fileinput-filename').text();
        }

        if ($("#txtCedula_E").val().length < 0) {
            datos.Cedula_RL = $("#txtCedula_E").val()
        } else {
            datos.Cedula_RL = $("#txtCedula_Actual").find('.fileinput-filename').text();
        }

        if ($("#txtSoporte_E").val().length < 0) {
            datos.Soporte_Ingresos = $("#txtSoporte_E").val()
        } else {
            datos.Soporte_Ingresos = $("#txtSoporte_Actual").find('.fileinput-filename').text();
        }

        if ($("#txtDetalles_E").val().length < 0) {
            datos.Detalles_Plan_Corporativo = $("#txtDetalles_E").val()
        } else {
            datos.Detalles_Plan_Corporativo = $("#txtDetalles_Actual").find('.fileinput-filename').text();
        }


    } else if ($("#txtFecha_inicio_E").val().length == 0) {

        //Objeto JSON sin plan y sin documentos
        var datos =
        {
            // Varaibles de control
            Validacion_PLan_C: false,

            // Cliente
            Id_Cliente: parseInt(Id_Cliente),
            NIT_CDV: ($("#txtNIT_E").val()),
            Razon_Social: $("#txtRazonSocial_E").val(),
            Telefono: $("#txtTelefono_E").val(),
            Direccion: $("#txtDireccion_E").val(),
            Encargado: $("#txtEncargado_E").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto_E").val(),
            Extension: $("#txtExtension_E").val(),
            Id_Barrios_Veredas: parseInt($("#txtNombre_Lugar_E").val()),

            //DBL
            Id_DBL: parseInt(Id_DBL),
            Id_Operador: parseInt($("#txtOperador_E").val()),
            Cantidad_Lineas: parseInt($("#txtCantidad_Lineas_E").val()),
            Valor_Mensual: $("#txtValor_Mensual_E").val(),
            Cantidad_Minutos: $("#txtMinutos_E").val(),
            Cantidad_Navegacion: $("#txtNavegacion_E").val(),
            Llamadas_Internacionales: $("#txtLlamadas_Inter_E").val(),
            Mensajes_Texto: $("#txtMensajes_E").val(),
            Aplicaciones: $("#txtApps_E").val(),
            Roaming_Internacional: $("#txtRoaming_E").val(),
        };
    }

    $.ajax({
        url: `${URL}/Cliente`,
        type: 'put',
        dataType: 'json',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        processData: false
    }).done(respuesta => {

        if (respuesta.data.ok) {

            swal({
                title: "Información modificada correctamente.",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#2F6885",
                confirmButtonText: "Continuar",
                closeOnConfirm: true,
            });
        } else {
            swal({
                title: "Error al modificar.",
                text: "Ha ocurrido un error al modificar, intenta de nuevo",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#2F6885",
                confirmButtonText: "Continuar",
                closeOnConfirm: true,
            });
        }

    }).fail(error => {

        swal({
            title: "Error al modificar.",
            text: "Ha ocurrido un error al modificar, intenta de nuevo",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#2F6885",
            confirmButtonText: "Continuar",
            closeOnConfirm: true,
        });

    });
}

LimpiarDoc_Soporte = () => {

    $("#txtCamara_Comercio_Actual").find('.fileinput-filename').text("");
    $("#txtCedula_Actual").find('.fileinput-filename').text("");
    $("#txtSoporte_Actual").find('.fileinput-filename').text("");
    $("#txtDetalles_Actual").find('.fileinput-filename').text("");
}

// Cuando se cierre el modal
$(".ModalEditar").on("hidden.bs.modal", function () {

    LimpiarDoc_Soporte();
    $("#Form_Editar_Clientes").steps("destroy");

});

$(function () {


})