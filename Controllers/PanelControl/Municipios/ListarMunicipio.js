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
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarMunicipio" onclick="ObtenerMunicipio(${item.Id_Municipio})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
            </td>
        </tr>
        <tr>
            `);
        }
    }).fail(error =>{
        console.log(error);
    });
}
$(function(){
   ListarMunicipio();
});