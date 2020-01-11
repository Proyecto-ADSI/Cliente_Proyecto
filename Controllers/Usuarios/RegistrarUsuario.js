//API

const URL = 'http://localhost:8080'


let RegistrarUsuario = () => {

    if (localStorage.Id_Empleado) {

        //Objeto JSON
        var datos =
        {
            // Empleado
            Id_Empleado: parseInt(localStorage.getItem("Id_Empleado")),

            // Usuario
            Usuario: $("#txtUsuario").val(),
            Contrasena: $("#txtContrasena").val(),
            Rol: parseInt($("#txtRol").val())
        };

        localStorage.removeItem("Id_Empleado");

    } else {


        //Objeto JSON
        var datos =
        {
            // Empleado
            Tipo_Documento: parseInt($("#txtTipoDocumento").val()),
            Documento: $("#txtDocumento").val(),
            Nombre: $("#txtNombre").val(),
            Apellidos: $("#txtApellidos").val(),
            Email: $("#txtEmail").val(),
            Sexo: parseInt($("#txtSexo").val()),
            Celular: $("#txtCelular").val(),
            Imagen: "Ruta",
            Turno: parseInt($("#txtTurno").val()),

            // Usuario
            Usuario: $("#txtUsuario").val(),
            Contrasena: $("#txtContrasena").val(),
            Rol: parseInt($("#txtRol").val())
        };

    }

    $.ajax({
        // A donde va a ir a guardar
        url: `${URL}/Usuarios`,
        // lo que se queire recibir
        dataType: 'json',
        // tipo de petición que se hace
        type: 'post',
        // tipo de contenido
        contentType: 'aplication/json',
        // los datos que se envían
        data: JSON.stringify(datos),
        // No procesar datos
        processData: false

        // done -> capturar respuesta del servidor 
    }).done(respuesta => {
        // La api devuelve un booleando -> revisar accion de crear en la api  
        if (respuesta.data.ok) {

            swal({
                title: "Usuario registrado correctamente.",
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
        }else{
            swal({
                title: "Error al registrar.",
                text: "Ha ocurrido un error al registrar, intenta de nuevo",
                type: "danger",
                showCancelButton: false,
                confirmButtonColor: "#2F6885",
                confirmButtonText: "Continuar",
                closeOnConfirm: false,
            }, function (isConfirm) {
                if (isConfirm) {
                    location.href = "Registro.html";
                    console.log(respuesta.data);
                }
            });
        }

    }).fail(error => {

        swal({
            title: "Error al registrar.",
            text: "Ha ocurrido un error al registrar, intenta de nuevo",
            type: "danger",
            showCancelButton: false,
            confirmButtonColor: "#2F6885",
            confirmButtonText: "Continuar",
            closeOnConfirm: false,
        }, function (isConfirm) {
            if (isConfirm) {
                location.href = "Registro.html";
                console.log(error);
            }
        });


    });

}


$(function () {
    
     $("#FormRegistroUsuario").validate({
      
        submitHandler: function (){
           
            RegistrarUsuario();
         
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
                SoloLetras:true,
                minlength: 2,
                maxlength: 30
            },
            txtApellidos:{
                required: true,
                SoloLetras: true,
                minlength: 2,
                maxlength: 30
            },
            txtEmail: "required",
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
                remote:{
                    url: `${URL}/Usuarios/Disponible`,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        txtUsuario: function(){
                            return $("#txtUsuario").val();
                        }
                    },
                    dataFilter: function(res){
                        var json  = JSON.parse(res);
                        if(json.data){
                            return '"true"';
                        }else{
                            return '"Usuario no disponible"';
                        }
                    }
                }
            },
            txtRol: "required",
            txtContrasena: {
                required: true,
                minlength: 5
            },
            txtConfirmarContrasena: {
                required: true,
                equalTo: "#txtContrasena"
            },
            ListaEmpleados: "required"
        },
        messages:{
            txtConfirmarContrasena: {
                equalTo: "Las contraseñas no coinciden"
            }

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
        errorPlacement: function(error, element) {
            if(element[0].id == "ListaEmpleados"){
                $(element).parents(".form-group").append(error);
            }else{

                error.insertAfter(element.parent(".input-group"));
            }          
        }
    });



    $(".ListarEmpleados").select2({
        placeholder: "Seleccione un empleado",
        language: "es",
        allowClear: true,
        maximumInputLength: 20,
        ajax: {
            url: `${URL}/Empleados`,
            dataType: 'json',
            delay: 250,
            type: 'get',
            data: function (params) {
                var query = {
                    palabra: params.term
                }
                return query;
            },
            processResults: function (respuesta) {
                return {
                    results: respuesta.data.results
                }
            },
            cache: true
        }

    });

    $(".ListarEmpleados").on("select2:select", function (e) {
        $(this).trigger('blur');
        var Id_Empleado = $(e.currentTarget).val();
        localStorage.Id_Empleado = Id_Empleado;

    });

    // Eliminar selección
    $("#FormularioEmpleado").click(function(){
        if(localStorage.Id_Empleado){
            localStorage.removeItem("Id_Empleado");
        }
    });
    
});
