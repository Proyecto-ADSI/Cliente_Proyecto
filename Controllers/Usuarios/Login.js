
const URL = 'http://localhost:8080'


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

        if (respuesta.data.ok) {

             // Crear Sesión 
            localStorage.Usuario = respuesta.data.Usuario;
            localStorage.Id_Usuario = respuesta.data.Id_Usuario;
            localStorage.Rol = respuesta.data.Rol;
            
         
            let Rol = parseInt(respuesta.data.Rol);
            //Redireccionamiento
            switch (Rol) {
                case 1:
                    //Administrador
                    location.href = "../Administrador/Inicio/Index.html"

                    break;
                case 2:
                    //Coordinador
                    location.href = "../Coordinador/Menu.html"

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

        console.log(error);


    });

}


$(function () {

    $("#loginform").validate({
        // invalidHandler: function(){
        //     console.log("Holls Bad")
        // },
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
        // messages: {
        //     Usuario:{
        //         required:"Este campo es requerido",
        //         minlength: "Se requieren como mínimo 8 caracteres"
        //     }
        // }


    });


})

