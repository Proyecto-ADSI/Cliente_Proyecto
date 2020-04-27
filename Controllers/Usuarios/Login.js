
const URL = 'http://localhost:8081';


let Login = () => {

    let datos = {
        Usuario: $('#Usuario').val(),
        Contrasena: $('#Contrasena').val()
    }

    $.ajax({

        url: `${URL}/Usuarios/Login`,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(datos),
        processData: false

    }).done(respuesta => {

        console.log(respuesta);
        
        if (respuesta.data.ok) {

             // Crear Sesión 
            sessionStorage.Usuario = respuesta.data.Usuario;
            sessionStorage.Id_Usuario = respuesta.data.Id_Usuario;
            sessionStorage.Id_Rol = respuesta.data.Id_Rol;
            sessionStorage.Rol = respuesta.data.Rol;
            sessionStorage.Email = respuesta.data.Email;
            sessionStorage.Imagen = respuesta.data.Imagen

            let Rol = parseInt(respuesta.data.Id_Rol);
            //Redireccionamiento
            switch (Rol) {
                case 1:
                    //Administrador
                    location.href = "../Administrador/Inicio/Index.html"

                    break;
                case 2:
                    //Coordinador
                    location.href = "../Coordinador/Inicio/Menu.html"

                    break;
                case 3:
                    //Contac center
                    location.href = "../Contact Center/Index.html"

                    break;
                case 4:
                    //Gestor
                    location.href = "../Gestor Cliente/Index.html"

                    break;
                case 5:
                    //Asesor
                    location.href = "../Asesor/Asesor interno/Form_ReporteVisita.html"

                    break;
                // case 6:
                // location.href = "../Asesor/Asesor interno/.html"
                //     break;

            }

        } else {

            swal("¡Usuario o contraseña no válido!", "Verifica los datos e intenta nuevamente", "error");

        }

    }).fail(error => {

        swal("¡Error en el servidor!", "Ponte en contacto con el administrador.", "error");
        console.log(error);
    });

}


$(function () {

    $("#loginform").validate({
        submitHandler: function (){
            Login();
        },
        rules: {
            Usuario: {
                required: true,
                minlength: 5,
                maxlength: 20
            },
            Contrasena:{
                required: true
            }
        },
        errorClass: "form-control-feedback",
        errorElement: "div",
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-danger");
        },
        unhighlight: function (element) {
            $(element).parents(".form-group").removeClass("has-danger");
        }

    });


})

