//API

const URL = 'http://localhost:8081'


let RegistrarCliente = () => {

    if ($("#txtFecha_inicio").val().length > 0 && $("#txtCamara_Comercio").get(0).files.length == 0) {

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
            Encargado: $("#txtEncargado").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto").val(),
            Extension: $("#txtExtension").val(),
            Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
            Estado_Cliente: 1,

            //DBL
            Id_Operador: parseInt($("#txtOperador").val()),
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
    } else if ($("#txtFecha_inicio").val().length > 0 && $("#txtCamara_Comercio").get(0).files.length > 0) {

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
            Encargado: $("#txtEncargado").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto").val(),
            Extension: $("#txtExtension").val(),
            Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
            Estado_Cliente: 1,

            //DBL
            Id_Operador: parseInt($("#txtOperador").val()),
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
    } else if ($("#txtFecha_inicio").val().length == 0) {

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
            Encargado: $("#txtEncargado").val(),
            Telefono_Contacto: $("#txtTelefono_Contacto").val(),
            Extension: $("#txtExtension").val(),
            Barrio_Vereda: parseInt($("#txtNombre_Lugar").val()),
            Estado_Cliente: 1,

            //DBL
            Id_Operador: parseInt($("#txtOperador").val()),
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

        console.log(respuesta)
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

CargarPaises = () => {

    $.ajax({
        url: `${URL}/Pais`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtPais').empty();
            $('#txtPais').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Pais}`,
                    value: `${item.Id_Pais}`,
                });
        
                $('#txtPais').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}


CargarDepartamentos = (Id_Pais) => {

    $.ajax({
        url: `${URL}/Departamento/ConsultarDepartamento/${Id_Pais}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
      
            $('#txtDepartamento').empty();
            $('#txtDepartamento').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Departamento}`,
                    value: `${item.Id_Departamento}`,
                });
                
                $('#txtDepartamento').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

CargarMunicipios = (Id_Departamento) => {

    $.ajax({
        url: `${URL}/Municipio/ConsultarMunicipio/${Id_Departamento}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtMunicipio').empty();
            $('#txtMunicipio').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Municipio}`,
                    value: `${item.Id_Municipio}`,
                });
                
                $('#txtMunicipio').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}

CargarSubTipos = () => {

    $.ajax({
        url: `${URL}/SubTipo`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
      
    
            $('#txtSubTipo').empty();
            $('#txtSubTipo').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.SubTipo}`,
                    value: `${item.Id_SubTipo_Barrio_Vereda}`,
                });
        
                $('#txtSubTipo').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })
   
}

CargarBarrios_Veredas = (Id_Municipio,Id_SubTipo) => {

    $.ajax({
        url: `${URL}/BarriosVeredas/ConsultarBarriosVeredas/${Id_Municipio}/${Id_SubTipo}`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {

            $('#txtNombre_Lugar').empty();
            $('#txtNombre_Lugar').prepend("<option selected disabled >Seleccione...</option>");
            for (let item of datos.data) {
                let $opcion = $('<option />', {
                    text: `${item.Nombre_Barrio_Vereda}`,
                    value: `${item.Id_Barrios_Veredas}`,
                });
                
                $('#txtNombre_Lugar').append($opcion);
            }
        },
        error: function (error) {
            console.log(error);
        }

    })

}


CargarOperadores = () => {

    $.ajax({
        url: `${URL}/Operador`,
        type: 'get',
        datatype: 'json',
        success: function (datos) {
            ListarOperadores(datos);
        },
        error: function (error) {
            console.log(error);
        }

    })

}

ListarOperadores = (datos) => {

    $('#txtOperador').empty();
    $('#txtOperador').prepend("<option selected disabled >Seleccione...</option>");
    for (let item of datos.data) {
        let $opcion = $('<option />', {
            text: `${item.Nombre_Operador}`,
            value: `${item.Id_Operador}`,
        });

        $('#txtOperador').append($opcion);
    }
}

$(function () {

    // Inicializar selects del formulario
    CargarOperadores();
    CargarPaises();
    CargarSubTipos();

  

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
        
            RegistrarCliente();
        }
    }),
        $(".Form_Registro_Clientes").validate({
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
                },
                txtDescripcion: {
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

    // TouchSpin    
    $("#txtValor_Mensual").TouchSpin({
        min: 0,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000,
        postfix: 'COP'
    });

    $("#txtPais").change(function(){

        let Id_Pais = $('#txtPais option:selected').val();
        CargarDepartamentos(Id_Pais);
    
    });

    $("#txtDepartamento").change(function(){
       
        let Id_Departamento = $('#txtDepartamento option:selected').val();
        CargarMunicipios(Id_Departamento);
    
    });


    var Id_Municipio;
    var Id_SubTipo;


    $("#txtMunicipio").change(function(){
        
        Id_Municipio = $('#txtMunicipio option:selected').val();
        
        if(Id_Municipio){
            if(Id_SubTipo){
                CargarBarrios_Veredas(Id_Municipio,Id_SubTipo);
            }
        }
    });

    $("#txtSubTipo").change(function(){
        
        Id_SubTipo = $('#txtSubTipo option:selected').val();
        
        if(Id_Municipio){
            if(Id_SubTipo){
                CargarBarrios_Veredas(Id_Municipio,Id_SubTipo);
            }
        }
    });

    

});





