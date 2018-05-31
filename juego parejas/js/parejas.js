window.onload=init;
var pareja=6;//prompt("¿Cuántas parejas quieres en el juego?");
var parejas=[];

for (var i = 0; i < pareja; i++) {
	parejas[i*2]=i+1;
	parejas[i*2+1]=i+1;
}

var cartas=[];
var cartaComparar=null;
var aciertos=0;
var fallos=0;
var tiempo=0;
var crono=0;
var tiempo2=0;

function init(){
	var posicion=-1;
	var longitud=parejas.length;
	var cronometro=document.createElement("h1");
	cronometro.innerHTML="00:00.00";
	document.body.appendChild(cronometro);

	for (var i = 0; i < longitud; i++) {
		/* Forma no óptima de desordenar un array 
		do{
			posicion=Math.floor(Math.random()*parejas.length);
		}
		while (cartas[posicion]!=undefined) 

		cartas[posicion]=parejas[i];*/

		posicion=Math.floor(Math.random()*parejas.length);
		cartas[i]=parejas[posicion];
		parejas.splice(posicion,1);
	}


	//Sacar el número de cartas en horizontal que tendrá el juego
	i=2;
	while (((Math.pow(i,2))<longitud)||(longitud%i!=0)){
		i++;
	}
	
	var dimensionX=i; //elementos en cada fila
	var dimensionY=longitud/i; //cantidad de filas de elementos
	
	/*Averiguamos el tamaño de las cartas ya sea por la anchura o altura
	dependiendo del valor más pequeño*/
	var tamanyoX=Math.floor(window.innerWidth/dimensionX);
	var tamanyoY=Math.floor((window.innerHeight-32)/dimensionY);
	var tamanyo=0;

	(tamanyoX<=tamanyoY)? tamanyo=tamanyoX : tamanyo=tamanyoY;
	/*la misma sentencia pero con el if
	if (tamanyoX<=tamanyoY) {
		tamanyo=tamanyoX;
	}
	else{
		tamanyo=tamanyoY;
	}*/

	//creamos las variables para generar nuestro juego
	var capa=null;
	var imagen=null;

	//creamos la capa juego
	var capa2=document.createElement("div");
	capa2.id="juego";
	capa2.style.width=(tamanyo*dimensionX)+"px";
	capa2.style.height=(tamanyo*dimensionY)+"px";
	document.body.appendChild(capa2);

	// bucle para generar las filas
	for (var i=0;i<dimensionY;i++){

		//bucle para generar las columnas
		for (var j=0;j<dimensionX;j++){
			capa=document.createElement("div");
			capa.classList.add("cartas");
			capa.style.width=(tamanyo-8)+"px";
			capa.style.height=(tamanyo-8)+"px";
			

			//generamos la imagen según el valor del elemento del array cartas
			imagen=document.createElement("img");
			imagen.src="img/"+cartas[i*dimensionX+j]+".svg";

			//añadimos la imagen a la carta
			capa.appendChild(imagen);
			capa.onclick=mostrarImagen;

			//añadimos la carta a la capa juego
			capa2.appendChild(capa);		
		}	
	}

	window.onresize=function(){redimensionar(dimensionX,dimensionY)};
}

function mostrarImagen(event){
if (tiempo==0){
	empezar();
	event.currentTarget.children[0].style.display="block";

	if (cartaComparar==null){
		cartaComparar=event.currentTarget;
		cartaComparar.onclick=null;
	}
	else{	
		if (cartaComparar.children[0].src==event.currentTarget.children[0].src){
			aciertos++;
			event.currentTarget.onclick=null;
			cartaComparar=null;
			if (aciertos==pareja){
				parar();
				console.log("GANADOR");
			}
		}
		else{
			fallos++
			console.log(fallos);
			cartaComparar.onclick=mostrarImagen;
			var objeto=event.currentTarget;
			tiempo=setTimeout(function(){
				cartaComparar.children[0].style.display="none";
				objeto.children[0].style.display="none";
				cartaComparar=null;
				tiempo=0;
			},750);
		}
		
	}
}

}



function redimensionar(dimX,dimY){
	var tamanyoX=Math.floor(window.innerWidth/dimX);
	var tamanyoY=Math.floor((window.innerHeight-32)/dimY);
	var tamanyo=0;

	(tamanyoX<=tamanyoY)? tamanyo=tamanyoX : tamanyo=tamanyoY;	

	var capa2=document.querySelector("#juego");
	capa2.style.width=(tamanyo*dimX)+"px";
	capa2.style.height=(tamanyo*dimY)+"px";	

	var cartas=document.querySelectorAll(".cartas");
	for (var i = 0; i < cartas.length; i++) {
		cartas[i].style.width=(tamanyo-8)+"px";
		cartas[i].style.height=(tamanyo-8)+"px";
	}
}










/********** CRONO ********/


function empezar(event){
	if (tiempo2==0){
		crono=Date.now();
		tiempo2=setInterval(contar,10);
	}
}

function parar(event){
	clearInterval(tiempo2);
	tiempo2=0;	
}

function contar(){
	var crono2=Date.now()-crono;
	var cs=parseInt((crono2%1000)/10);
	var seg=parseInt(crono2/1000)%60;
	var min=parseInt(crono2/60000);
	document.querySelector("h1").innerHTML=anyadirCero(min)+":"+anyadirCero(seg)+"."+anyadirCero(cs);
}

function anyadirCero(numero){
	if (numero<10){
		return "0"+numero;
	}
	else{
		return numero;
	}
}

