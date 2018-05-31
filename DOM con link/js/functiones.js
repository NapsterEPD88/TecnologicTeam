

window.onload=iniciar;
//window.onload=cambiar;

function iniciar(){
		var elemento=document.querySelector("h1");
		elemento.onclick=cambiar;
		elemento.onmouseover=activarImagen;
		elemento.onmouseout=ocultarImagen;
		
		elemento=document.querySelectorAll("p.rojo");
		for(var i=0;i<elemento.lenght;i++){
	    	elemento[i].ondbclick=cambiar;
	    }

}

function ocultarImagen(){
	document.querySelector("img").style.display="inline-block";
}

function activarImagen(){
	document.querySelector("img").style.display="none";
}



function cambiar(){
	event.currentTarget.style.border="1px solid red";
	event.currentTarget.nextElementSiblink.style.display="block";
}
