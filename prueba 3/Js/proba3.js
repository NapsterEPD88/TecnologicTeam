window.onload=iniciar;


var palabras="la loba";

function iniciar(){
    var caja=null;

	for (var i = 0; i < palabras.length; i++) {
		if (palabras.charAt(i)==" "){
			caja.style.marginRight="2em";

		}
		else{
         	caja=document.createElement("div");
            caja.classList.add("letras");
            document.body.appendChild(caja);
     	}
   }

}
