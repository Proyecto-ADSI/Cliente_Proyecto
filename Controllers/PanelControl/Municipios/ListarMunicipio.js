let ListarMunicipio = () =>{ 
   

    $.ajax({
        url: `${URL}/Municipio`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaMunicipio").empty();
         contador=0;
        for(let item of respuesta.data){
            contador++
            $("#TablaMunicipio").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre_Municipio}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" id="EditarMunicipio" data-toggle="modal" data-target="#ModificarMunicipio" onclick="ObtenerMunicipio(${item.Id_Municipio})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch3" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `);
        }
        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch3'));
        $('.js-switch3').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
    }).fail(error =>{
        console.log(error);
    });
}
$(document).ready(function(){
    $('#MunicipioTab').click(function(){
        ListarMunicipio();
    });
});
