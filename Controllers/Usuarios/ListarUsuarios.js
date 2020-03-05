const URL = 'http://localhost:8081';

ObtenerUsuario = (Id_Usuario, Modal) => {

    $.ajax({
        url: `${URL}/Usuarios/${Id_Usuario}`,
        type: 'get',
        datatype: 'json',
        success: function(datos){


            if(Modal == 1){

                CargarDatosModalDetalles(datos);

            }else if(Modal == 2){

                CargarDatosModalEditar(datos);
            }else if(Modal == 3){

                CargarDatosModalEliminar(datos);
            }
            
        },
        error: function(error){
                console.log(error);
        }
    })
}

$(function () {

    $('#UsuariosDataTable').DataTable({
        ajax: {
            url: `${URL}/Usuarios`,
            error: function(error){
                console.log("Eror al listar usuarios " + error);
            }
        },
        // data: datos,
        aoColumns: [
            { mData: 'Id_Usuario', sClass: "MyStyle_Id_Usuario_Column"},
            { mData: 'Usuario'},
            { mData: 'Nombre'},
            { mData: 'Apellidos' },
            { mData: 'Rol'},
            { mData: 'Correo'},
            { mData: 'Celular'},
            { defaultContent: 
                    `<button id="btnDetalles"  data-toggle="tooltip" data-original-title="Ver perfil" class="btn btn-outline-primary">
                        <i class="fa  fa-eye"></i>
                    </button>
                    
                    <button id="btnEditar" class="btn btn-outline-info">
                        <i class="fa fa-pencil"></i>
                    </button>
                    
                    <button id="btnEliminar" class="btn btn-outline-danger">
                        <i class="fa fa-close"></i> 
                    </button>
            `}
                
        ],
        
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });
});

// Cargar Modal
// 1 -> Detalles
// 2 -> Editar

// Detalles usuario y empleado - abrir modal y cargar datos
$(document).on("click","#btnDetalles", function(){

    fila = $(this).closest("tr");

    Id_Usuario = parseInt(fila.find('td:eq(0)').text());

    ObtenerUsuario(Id_Usuario,1);

});



// Editar usuarios y empleado - abrir modal y cargar datos
$(document).on("click","#btnEditar", function(){

    fila = $(this).closest("tr");

    Id_Usuario = parseInt(fila.find('td:eq(0)').text());

    ObtenerUsuario(Id_Usuario,2);

});


// Eliminar usuarios y empleado - abrir modal y cargar datos
$(document).on("click","#btnEliminar", function(){

    fila = $(this).closest("tr");

    Id_Usuario = parseInt(fila.find('td:eq(0)').text());

    ObtenerUsuario(Id_Usuario,3);

});

