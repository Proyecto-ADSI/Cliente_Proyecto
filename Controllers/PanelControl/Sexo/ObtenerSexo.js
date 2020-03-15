Id_Sexos = null;

let ObtenerSexo = (Id_Sexo) =>{


    Id_Sexos = Id_Sexo;

  $.ajax({
      url: `${URL}/Sexo/ObtenerSexo/${Id_Sexos}`,
      dataType: 'JSON',
      type: 'get'

  }).done(respuesta => {

    $("#TxtSexoEdit").val(respuesta.data.Nombre);
    
      
  }).fail(error => {
      console.log(error);
  });
}

$(function(){
ObtenerSexo();
});