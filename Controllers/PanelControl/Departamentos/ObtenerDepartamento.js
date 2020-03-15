Id_Departamentos = null;
Id_Paiss = null;

let ListarPais2 = () =>{


    $.ajax({
        url: `${URL}/Pais`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#SelectPaisEdit").empty();
        $("#SelectPaisEdit").append(`

        <option selected disabled value="">Seleccione el país</option>

            `);
        for(let item of respuesta.data){
            $("#SelectPaisEdit").append(`
                <option value='${item.Id_Pais}'>${item.Nombre_Pais}</option> 
              ` 
            );
        }
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
    $("#SelectPaisEdit").val(respuesta.data.Id_Pais, respuesta.data.Nombre_Pais);
    
      
  }).fail(error => {
      console.log(error);
  });
}

$(function(){
ObtenerDepartamento();
ListarPais2();
});