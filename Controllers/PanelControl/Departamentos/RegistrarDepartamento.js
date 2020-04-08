let RegistrarDepartamento = () => {

    let datos = {
        Nombre: $("#TxtDepartamento").val(),
        Id_Pais: parseInt($("#SelectPais option:selected").val()),
        Estado: parseInt(1),
     
    };

    $.ajax({
        url: `${URL}/Departamento`,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datos),
        processData: false,
    }).done(respuesta => {
        if(respuesta.data.ok){
            swal({
                title: "Felicidades",
                text: "Departamento registrado correctamente",
                type: "success",
                confirmButtonClass: "btn-success",
                confirmButtonText: "Ok",
              },
              function(){
                ListarDepartamento();
                $("#TxtDepartamento").val("")
                $("#SelectPais").val("");
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

 ListarPais1 = () =>{


    $.ajax({
        url: `${URL}/Pais`,
        dataType: 'json',
        type: 'GET',
    }).done(respuesta =>{
        $("#SelectPais").empty();
        $("#SelectPais").append(`

        <option selected disabled value="">Seleccione el país</option>

            `);
        for(let item of respuesta.data){
            $("#SelectPais").append(`
                <option value='${item.Id_Pais}'>${item.Nombre_Pais}</option> 
              ` 
            );
        }
    }).fail(error =>{
        console.log(error);
    });
}

$(function (){



    $("#FormDepartamento").validate({
        submitHandler: function(){
                RegistrarDepartamento();
        },
        rules:{
            Departamento: {
                required:true,
                SoloAlfanumericos:true,
                minlength:2,
                maxlength:45
            },
            SelePais: {
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
    ListarPais1();
 });