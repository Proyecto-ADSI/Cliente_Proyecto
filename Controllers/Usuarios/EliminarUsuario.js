


CargarDatosModalEliminar = (datos) => {

    Informacion = datos.data;
    document.getElementById("txtNombreEliminar").innerHTML = Informacion.Nombre + " " + Informacion.Apellidos;
    document.getElementById("txtUsuarioEliminar").innerHTML = Informacion.Usuario;
    document.getElementById("txtRolEliminar").innerHTML = Informacion.Rol;

    $('.ModalEliminarUsuarios').modal('show');

}