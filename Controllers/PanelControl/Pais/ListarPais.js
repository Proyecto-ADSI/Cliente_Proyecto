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
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarPais" onclick="ObtenerPais(${item.Id_Pais})" style="cursor:pointer;"></i>
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
   ListarPais();
});