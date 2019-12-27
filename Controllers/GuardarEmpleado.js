//API

const URL = 'http://localhost:8080'

//funcion Guardar

let Guardar = () =>
{

//Objeto JSON
let datos =
{   
    // Empleado
    TipoDocumento : $("#txtTipoDocumento").val(),
    Documento: $("#txtDocumento").val(),
    Nombre: $("#txtNombre").val(),
    Apellido: $("#txtApellidos").val(),
    Email: $("#txtEmail").val(),
    Sexo: $("#txtSexo").val(),
    Turno: $("#txtTurno").val(),

    // Usuario
    Usuario:  $("#txtUsuario").val(),
    Contrasena: $("#txtContrasena").val(),
    Id_Rol :parseInt($("#txtRol").val())

};


$.ajax({

    // A donde va a ir a guardar
    url: `${URL}/Usuarios`,
    // lo que se queire recibir
    dataType: 'json',
    // tipo de petición que se hace
    type:'post',
    // tipo de contenido
    contentType: 'aplication/json',
    // los datos que se envían
    data: JSON.stringify(datos),
    // No procesar datos
    processData: false

// done -> capturar respuesta del servidor 
}).done(respuesta => {
    // La api devuelve un booleando -> revisar accion de crear en la api  
        alert("Se guardaron los datos");
        location.href = "GestionarUsuarios.html"

    console.log(respuesta);

}).fail(error =>{
    console.log(error);
});


}
