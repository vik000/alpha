window.jQuery = window.$ = require('jquery');
//require("./popper");

$( document ).ready(function() {
    ajax_articles();
    //ajax_comments();
});

function ajax_articles() {
  $.ajax({
    type:"GET",
    url:"articles/",
    success: books =>{
      console.log("Yupi!!!", books);
      //componemos el HTML con todos los artículos.
      let html="";
      for (let book of books){
        html+=`<article class="card" style="width: 20rem;">
        <img class="card-img-top" src="${book.cover}" alt="Card image cap">
        <div class="card-block padding-in">
        <div class="card-stuff">
          <h4 class="card-title title" id="title"><a href="detail.html">${book.title}</a></h4>
          <button id="likes${book.id}" type="button" class="btn btn-primary btn-sm btn-short likes"><small><b>+${book.likes}</b></small></button>
        </div>
        <p class="card-text">${book.excerpt}</p>
        <div class="card-stuff">
          <p class="card-text" id="author"><small class="text-muted">@${book.author} | 1h ago</small></p>
          <p class="card-text" id="comments"><small class="text-muted">${book.comments} coments</small></p>
        </div>
        </div>
      </article>`;
      //WebStorage!!!:
      if (typeof(Storage) !== "undefined") {
          // Code for localStorage.
          if (localStorage.getItem(`likes${book.id}`)) {
              console.log(`likes${book.id}`);
          } else {
              localStorage.setItem(`likes${book.id}`,'0');
          }
      } else {
          // Sorry! No Web Storage support..
          console.log("WebStorage unavailable in this browser");
      }
      }
      //Metermos todo el texto en el div que contiene las canciones:
      $("#bookshelf").html(html);

    },
    error: response =>{
      console.error("NOOOOO",error);
    }
  });
}
//console.log("después de ajax");
var $bookshelf=$("#bookshelf");
$bookshelf.on("click","button", function(){
  let likes=$(this).attr('id');
  let stored = localStorage.getItem(likes);
  console.log($(this).text().substring(1));
  if(stored=='0'){
    localStorage.setItem(likes,'1');
    //y sumamos 1:

  }else if (stored == '1') {
    localStorage.setItem(likes,'0');
  }


});

function ajax_comments() {
  $.ajax({
    type:"GET",
    url:"comments/",
    //beforeSend:
    success: comments =>{
      console.log("Yupi!!!", comments);
      //componemos el HTML con todos los artículos.
      let html2="";
      for (let comment of comments){
        html2+=`<div class="comment card-block">
                    <p>${comment.text}</p>
                    <p><small>by @${comment.name}</small></p>
                  </div>`;
      }
      //Metermos todo el texto en el div que contiene las canciones:
      $("#allTheOthers").html(html2);

    },
    error: response =>{
      console.error("NOOOOO",error);
    }
  });
}
//console.log("después de ajax");

function yHandler(){
  var wrap1 = document.getElementById('wrap1');
  var wrap2 = document.getElementById('wrap2');
  var height1 = wrap1.offsetHeight;
  var height2 = wrap2.offsetHeight;
  var contentHeight = height1 + height2; //coge la altura del contenido de wrap.
  var yOffset = window.pageYOffset; //coge la altura total de scroll
  var y = yOffset + window.innerHeight; // esto devuelve la altura de la ventana abierta + la altura del scroll para llegar hasta la posición a la que está la parte ingerior del scroll hecho hasta el momento
  if(y >= contentHeight){
    //wrap.innerHTML+='<div class="newData"></div>';
    //aquí hay que meter el AJAX para hacer la petición dinámica.
    ajax_comments();
  }
  var status = document.getElementById('status');
  status.innerHTML = contentHeight + " | " + yOffset;
}
window.addEventListener("scroll", yHandler);

var bootstrap = require('bootstrap/dist/js/bootstrap'); //Esto lo ponemos cuando instalemos bootstrap (que tiene que ser por npm). Con esto ya debería ir.
require("./backToTop");
