Id_Municipios = null;


let ListarDepartamento2 = () =>{


    $.ajax({
        url: `${URL}/Departamento`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#SelectDepartamentoEdit").empty();
        $("#SelectDepartamentoEdit").append(`

        <option selected disabled value="">Seleccione un departamento</option>

            `);
        for(let item of respuesta.data){
            $("#SelectDepartamentoEdit").append(`
                <option value='${item.Id_Departamento}'>${item.Nombre_Departamento}</option> 
              ` 
            );
        }
    }).fail(error =>{
        console.log(error);
    });
}


let ObtenerMunicipio = (Id_Municipio) =>{


    Id_Municipios = Id_Municipio;


  $.ajax({
      url: `${URL}/Municipio/ObtenerMunicipio/${Id_Municipios}`,
      dataType: 'JSON',
      type: 'get'

  }).done(respuesta => {

    $("#TxtMunicipioEdit").val(respuesta.data.Nombre_Municipio);
    $("#SelectDepartamentoEdit").val(respuesta.data.Id_Departamento, respuesta.data.Nombre_Departamento);
    
      
  }).fail(error => {
      console.log(error);
  });
}

$(function(){
    ListarDepartamento2();
});

$(document).ready(function(){
    $('#EditarMunicipio').click(function(){
       ObtenerMunicipio();
    });
});
