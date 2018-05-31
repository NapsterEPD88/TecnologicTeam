$(function(fotos){
	var photos = [
		'img/01.jpg',
		'img/02.jpg',
		'img/03.jpg',
		'img/04.jpg',
		'img/05.jpg',
		'img/06.jpg',
	];
	
	var slideshow = $('#slideShow').bubbleSlideshow(photos);

	$(window).load(function(){
		slideshow.autoAdvance(5000);
	});

});

/*
function cambiaTamaño(){
var cond=['img/01.jpg',
		'img/02.jpg',
		'img/03.jpg',
		'img/04.jpg',
		'img/05.jpg',
		'img/06.jpg'];
var iMg=document.getElementsByTagName('a');
 
for(var i=0; i<iMg.length; ++i) {
if(iMg.src.match(cond)) {
iMg[i].width='600px'; iMg[i].height='400px';
}
}
}*/