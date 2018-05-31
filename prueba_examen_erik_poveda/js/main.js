var indiceImagen = 0;

function muestraSlides(){
  var i,k;
     var slides = document.querySelectorAll('img');
      for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      var txt = slides[i].getAttribute('alt');
     }
     document.getElementById('nombre').innerHTML = txt;
     indiceImagen++;
     if(indiceImagen > slides.length) {indiceImagen = 1}
     slides[indiceImagen-1].style.display = "block";
   }

function cambiaFlechas() {
document.getElementsByClassName("flechas").className += "activo";
}

window.onload = function trigger(){
muestraSlides();
document.querySelector('#izquierda').addEventListener('click', muestraSlides);
document.querySelector('#derecha').addEventListener('click', muestraSlides);
document.querySelector('#izquierda').addEventListener('click', cambiaFlechas);
document.querySelector('#derecha').addEventListener('click', cambiaFlechas);
}

function myFunction() {
    var str = document.getElementById("pie").innerHTML; 
    var res = str.replace("Realizado por", "Erik Poveda");
    document.getElementById("pie").innerHTML = res;
}
