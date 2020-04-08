let ListarTurnos = () =>{ 

    let contador=0;

    $.ajax({
        url: `${URL}/Turnos`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{  
        $("#TablaTurnos").empty();

        for(let item of respuesta.data){

            contador++
            $("#TablaTurnos").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre}</td>
            <td>${item.Inicio}</td>
            <td>${item.Fin}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" id="EditarTurnos" data-toggle="modal" data-target="#ModificarDocumento" onclick="ObtenerDocumento(${item.Id_Documento})" style="cursor:pointer;"></i>
                    <i class="fa fa-close text-danger" style="cursor:pointer;"></i>  
                    <input type="checkbox" id="Documento" class="js-switch8" data-color="#26c6da"  data-secondary-color="#f62d51" data-size="small" checked  />
            </td>
        </tr>
        <tr>
        
            ` ); 
        }

        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch8'));
        $('.js-switch8').each(function() {
           new Switchery($(this)[0], $(this).data());
        }); 



    }).fail(error =>{
        console.log(error);
    });

}



$(document).ready(function(){
    $('#TurnosTab').click(function(){
        ListarTurnos();
    });
});
