window.jQuery = window.$ = require('jquery');
//require("./popper");

$( document ).ready(function() {
    ajax_articles();
});

function ajax_articles() {
  $.ajax({
    type:"GET",
    url:"articles/",
    success: response =>{
      console.log("Yupi!!!", response);
    },
    error: response =>{
      console.error("NOOOOO",error);
    }
  });
}
//console.log("después de ajax");

var bootstrap = require('bootstrap/dist/js/bootstrap'); //Esto lo ponemos cuando instalemos bootstrap (que tiene que ser por npm). Con esto ya debería ir.
require("./backToTop");
//require("./loadOnScroll");
