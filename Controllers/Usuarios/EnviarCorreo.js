let ValidarUsuario = () =>
{
    usuario = $("#Usuario_Recuperar").val()
    

    $.ajax({
        url: `${URL}/Usuarios/ValidarUsuario/${usuario}`,
        dataType: 'json',
        type: 'get',
    }).done(respuesta => {

        if(!respuesta.data.ok){

            swal("¡Usuario no válido!","Verifica el usuario e intenta nuevamente", "error");

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