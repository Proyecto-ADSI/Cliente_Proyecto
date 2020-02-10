// Validaciones adiconales (Personalizadas)
$.validator.addMethod( "SoloLetras", function( value, element ) {
    return this.optional( element ) || /^[A-Za-z ñáéíóúÁÉÍÓÚ]+$/i.test( value );
}, "Solo se permiten caracteres alfabéticos" );

$.validator.addMethod("SoloNumeros", function(value,element){
    return this.optional(element) || /^[\d]+$/.test(value);
},"Solo se permiten números del 0 al 9");

$.validator.addMethod("NumeroMovil", function(value,element){
    return this.optional(element) || /^3[\d]+$/.test(value);
},"Ingrese un número de celular válido");

$.validator.addMethod("ValidarCorreo", function(value,element){
    return this.optional(element) || /[A-Za-z]+@[A-Za-z]+\.[a-z]+/.test(value);
},"Ingrese un correo electrónico válido");
