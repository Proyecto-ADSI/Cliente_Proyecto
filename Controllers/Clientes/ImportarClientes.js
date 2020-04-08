$(function(){

    $("#formArchivo").validate({
        submitHandler: function(){

            ImportarClientes();
        },
        rules: {
            archivoClientes: "required"
        },
        errorClass: "form-control-feedback",
        errorElement: "div",
        highlight: function (element) {
            $(element).parents(".dropify-wrapper").addClass("has-danger").removeClass("has-success");
        },
        unhighlight: function (element) {

            $(element).parents(".dropify-wrapper").addClass("has-success").removeClass("has-danger");
            
        },
        errorPlacement: function (error, element) {
            element.parent(".dropify-wrapper").append(error);
        }
    });
});


let ImportarClientes = () => {

    let formData = new FormData();
    let file = $('#archivoClientes')[0].files[0];
    formData.append('Archivo_Clientes', file);
            
    $.ajax({
        url: `${URL}/Cliente/ImportarClientes`,
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
    }).done(respuesta=>{

        console.log(respuesta);

    }).fail(error =>{
        console.log(error);
    });

}
