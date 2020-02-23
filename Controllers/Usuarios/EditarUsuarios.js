
// Variables globales de control
var UsuarioBD;
var UsuarioValido = false;

// Para editar
var Id_UsuarioEditar;
var Id_EmpleadoEditar;


CargarDatosModalEditar = (Datos) => {

    Informacion = Datos.data;

    // Llenar formulario de empleado
    Id_EmpleadoEditar = Informacion.Id_Empleado;
    CargarTiposDocumentos(Informacion.Id_Documento);
    $("#txtDocumento").val(Informacion.Documento);
    $("#txtNombre").val(Informacion.Nombre);
    $("#txtApellidos").val(Informacion.Apellidos);
    $("#txtCorreo").val(Informacion.Correo);
    CargarSexos(Informacion.Id_Sexo);
    $("#txtCelular").val(Informacion.Celular);
    // CargarTurnos(Informacion.Id_Turno);

    // Llenar formulario de usuario
    Id_UsuarioEditar = Informacion.Id_Usuario;
    UsuarioBD = Informacion.Usuario;
    $("#txtUsuario").val(Informacion.Usuario);
    // CargarRoles(Informacion.Id_Rol);




    // Mostrar Modal con formulario para editar
    $('.ModalEditarUsuarios').modal('show');
    

}

CargarTiposDocumentos = (Id_Documento) => {
    
    $.ajax({
        url: `${URL}/Documento`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarTipoDocumentos(Id_Documento, datos);
        },
        error: function(error){
            console.log(error);
        }

    })

}

ListarTipoDocumentos = (Id_Documento,datos) => {

    $('#txtTipoDocumento').empty();
        $('#txtTipoDocumento').prepend("<option disabled >Seleccione...</option>");

        for (let item of datos.data) {

            if (item.Id_Documento == Id_Documento) {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Documento}`,
                    selected: true
                })

            } else {

                var $opcion = $('<option />', {
                    text: `${item.Nombre}`,
                    value: `${item.Id_Documento}`
                })
            }

            $('#txtTipoDocumento').append($opcion);
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
        url: `${URL}/Turno`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarSexos(Id_Turno, datos);
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

            $('#txtSexo').append($opcion);
        }
}

CargarRoles = (Id_Rol) => {
    
    $.ajax({
        url: `${URL}/Turno`,
        type: 'get',
        datatype: 'json',
        success: function(datos){
            ListarSexos(Id_Rol, datos);
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

EditarUsuario = () => {

    var datos =
        {
            // Empleado
            Id_Empleado: parseInt(Id_EmpleadoEditar), 
            Tipo_Documento: parseInt($("#txtTipoDocumento").val()),
            Documento: $("#txtDocumento").val(),
            Nombre: $("#txtNombre").val(),
            Apellidos: $("#txtApellidos").val(),
            Correo: $("#txtCorreo").val(),
            Sexo: parseInt($("#txtSexo").val()),
            Celular: $("#txtCelular").val(),
            Imagen: "Ruta",
            Turno: parseInt($("#txtTurno").val()),

            // Usuario
            Id_Usuario: parseInt(Id_UsuarioEditar),
            Usuario: $("#txtUsuario").val(),
            Rol: parseInt($("#txtRol").val())
        };
        
        // console.log(datos);

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
                        location.href = "GestionarUsuarios.html";
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


    $("#FormEditarUsuario").validate({

        submitHandler: function () {

            EditarUsuario();

        },
        rules: {
            txtTipoDocumento: "required",
            txtDocumento: {
                required: true,
                SoloNumeros: true,
                minlength: 5
            },
            txtNombre: {
                required: true,
                SoloLetras: true,
                minlength: 2,
                maxlength: 30
            },
            txtApellidos: {
                required: true,
                SoloLetras: true,
                minlength: 2,
                maxlength: 30
            },
            txtEmail: {
                required: true,
                ValidarCorreo: true
            },
            txtSexo: "required",
            txtCelular: {
                NumeroMovil: true,
                minlength: 10,
                maxlength: 10
            },
            txtTurno: "required",
            txtUsuario: {
                required: true,
                minlength: 5,
                remote: {
                    url: `${URL}/Usuarios/Validacion/Disponible`,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        txtUsuario: function () {

                            UsuarioForm = $("#txtUsuario").val();

                            if(UsuarioBD == UsuarioForm ){
                                UsuarioValido = true; 
                            }else{
                                UsuarioValido = false;
                                return UsuarioForm;
                            }
                        }
                    },
                    dataFilter: function (res) {
                        var json = JSON.parse(res);
                        if (json.data == true || UsuarioValido == true) {
                            return '"true"';
                        } else {
                            return '"Usuario no disponible"';
                        }
                    }
                }
            },
            txtRol: "required"
        },
        errorClass: "form-control-feedback",
        errorElement: "div",
        highlight: function (element) {
            $(element).parents(".form-group").addClass("has-danger").removeClass("has-success");
            $(element).addClass("form-control-danger").removeClass("form-control-success");
        },
        unhighlight: function (element) {

            $(element).parents(".form-group").addClass("has-success").removeClass("has-danger");
            $(element).addClass("form-control-success").removeClass("form-control-danger");
        },
        errorPlacement: function (error, element) {
            if (element[0].id == "ListaEmpleados") {
                $(element).parents(".form-group").append(error);
            } else {

                error.insertAfter(element.parent(".input-group"));
            }
        }
    });
    
})