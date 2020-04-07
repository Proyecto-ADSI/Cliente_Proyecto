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
                    <i class="fa fa-pencil text-inverse m-r-10 icon-edit" id="EditarOperador" data-toggle="modal" data-target="#ModificarOperador" onclick="ObtenerOperador(${item.Id_Operador})" style="cursor:pointer;"></i>
                     <i class="fa fa-close text-danger" style="cursor:pointer;"></i>
                     <input type="checkbox" class="js-switch4" data-color="#f62d51" data-secondary-color="#26c6da" data-size="small" />
            </td>
        </tr>
        <tr>
            `); 
        }
        var element = Array.prototype.slice.call(document.querySelectorAll('.js-switch4'));
        $('.js-switch4').each(function() {
           new Switchery($(this)[0], $(this).data());
        });
        
    }).fail(error =>{
        console.log(error);
    });
}
$(document).ready(function(){
    $('#OperadoresTab').click(function(){
        ListarOperador();
    });
});
