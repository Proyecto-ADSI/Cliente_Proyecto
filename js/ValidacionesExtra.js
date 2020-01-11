// Validaciones adiconales (Personalizadas)
$.validator.addMethod( "SoloLetras", function( value, element ) {
    return this.optional( element ) || /^[A-Za-z ñáéíóúÁÉÍÓÚ]+$/i.test( value );
}, "Solo se permiten caracteres alfabéticos" );

$.validator.addMethod("SoloNumeros", function(value,element){
    return this.optional(element) || /^[\d]+$/.test(value);
},"Solo se permiten números del 0 al 9");
