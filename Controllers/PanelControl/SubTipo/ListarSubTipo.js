let ListarSubTipo = () =>{ 
    contador=0;

    $.ajax({
        url: `${URL}/SubTipo`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaSubTipo").empty();

        for(let item of respuesta.data){
            contador++
            $("#TablaSubTipo").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.SubTipo}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarSubTipo" onclick="ObtenerSubTipo(${item.Id_SubTipo_Barrio_Vereda})" style="cursor:pointer;"></i>
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
   ListarSubTipo();
});