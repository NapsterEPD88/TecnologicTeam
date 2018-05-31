onload = arma1; 

var imagenes = ["img/1.jpg", 
"img/2.jpg", 
"img/3.jpg", 
"img/4.jpg", 
"img/5.jpg"]; 

var titulos = ["1", "2", "3", "4", "5"]; 

var ladoCuadro = 30; //EN PIXELES

var contenedor, contenido, filas, columnas, ancho, alto; 
var i = 0
var largoRutas = imagenes.length; 
imagenes.push(imagenes[0]); 


function arma1() {
  contenedor = document.querySelector("figure"); 
  ancho = contenedor.offsetWidth - (ladoCuadro*2); 
  alto = contenedor.offsetHeight; 
  columnas = (ancho/ladoCuadro); 
  filas = (alto/ladoCuadro); 
  
  contenedor.innerHTML = ""; 
  
  for(f=0; f<filas; f++) {
    for(c=0; c<columnas; c++) {
      cuadro = document.createElement('div'); 
      cuadro.style.backgroundSize = ancho +"px "+ alto +"px"; 
      cuadro.style.backgroundPosition = "right "+ (c*-ladoCuadro) +"px bottom "+ (f*-ladoCuadro) +"px"; 
      contenedor.appendChild(cuadro);
    }
  }

  contenido = document.querySelectorAll("figure div"); 

  arma2(); 
}

function arma2() {
  i = (i<largoRutas)? i : 0; 

  x = 0; 

  for(f=0; f<filas; f++) {
    for(c=0; c<columnas; c++) {
      cuadro = document.querySelectorAll("figure div"); 
      cuadro[x].style.transitionProperty = "none"; 
      cuadro[x].style.transform = "rotate(0)"; 
      cuadro[x].style.left = ancho-(c*ladoCuadro)+"px"; 
      cuadro[x].style.top = alto-(f*ladoCuadro)-ladoCuadro+"px"; 
      cuadro[x].style.backgroundImage = "url("+ imagenes[i] +")"; 
      x++; 
    }
  }

  contenedor.style.backgroundImage = "url("+ imagenes[i+1] +")"; 
  contenedor.style.cursor = "pointer"; 
  contenedor.title = titulos[i]; 
}


function cae() {
  contenedor.style.cursor = "not-allowed"; 

  x = 0;
  
  for(f=filas; f>0; f--) {
    for(c=columnas; c>0; c--) {
      cuadro[x].style.transitionDelay = f*200 +"ms"; //200 es valor arbitrario
      cuadro[x].style.transitionProperty = "top, left, transform"; 
      cuadro[x].style.left = (c*ladoCuadro)+(Math.floor(Math.random()*ladoCuadro*2)-ladoCuadro) +"px"; 
      cuadro[x].style.top = alto +"px"; 
      cuadro[x].style.transform = "rotate("+ (Math.round(Math.random()*2)-1)*90 +"deg)"; 
      x++; 
    }
  }

  i++

  setTimeout("arma2()", 6000); 

}