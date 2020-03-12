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
   ListarSexo();
});