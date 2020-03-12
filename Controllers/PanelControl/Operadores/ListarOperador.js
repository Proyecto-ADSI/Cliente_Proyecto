let ListarOperador = () =>{ 
    contador=0;

    $.ajax({
        url: `${URL}/Operador`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaOperador").empty();

        for(let item of respuesta.data){
            contador++
            $("#TablaOperador").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre_Operador}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarOperador" onclick="ObtenerOperador(${item.Id_Operador})" style="cursor:pointer;"></i>
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
   ListarOperador();
});