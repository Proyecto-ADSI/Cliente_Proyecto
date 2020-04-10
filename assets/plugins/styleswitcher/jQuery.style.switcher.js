// Theme color settings
$(document).ready(function () {

  function store(name, val) {

    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(name, val);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }


  // $("*[data-theme]").click(function (e) {
  //   e.preventDefault();
  //   var currentStyle = $(this).attr('data-theme');
  //   store('theme', currentStyle);
  //   $('#theme').attr({ href: 'css/colors/' + currentStyle + '.css' })
  // });

  
//  var temaSeleccionado =  localStorage.getItem('Tema_Aplicacion');
//     if(temaSeleccionado){
//         $('#Tema').attr({href: '/css/colors/Tema_'+temaSeleccionado+'.css'});
//         $('#Style_Tema').attr({href: '/css/style_'+temaSeleccionado+'.css'});

//         if(temaSeleccionado === "Oscuro"){
//             let input = $('#switch_input input');
            
//             console.log(input);
//         }
//     }


  $(document).on('change', '#switch_input', function (e) {

    let input = $(this).children('label').children('input');

    if(input[0].checked){

      let tema = "Oscuro";
      store('Tema_Aplicacion', tema);
      $('#Tema').attr({href: '/css/colors/Tema_'+tema+'.css'});
      $('#Style_Tema').attr({href: '/css/style_'+tema+'.css'});
 

    }else{
      let tema = "Blanco";
      store('Tema_Aplicacion', tema);
      $('#Tema').attr({href: '/css/colors/Tema_'+tema+'.css'});
      $('#Style_Tema').attr({href: '/css/style_'+tema+'.css'});
    }
  });

  $(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });

});

/*
$(document).ready(function(){
    $("*[data-theme]").click(function(e){
      e.preventDefault();
        var currentStyle = $(this).attr('data-theme');
        store('theme', currentStyle);
        $('#theme').attr({href: 'css/colors/'+currentStyle+'.css'})
    });

    var currentTheme = get('theme');
    if(currentTheme)
    {
      $('#theme').attr({href: 'css/colors/'+currentTheme+'.css'});
    }
    // color selector
$('#themecolors').on('click', 'a', function(){
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working')
      });
});*/
