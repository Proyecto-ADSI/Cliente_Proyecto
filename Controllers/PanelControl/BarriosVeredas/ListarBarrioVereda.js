let ListarBarrioVereda = () =>{ 
   

    $.ajax({
        url: `${URL}/BarriosVeredas`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#TablaBarriosVeredas").empty();
         contador=0;
        for(let item of respuesta.data){
            contador++
            $("#TablaBarriosVeredas").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre_Barrio_Vereda}</td>
            <td>${item.SubTipo}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarMunicipio" onclick="ObtenerBarrioVereda(${item.Id_Barrios_Veredas})" style="cursor:pointer;"></i>
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
   ListarBarrioVereda();
});