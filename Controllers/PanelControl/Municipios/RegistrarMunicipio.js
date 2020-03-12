let RegistrarMunicipio = () => {

    let datos = {
        Nombre: $("#TxtMunicipio").val(),
        Id_Departamento: parseInt($("#SelectDepartamento option:selected").val()),
        Estado: parseInt(1),
     
    };

    $.ajax({
        url: `${URL}/Municipio`,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datos),
        processData: false,
    }).done(respuesta => {
        if(respuesta.data.ok){
            swal({
                title: "Felicidades",
                text: "Municipio registrado correctamente",
                type: "success",
                confirmButtonClass: "btn-success",
                confirmButtonText: "Ok",
              },
              function(){
                ListarMunicipio();
                $("#TxtMunicipio").val("")
                $("#SelectDepartamento").val("");
              });
        }else{
            swal({
                title: "Error",
                text: "Error al registrar",
                type: "error",
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
              },
              function(){
                location.href = "/App/Administrador/Panel Control/Panel.html";
              });    
        }
    }).fail(error => {

        swal({
            title: "Error",
            text: "Error al registrar",
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
          },
          function(){
            location.href = "/App/Administrador/Panel Control/Panel.html";
          }); 
          
    });
}

let ListarDepartamento1 = () =>{


    $.ajax({
        url: `${URL}/Departamento`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#SelectDepartamento").empty();
        $("#SelectDepartamento").append(`

        <option selected disabled value="">Seleccione un departamento</option>

            `);
        for(let item of respuesta.data){
            $("#SelectDepartamento").append(`
                <option value='${item.Id_Departamento}'>${item.Nombre_Departamento}</option> 
              ` 
            );
        }
    }).fail(error =>{
        console.log(error);
    });
}

$(function (){



    $("#FormMunicipio").validate({
        submitHandler: function(){
                RegistrarMunicipio();
        },
        rules:{
            Municipio: {
                required:true,
                SoloAlfanumericos:true,
                minlength:2,
                maxlength:45
            },
            SelectDepartamento: {
                required:true
            }
        },
        errorClass: "form-control-feedback",
        errorElement: "div",
        highlight: function (element) {
            $(element).parents(".form-group").addClass("has-danger").removeClass("has-success");
            $(element).addClass("form-control-danger").removeClass("form-control-success");
        },
        unhighlight: function (element) {

            $(element).parents(".form-group").addClass("has-success").removeClass("has-danger");
            $(element).addClass("form-control-success").removeClass("form-control-danger");
        },
        errorPlacement: function (error, element) {
                error.insertAfter(element.parent(".input-group"));
            
        }
        
    });
})


$(function(){
    ListarDepartamento1();
 });