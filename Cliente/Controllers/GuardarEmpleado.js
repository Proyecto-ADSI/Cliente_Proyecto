//API

const URL = 'http://localhost:8080'

//funcion Guardar

let Guardar = () =>
{

//Objeto JSON

let DatosUsuario =

{    
"Id_Rol":parseInt($("#Rol").val()),
"Usuario":$("#Usuario").val(),
"Contrasena":$("#Contrasena").val()

};

$.ajax({

    // A donde va a ir a guardar
    url: `${URL}/usuario`,
    // lo que se queire recibir
    dataType: 'json',
    // tipo de petición que se hace
    type:'post',
    // tipo de contenido
    contenType: 'aplication/json',
    // los datos que se envían
    data: JSON.stringify(DatosUsuario),
    // No procesar datos
    processData: false


// done -> capturar respuesta del servidor 
}).done(respuesta => {
    // La api devuelve un booleando -> revisar accion de crear en la api  
        alert("Se guardaron los datos");
        location.href = "GestionarUsuarios.html"

}).fail(error =>{
    console.log(error);
});



let GuardarEmpleado = (Id_Empleado) =>
{
let DatosEmpleado =
{  
"Id_Usuario":Id_Empleado,    
"Documento":$("#Documento").val(),
"Nombre":$("#Nombre").val(),
"Apellido":$("#Apelldo").val(),
"Email":$("#Email").val(),
"Sexo":$("#Sexo").val(),
"Turno":$("#Turno").val()

};

console.log(DatosEmpleado)

$.ajax({

    // A donde va a ir a guardar
    url: `${URL}/empleado`,
    // lo que se queire recibir
    dataType: 'json',
    // tipo de petición que se hace
    type:'post',
    // tipo de contenido
    contenType: 'aplication/json',
    // los datos que se envían
    data: JSON.stringify(DatosEmpleado),
    // No procesar datos
    processData: false


// done -> capturar respuesta del servidor 
}).done(respuesta => {
    // La api devuelve un booleando -> revisar accion de crear en la api  
        alert("Se guardaron los datos");
        

}).fail(error =>{
    console.log(error);
});
}


let usuario = $("#Usuario").val()
console.log(usuario)
$.ajax({

    url: `${URL}/usuario/${usuario}`,
    dataType: 'json',
    type: 'get'


}).done(respuesta =>{


    let Array = []; 

    Array = respuesta.data;

    //Capturamos datos de Usuario

    let Rol = parseInt(Array['Id_Rol']) 
    let Contrasena= Array['Contrasena']
    let Id = Array['Id_Usuarios']

    GuardarEmpleado(Id);

    console.log(Array)

        
}).fail(error =>{

    alert ("No Existe");

});





console.log(DatosUsuario)



}
