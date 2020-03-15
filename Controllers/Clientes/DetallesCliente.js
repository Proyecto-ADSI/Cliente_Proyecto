
// Para editar
var Id_Cliente;

CargarDatosModalDetalles = (datos) => {

    Informacion = datos.data;

    // Llenar detalles cliente
    Id_Cliente = Informacion.Id_Cliente;
    document.getElementById("txtNIT").innerHTML = Informacion.NIT_CDV;
    document.getElementById("txtRazon_Social").innerHTML = Informacion.Razon_Social;
    document.getElementById("txtTelefono").innerHTML = Informacion.Telefono;
    document.getElementById("txtPais").innerHTML = Informacion.Nombre_Pais;
    document.getElementById("txtDepartamento").innerHTML = Informacion.Nombre_Departamento;
    document.getElementById("txtMunicipio").innerHTML = Informacion.Nombre_Municipio;
    document.getElementById("txtTipo").innerHTML = Informacion.SubTipo;
    document.getElementById("txtBarrio_Vereda").innerHTML = Informacion.Nombre_Barrio_Vereda;
    document.getElementById("txtDireccion").innerHTML = Informacion.Direccion;
    document.getElementById("txtEncargado").innerHTML = Informacion.Encargado;
    document.getElementById("txtTelefono_Contacto").innerHTML = Informacion.Telefono_Contacto;
    document.getElementById("txtExtension").innerHTML = Informacion.Extension;
    document.getElementById("txtCantidad_Lineas").innerHTML = Informacion.Cantidad_Lineas;
    document.getElementById("txtValor_Mensual").innerHTML = Informacion.Valor_Mensual;
    document.getElementById("txtMinutos").innerHTML = Informacion.Cantidad_Minutos;
    document.getElementById("txtNavegacion").innerHTML = Informacion.Cantidad_Navegacion;
    document.getElementById("txtMensajes").innerHTML = Informacion.Mensajes_Texto;
    document.getElementById("txtApps").innerHTML = Informacion.Aplicaciones;
    document.getElementById("txtRoaming").innerHTML = Informacion.Roaming_Internacional;
    document.getElementById("txtLlam_Inter").innerHTML = Informacion.Llamadas_Internacionales;
    document.getElementById("txtFecha_Inicio").innerHTML = Informacion.Fecha_Inicio;
    document.getElementById("txtFecha_Fin").innerHTML = Informacion.Fecha_Fin;
    document.getElementById("txtDescripcion").innerHTML = Informacion.Descripcion;



    // Mostrar Modal con formulario para editar
    $('.ModalDetalles').modal('show');

}

MostrarModalEditar = () =>{
    
    $('.ModalDetalles').modal('hide');
    ObtenerCliente(Id_Cliente,2);
}