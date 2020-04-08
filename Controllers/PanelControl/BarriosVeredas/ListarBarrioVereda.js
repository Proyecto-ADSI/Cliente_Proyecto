let ListarBarrioVereda = () =>{ 
    let contador=0;

    $.ajax({
        url: `${URL}/BarriosVeredas`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaBarriosVeredas").empty();

        for(let item of respuesta.data){
            contador++
            $("#TablaBarriosVeredas").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre_Barrio_Vereda}</td>
            <td>${item.SubTipo}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" id="EditarBarriosVeredas" data-toggle="modal" data-target="#ModificarBarrioVereda" onclick="ObtenerBarriosVereda(${item.Id_Barrios_Veredas})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch1" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `);
        }
        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch1'));
        $('.js-switch1').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
        
    }).fail(error =>{
        console.log(error);
    });
}
$(document).ready(function(){
    $('#BarriosVeredasTab').click(function(){
        ListarBarrioVereda();
    });
});
