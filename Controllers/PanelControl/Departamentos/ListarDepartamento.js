let ListarDepartamento = () =>{ 
   

    $.ajax({
        url: `${URL}/Departamento`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaDepartamento").empty();
         contador=0;
        for(let item of respuesta.data){
            contador++
            $("#TablaDepartamento").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre_Departamento}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarDepartamento" onclick="ObtenerDepartamento(${item.Id_Departamento})" style="cursor:pointer;"></i>
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
   ListarDepartamento();
});