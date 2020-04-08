EliminarCliente = (Id_Cliente) => {

    $.ajax({
        url: `${URL}/Cliente/${Id_Cliente}`,
        type: 'delete',
        datatype: 'json',
        success: function (datos) {

            if(datos.data.Eliminar){

                RecargarDataTable();

            }else{

                 swal({
                    title: "Error al eliminar.",
                    type: "error",
                    text: "No se puede eliminar el cliente, debido a que está asociado a un registro de llamada o visita externa.",
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

    DataTable.ajax.reload();
    swal("Registro eliminado!", "Se ha eliminado el cliente.", "success");
    
}