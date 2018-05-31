var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("imagenes");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2000); 
}

function myFunction() {
    var str = document.getElementById("pie").innerHTML; 
    var res = str.replace("Realizado por", "Erik Poveda");
    document.getElementById("pie").innerHTML = res;
}

function cargarImagen(url)
      {
        var imagen = new Image();
        imagen.onload = imagenCargada;
        imagen.src = url(www.twitter.com), url(www.facebook.com);
        return imagen;
      }