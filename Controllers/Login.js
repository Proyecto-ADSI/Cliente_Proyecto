
//Direccion del API Rest Full

const URL = 'http://localhost:8080'


//Funcion login ingresar

let Login = () =>{

    //Capturar usuario

    let Usuario = $('#Usuario').val()

    console.log(Usuario);

        $.ajax({

            url: `${URL}/usuario/${Usuario}`,
            dataType: 'json',
            type: 'get'


        }).done(respuesta =>{


            let Array = []; 

            Array = respuesta.data;

            //Capturamos datos de Usuario

            let Rol = parseInt(Array['Id_Rol']) 
            let Contrasena= Array['Contrasena']
            let Id = Array['Id_Usuarios']

            //Validar contraseña


            if(Contrasena == $('#Contrasena').val())

                {

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
                        location.href = "../Contac_Center/Index.html"
                            
                            break;
                        case 4:
                        //Gestor
                        location.href = "../Gestor Cliente/Index.html"
                            
                            break;
                        case 5:

                        location.href = "../Asesor/Asesor interno/Form_ReporteVisita.html"
                            
                            break;
                        case 6:

                        location.href = "../Asesor/Asesor interno/.html"
                            
                            break;
                    
                    }
                    
                }

                else

                {
                    
                    alert ("No funciono");

                }

               
            
        }).fail(error =>{

            alert ("No Existe");
            location.href = this

        });

}



                