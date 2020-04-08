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
                    <i class="fa fa-pencil text-inverse m-r-10" data-toggle="modal" data-target="#ModificarDepartamento" id="EditarDepartamento" onclick="ObtenerDepartamento(${item.Id_Departamento})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch2" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `);
        }
        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch2'));
        $('.js-switch2').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
    }).fail(error =>{
        console.log(error);
    });
}
$(document).ready(function(){
    $('#DepartamentosTab').click(function(){
        ListarDepartamento();
        ListarPais1();
    });
});
