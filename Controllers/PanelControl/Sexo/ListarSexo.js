let ListarSexo = () =>{ 
   

    $.ajax({
        url: `${URL}/Sexo`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaSexo").empty();
         contador=0;
        for(let item of respuesta.data){
            contador++
            $("#TablaSexo").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarSexo" onclick="ObtenerSexo(${item.Id_Sexo})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch6" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `);
        }

        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch6'));
        $('.js-switch6').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
        
    }).fail(error =>{
        console.log(error);
    });
}
$(function(){
   ListarSexo();
});