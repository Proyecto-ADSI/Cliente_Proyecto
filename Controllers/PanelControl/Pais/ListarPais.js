let ListarPais = () =>{ 
   

    $.ajax({
        url: `${URL}/Pais`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaPais").empty();
         contador=0;
        for(let item of respuesta.data){
            contador++
            $("#TablaPais").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre_Pais}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" id="EditarPais" data-toggle="modal" data-target="#ModificarPais" onclick="ObtenerPais(${item.Id_Pais})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch5" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `);
        }

        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch5'));
        $('.js-switch5').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
        
    }).fail(error =>{
        console.log(error);
    });
}
$(document).ready(function(){
    $('#PaisTab').click(function(){
        ListarPais();
    });
});
