
//Direccion del API Rest Full

const URL = 'http://localhost:8080'


//Funcion login ingresar

let Login = () =>{

    //Capturar usuario

    let datos = {

        Usuario: $('#Usuario').val(),
        Contrasena: $('#Contrasena').val()

    }
        
     
    // console.log(datos);

        $.ajax({

            url: `${URL}/Usuarios/Login`,
            dataType: 'json',
            type: 'post',
            contentType:'application/json',
            data: JSON.stringify(datos),
            processData: false

        }).done(respuesta =>{

            if(respuesta.data.ok){

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

                    location.href = "../Asesor/Asesor interno/Form_ReporteVisita.html"
                        
                        break;
                    // case 6:
                    // location.href = "../Asesor/Asesor interno/.html"
                    //     break;
                
                }
                
           }       
            
        }).fail(error =>{

            alert ("No Existe");

        });

}

let ValidarUsuario = () =>
{
    usuario = $("#Usuario_Recuperar").val()
    

    $.ajax({
        url: `${URL}/Usuarios/ValidarUsuario/${usuario}`,
        dataType: 'json',
        type: 'get',
    }).done(respuesta => {

        if(!respuesta.data){


            swal("¡Usuario no válido!","Verifica el usuario e intenta nuevamente", "danger");

        }else{

            let email = respuesta.data.Email

            let emailInicio = email.substring(0,4)

            let emailFin = email.split("@");

            let emailSeguro = emailInicio + "****@" + emailFin[1];

            swal({
                title: "Enviar correo",
                text: "Se enviarán instrucciones al correo " + emailSeguro + " para restablecer la contraseña.",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Enviar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
              }, function () {
                setTimeout(function () {
        
                    $.ajax({
        
                        url: `${URL}/Usuarios/EnviarCorreo/${usuario}`,
                        type: 'get',
                        dataType: 'json'
                
                    }).done(respuesta =>{
                        
                        if(respuesta.data.ok)
                        {   
                            swal({
                                title: "¡Correo enviado!",
                                text: "Revisa el correo que se ha enviado",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonClass: "btn-info",
                                confirmButtonText: "Cerrar",
                                closeOnConfirm: false
                              },
                              function(){

                                location.href = "Login.html";

                              });


                            // swal("¡Correo enviado!","Revisa el correo que se ha enviado", "success");
        
                        }else{
                            swal("¡Correo NO enviado!","Ha ocurrido un error intenta nuevamente", "danger");
                        }
                        
                    }).fail(error => {
                
                        console.error(error);
                    });
        
              
                }, 2000);
              });

        }

    }).fail(error =>{
        console.error(error);
    })
    



    
}



                