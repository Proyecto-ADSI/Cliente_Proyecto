const URL = 'http://localhost:8081';

ObtenerCliente= (Id_Cliente, Modal) => {

    $.ajax({
        url: `${URL}/Cliente/${Id_Cliente}`,
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

    
     

    $('#ClientesDataTable').DataTable({
        ajax: {
            url: `${URL}/Cliente`,
            error: function(error){
                console.log("Eror al listar clientes " + error);
            }, 
            // success: function(success){
                   
               
            // }
        },
        aoColumns: [
            { mData: 'Id_Cliente', sClass: "MyStyle_Id_Principal_Column"},
            { mData: 'NIT_CDV'},
            { mData: 'Razon_Social'},
            { mData: 'Telefono' },
            { mData: 'Operador'},
            { mData: 'Corporativo'},
            { defaultContent: 
                    `
                    <input type="checkbox" id="switch_cliente" class="js-switch" checked/>

                    <button id="btnDetalles"  data-toggle="tooltip" data-original-title="Ver perfil" class="btn btn-outline-primary">
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
        },
        createdRow: function(row, data,index){
            
            let switchElem = Array.prototype.slice.call($(row).find('.js-switch'));
            
            switchElem.forEach(function (html) {
                let switchery = new Switchery(html, {
                    checked: true,
                    color: '#26c6da', 
                    secondaryColor: '#f62d51',
                    size: 'small',
                    disabled: true
                });
            });
      
        }
    });
        
});


$(document).on("click",".switchery ", function(){

    let fila = $(this).closest("tr");
    let switchElem = fila.find('.js-switch')[0];
    let Id_Cliente = parseInt(fila.find('td:eq(0)').text());

});

// Cargar Modal
// 1 -> Detalles
// 2 -> Editar
// 3 -> Eliminar


// Detalles - abrir modal y cargar datos
$(document).on("click","#btnDetalles", function(){

    fila = $(this).closest("tr");

    Id_Cliente = parseInt(fila.find('td:eq(0)').text());

    ObtenerCliente(Id_Cliente,1);

});



// Editar - abrir modal y cargar datos
$(document).on("click","#btnEditar", function(){

    fila = $(this).closest("tr");

    Id_Cliente = parseInt(fila.find('td:eq(0)').text());

    ObtenerCliente(Id_Cliente,2);

});


// Eliminar - abrir modal y cargar datos
$(document).on("click","#btnEliminar", function(){

    fila = $(this).closest("tr");

    Id_Cliente = parseInt(fila.find('td:eq(0)').text());

    ObtenerCliente(Id_Cliente,3);

});

