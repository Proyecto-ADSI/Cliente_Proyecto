
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



                