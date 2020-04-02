Eliminarusuario = (Id_usuario) => {

    $.ajax({
        url: `${URL}/Usuarios/${Id_usuario}`,
        type: 'delete',
        datatype: 'json',
        success: function (datos) {

            if(datos.data.Eliminar){

                RecargarDataTable();

            }else{

                 swal({
                    title: "Error al eliminar.",
                    type: "error",
                    text: "No se puede eliminar el usuario, debido a que está asociado a un registro de llamada o visita externa.",
                    showCancelButton: false,
                    confirmButtonColor: "#2F6885",
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: true,
                });

            }
           

        },
        error: function (error) {

            swal({
                title: "Error al eliminar.",
                type: "error",
                text: "No se pudo realizar la petición, intente más tarde.",
                showCancelButton: false,
                confirmButtonColor: "#2F6885",
                confirmButtonText: "Cerrar",
                closeOnConfirm: true,
            });
            console.log(error);
        }
    });

}


RecargarDataTable = () => {

    DataTableUsuarios.ajax.reload();
    swal("Registro eliminado!", "Se ha eliminado el usuario.", "success");
    
}