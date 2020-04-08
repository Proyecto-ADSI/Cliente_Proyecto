Id_Departamentos = null;
Id_Paiss = null;

 ListarPais2 = (Id_Paiss) =>{

    $.ajax({
        url: `${URL}/Pais`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $('#SelectPaisEdit').empty();
            for (let item of respuesta.data) {
                if (item.Id_Pais == Id_Paiss) {
                    var $opcion = $('<option />', {
                        text: `${item.Nombre_Pais}`,
                        value: `${item.Id_Pais}`,
                        selected: true
                    })
                } else {
                    var $opcion = $('<option />', {
                        text: `${item.Nombre_Pais}`,
                        value: `${item.Id_Pais}`
                    })
                }
                $('#SelectPaisEdit').append($opcion);
            }
        // $("#SelectPaisEdit").append(`

        // <option selected disabled value="">Seleccione el país</option>

        //     `);
        // for(let item of respuesta.data){
        //     $("#SelectPaisEdit").append(`
        //         <option value='${item.Id_Pais}'>${item.Nombre_Pais}</option> 
        //       ` 
        //     );
        // }
    }).fail(error =>{
        console.log(error);
    });
}


let ObtenerDepartamento = (Id_Departamento) =>{


    Id_Departamentos = Id_Departamento;


  $.ajax({
      url: `${URL}/Departamento/ObtenerDepartamento/${Id_Departamentos}`,
      dataType: 'JSON',
      type: 'get'

  }).done(respuesta => {

    $("#TxtDepartamentoEdit").val(respuesta.data.Nombre_Departamento);
    // $("#SelectPaisEdit").val(respuesta.data.Id_Pais, respuesta.data.Nombre_Pais);
    
    ListarPais2(respuesta.data.Id_Pais);
      
  }).fail(error => {
      console.log(error);
  });
}



$(document).ready(function(){
    $('#EditarDepartamento').click(function(){
        ObtenerDepartamento();
    });
});
