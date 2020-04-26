Id_Razones_Operador = null;

let ObtenerRazones = (Id_Razones) =>{

    Id_Razones_Operador = Id_Razones;

  $.ajax({
      url: `${URL}/Razones/ObtenerRazones/${Id_Razones_Operador}`,
      dataType: 'JSON',
      type: 'get'

  }).done(respuesta => {

    $("#TxtRazonesEdit").val(respuesta.data.Razon);
    
      
  }).fail(error => {
      console.log(error);
  });
}

$(document).ready(function(){
  $('#EditarRazones').click(function(){
    ObtenerRazones();
  });
});
