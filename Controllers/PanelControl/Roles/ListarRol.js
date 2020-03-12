let ListarRol = () =>{ 
    contador=0;

    $.ajax({
        url: `${URL}/Rol`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaRol").empty();

        for(let item of respuesta.data){
            contador++
            $("#TablaRol").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre}</td>
            <td class="text-nowrap">
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
   ListarRol();
});
/*
<i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarDocumento" onclick="ObtenerDocumento(${item.Id_Documento})" style="cursor:pointer;"></i>
<i class="fa fa-close text-danger" style="cursor:pointer;"></i>

*/