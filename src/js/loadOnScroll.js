function yHandler(){
  var wrap = document.getElementById('wrap');
  var contentHeight = wrap.offsetHeight; //coge la altura del contenido de wrap.
  var yOffset = window.pageYOffset; //coge la altura total de scroll
  var y = yOffset + window.innerHeight; // esto devuelve la altura de la ventana abierta + la altura del scroll para llegar hasta la posición a la que está la parte ingerior del scroll hecho hasta el momento
  if(y >= contentHeight){
    wrap.innerHTML+='<div class="newData"></div>';
    //aquí hay que meter el AJAX para hacer la petición dinámica.
  }
  var status = document.getElementById('status');
  status.innerHTML = contentHeight + " | " + y;
}
window.onscroll=yHandler;
