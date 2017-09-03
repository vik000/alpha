window.jQuery = window.$ = require('jquery');
//require("./popper");

$( document ).ready(function() {
    ajax_articles();
    ajax_comments();
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
          <h4 class="card-title" id="title"><a href="detail.html">${book.title}</a></h4>
          <a href="detail.html" id="likes" class="btn btn-primary btn-sm btn-short"><small><b>+${book.likes}</b></small></a>
        </div>
        <p class="card-text">${book.excerpt}</p>
        <div class="card-stuff">
          <p class="card-text" id="author"><small class="text-muted">@${book.author} | 1h ago</small></p>
          <p class="card-text" id="comments"><small class="text-muted">${book.comments} coments</small></p>
        </div>
        </div>
      </article>`;
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

function ajax_comments() {
  $.ajax({
    type:"GET",
    url:"comments/",
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

var bootstrap = require('bootstrap/dist/js/bootstrap'); //Esto lo ponemos cuando instalemos bootstrap (que tiene que ser por npm). Con esto ya debería ir.
require("./backToTop");
//require("./loadOnScroll");
