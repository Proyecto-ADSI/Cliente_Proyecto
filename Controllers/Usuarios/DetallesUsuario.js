
// Para editar
var Id_UsuarioDetalle;
var Id_EmpleadoDetalle;


CargarDatosModalDetalles = (datos) => {

    Informacion = datos.data;

    // Llenar detalles empleado
    Id_EmpleadoEditar = Informacion.Id_Empleado;
    document.getElementById("txtNombreDetalle").innerHTML = Informacion.Nombre + " " + Informacion.Apellidos;
    document.getElementById("txtCorreoDetalle").innerHTML = Informacion.Correo;
    document.getElementById("txTipoDocumentoDetalle").innerHTML = Informacion.Tipo_Documento;
    document.getElementById("txtDocumentoDetalle").innerHTML = Informacion.Documento;
    document.getElementById("txtSexoDetalle").innerHTML = Informacion.Sexo;
    document.getElementById("txtCelularDetalle").innerHTML = Informacion.Celular;
    document.getElementById("txtTurnoDetalle").innerHTML = Informacion.Turno;

    // Llenar detalles usuario
    Id_UsuarioDetalle = Informacion.Id_Usuario;
    document.getElementById("txtUsuarioDetalle").innerHTML = Informacion.Usuario;
    document.getElementById("txtRolDetalle").innerHTML = Informacion.Rol;
    document.getElementById("txtConexionDetalle").innerHTML = Informacion.Conexion;
    document.getElementById("txtEstadoDetalle").innerHTML = Informacion.Estado;

    // Mostrar Modal con formulario para editar
    $('.ModalDetallesUsuarios').modal('show');

}

MostrarModalEditar = () =>{
    
    $('.ModalDetallesUsuarios').modal('hide');
    ObtenerUsuario(Id_UsuarioDetalle,2);
}