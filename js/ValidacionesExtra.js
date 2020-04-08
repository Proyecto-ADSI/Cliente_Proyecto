// Validaciones adiconales (Personalizadas)
$.validator.addMethod( "SoloLetras", function( value, element ) {
    return this.optional( element ) || /^[A-Za-z ñáéíóúÁÉÍÓÚ]+$/i.test( value );
}, "Solo se permiten caracteres alfabéticos" );

$.validator.addMethod("SoloAlfanumericos", function(value,element){
    return this.optional(element) || /^[\w \s ñáéíóúÁÉÍÓÚüÜ., ]+$/.test(value);
},"No se permiten caracteres especiales");

$.validator.addMethod("SoloNumeros", function(value,element){
    return this.optional(element) || /^[\d]+$/.test(value);
},"Ingrese un número de celular válido");

$.validator.addMethod("SoloNumeros2", function(value,element){
    return this.optional(element) || /^[1-9]\d*/.test(value);
},"No se permite 0 al inicio ni caracteres especiales y alfabéticos.");

$.validator.addMethod("NumeroMovil", function(value,element){
    return this.optional(element) || /^3[\d]+$/.test(value);
},"Ingrese un número de celular válido");

$.validator.addMethod("ValidarCorreo", function(value,element){
    return this.optional(element) || /[A-Za-z\d]+@[A-Za-z]+\.[a-z]{2,4}/.test(value);
},"Ingrese un correo electrónico válido");

$.validator.addMethod("ValidarNIT", function(value,element){
    return this.optional(element) || /(^[\d]+[-][\d]?$)/.test(value);
    // return this.optional(element) || /^([\d]+[-][\d]?$)|([\d]$)/.test(value);
},"Ingrese un NIT válido");



// $.validator.addMethod("ValidarDirecion", function(value,element){
//     return this.optional(element) || /^[\w]+[#\s][\w]{2,5}[-\s][\d]{2,5}$/.test(value);
// },"Ingrese una Dirección válida");