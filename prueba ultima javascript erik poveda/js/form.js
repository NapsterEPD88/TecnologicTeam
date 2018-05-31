window.onload=init;
var casillasMarcadas=0;

function init(){
	document.forms[0].nombre.onblur=ponerMayusculas;
	document.forms[0].apellidos.onblur=ponerMayusculas;
	
	var casillas=document.forms[0].querySelectorAll("#cursos input[type=checkbox]");
	for (var i = 0; i < casillas.length; i++) {
		casillas[i].onclick=comprobarCursos;
	}
	document.forms[0].terminos.onclick=ponerBotonActivo;
}


function ponerMayusculas(event){
	var texto=event.currentTarget.value;
	var palabras=texto.split(" ");
	for (var i = 0; i < palabras.length; i++) {
		palabras[i]=palabras[i].charAt(0).toUpperCase()+palabras[i].substring(1).toLowerCase();
	}
	texto=palabras.join(" ");
	event.currentTarget.value=texto;
	ponerBotonActivo();
}



function comprobarCursos(event){
	if(event.currentTarget.checked){
		casillasMarcadas++;
	}
	else{
		casillasMarcadas--;
	}


	if (casillasMarcadas==3){
		var af=document.forms[0].querySelectorAll("#cursos input[type=checkbox]:not(:checked)");
		for (var i = 0; i < af.length; i++) {
			af[i].disabled=true;
		}
	}
	else{
		var af=document.forms[0].querySelectorAll("#cursos input[type=checkbox]:disabled");
		for (var i = 0; i < af.length; i++) {
			af[i].disabled=false;
		}
	}

	ponerBotonActivo();		
}

function ponerBotonActivo(event){
	var error=false;
	
	var campos=document.forms[0].querySelectorAll("[required]");
	
	var campoError=null;
	for (var i = 0; i < campos.length; i++) {
		campoError=document.querySelector("[name="+campos[i].name+"]~.error");
		if (campos[i].value==""){
			error=true;
			campoError.innerHTML="El campo no puede estar vacío";
		}
		else{
			if (campoError.innerHTML=="El campo no puede estar vacío"){
				campoError.innerHTML="";
			}
		}
	}

	if (casillasMarcadas==0){
		error=true;
	}

	if (!document.forms[0].terminos.checked){
		error=true;
	}

	if (!error){
		document.forms[0].enviar.disabled=false;
	}
	else{
		document.forms[0].enviar.disabled=true;
	}
}

function checkPattern() {
    var pattern = elem.getAttribute("^(1[8-9])|([2-6][0-9])|(7[0])$");

    
        var re = new RegExp(pattern);
        if (re.test(elem.value)) {
            return true;
        } else {
            return false;
        }
    }
