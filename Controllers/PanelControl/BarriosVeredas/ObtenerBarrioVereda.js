Id_Barrios_Veredass = null;


let ListarSubTipo2 = () =>{


    $.ajax({
        url: `${URL}/SubTipo`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#SelectSubTipoEdit1").empty();
        $("#SelectSubTipoEdit1").append(`

        <option selected disabled value="">Seleccione un sub tipo</option>

            `);
        for(let item of respuesta.data){
            $("#SelectSubTipoEdit1").append(`
                <option value='${item.Id_SubTipo_Barrio_Vereda}'>${item.SubTipo}</option> 
              ` 
            );
        }
    }).fail(error =>{
        console.log(error);
    });
}



let ListarMunicipio2 = () =>{


    $.ajax({
        url: `${URL}/Municipio`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#SelectMunicipioEdit1").empty();
        $("#SelectMunicipioEdit1").append(`

        <option selected disabled value="">Seleccione un municipio</option>

            `);
        for(let item of respuesta.data){
            $("#SelectMunicipioEdit1").append(`
                <option value='${item.Id_Municipio}'>${item.Nombre_Municipio}</option> 
              ` 
            );
        }
    }).fail(error =>{
        console.log(error);
    });
}

let ObtenerBarriosVereda = (Id_Barrios_Veredas) =>{


    Id_Barrios_Veredass = Id_Barrios_Veredas;


  $.ajax({
      url: `${URL}/BarriosVeredas/ObtenerBarriosVereda/${Id_Barrios_Veredass}`,
      dataType: 'JSON',
      type: 'get'

  }).done(respuesta => {

    $("#TxtCodigoEdit").val(respuesta.data.Codigo);
    $("#TxtBarrioVeredaEdit").val(respuesta.data.Nombre_Barrio_Vereda);
    $("#SelectSubTipoEdit1").val(respuesta.data.Id_SubTipo_Barrio_Vereda, respuesta.data.SubTipo);
    $("#SelectMunicipioEdit1").val(respuesta.data.Id_Municipio, respuesta.data.Nombre_Municipio);
    
      
  }).fail(error => {
      console.log(error);
  });
}

$(function(){
    ListarMunicipio2();
    ListarSubTipo2();
});

$(document).ready(function(){
    $('#EditarBarriosVeredas').click(function(){
        ObtenerBarriosVereda();
    });
});
