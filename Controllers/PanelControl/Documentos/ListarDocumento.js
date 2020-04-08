let ListarDocumento = () => {
  let contador = 0;

  $.ajax({
    url: `${URL}/Documento`,
    dataType: "json",
    type: "GET",
  })
    .done((respuesta) => {
      $("#TablaDocumento").empty();

      for (let item of respuesta.data) {
        contador++;

        $("#TablaDocumento").append(`
            <tr>
            <td>${contador}</td>
            <td>${item.Nombre}</td>
            <td class="text-nowrap">
                    <i class="fa fa-pencil text-inverse m-r-10" id="EditarDocumento" data-toggle="modal" data-target="#ModificarDocumento" onclick="ObtenerDocumento(${item.Id_Documento})" style="cursor:pointer;"></i>
                    <i class="fa fa-close text-danger" style="cursor:pointer;"></i>  
                    <input type="checkbox" value="'${item.Id_Documento}'" id="Documento" class="js-switch" data-color="#26c6da"  data-secondary-color="#f62d51" data-size="small" checked  />
            </td>
        </tr>
        <tr>
        
            `);
      }
      var element = Array.prototype.slice.call(
        document.querySelectorAll("js-switch")
      );
      $(".js-switch").each(function () {
        element = new Switchery($(this)[0], $(this).data());
      });
    })
    .fail((error) => {
      console.log(error);
    });
};

$(document).ready(function () {
  $("#DocumentosTab").click(function () {
    ListarDocumento();
  });
});
