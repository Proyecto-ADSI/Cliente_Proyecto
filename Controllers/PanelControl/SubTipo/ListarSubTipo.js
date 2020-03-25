let ListarSubTipo = () =>{ 
    

    $.ajax({
        url: `${URL}/SubTipo`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaSubTipo").empty();
        contador=0;
        for(let item of respuesta.data){
            contador++
            $("#TablaSubTipo").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.SubTipo}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarSubTipo" onclick="ObtenerSubTipo(${item.Id_SubTipo_Barrio_Vereda})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch7" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `); 
        }
        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch7'));
        $('.js-switch7').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
        
    }).fail(error =>{
        console.log(error);
    });
}
$(function(){
   ListarSubTipo();
});