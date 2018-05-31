var canvas, playerImg, invaderImg, ctx, playerX, playerY, moveLeft = false, moveRight = false, shoot = false, lives = 5, points = 0, game;
var invaders = [];
var shotsI = [];
var shotsP = [];

$(function(){
	playerImg = new Image();
	playerImg.id = 'playerImg';
	playerImg.src = 'img/player.png';
	
	invaderImg = new Image();
	invaderImg.src = 'img/invader.png';
	
	
	canvas = $('#game')[0];
	ctx = canvas.getContext('2d');
	
	playerImg.onload = function(){ 
		var left = ($('#game').width()/2)-playerImg.width/2;
		var top = $('#game').height()-playerImg.height;
		playerX = left;
		playerY = top;
		ctx.drawImage(playerImg, left, top);
	}
	
	
	$('#jugar').click(function(){
		lives = 5;
		points = 0;
		invaders.length = 0;
		shotsI.length = 0;
		shotsP.length = 0;
		if(game) clearInterval(game);
		game = setInterval(draw, 33);
		$(this).blur();
		
	});
	
});



// derecha:39, izquierda:37, espacio:32
function onKeyDown(e){ 
	if(e.keyCode == 39){
		moveRight = true;
	}
	if(e.keyCode == 37){
		moveLeft = true;
	}
	if(e.keyCode == 32){
		shoot = true;
	}
}

function onKeyUp(e){	
	if(e.keyCode == 39){
		moveRight = false;
	}
	if(e.keyCode == 37){		
		moveLeft = false;
	}
	if(e.keyCode == 32){
		shoot = false;
	}
}

function draw(){
	clear();
	mover();
	checkCollisions();
	
	// dibujo jugador
	ctx.drawImage(playerImg, playerX, playerY);
	
	
	if(makeInvader()){
		var startpos = getInvaderStartPosition();
		invaders.push({x:startpos.x, y:startpos.y, dir:1});
			
	}
	
	// dibujo invaders
	for(var i=0;i<invaders.length;i++){
		ctx.drawImage(invaderImg, invaders[i].x, invaders[i].y);
	}
	
	
	if(shoot == true){
		shotsP.push({'x':playerX + (playerImg.width/ 2), 'y':playerY, 'color':'lime'});
		shoot = false;
	}
	
	// dibujo disparos jugador
	for(var i=0;i<shotsP.length;i++){							
		ctx.fillStyle = shotsP[i].color;
		ctx.fillRect(shotsP[i].x, shotsP[i].y, 2, 4);	
	}		
	
	// dibujo disparos invader
	for(var i=0;i<shotsI.length;i++){
						
		shotsI[i].y += 3;
		
		ctx.fillStyle = shotsI[i].color;
		ctx.fillRect(shotsI[i].x, shotsI[i].y, 2, 4);		
	}
	
	// escribo puntos y vidas
	ctx.font = "bold 12px sans-serif";
	ctx.fillStyle = "white";
	ctx.fillText("puntos: "+points, 10, 15);
	ctx.fillText("vidas: "+lives, canvas.width-80, 15);
	
	if(lives <= 0){
		clearTimeout(game);
		ctx.font = "bold 20px sans-serif";
		ctx.fillStyle = "white";
		ctx.fillText("se ha acabado!", 160, 160);
	}

	
}

function clear(){
	canvas.width = canvas.width;
}

function mover(){
	if(moveRight && (playerX + 5 + playerImg.width < canvas.width)){
		playerX += 5;
	}
	
	else if(moveLeft && (playerX - 5 > 0)){
		playerX -= 5;
	}
	
	for(var i=0;i<invaders.length;i++){				
		
		// si invader se sale del canvas
		if(invaders[i].y + invaderImg.height > canvas.height){
			invaders.splice(i, 1);
			continue;
		}
		
		
		if(invaders[i].x + (1 * invaders[i].dir) + invaderImg.width > canvas.width){
			invaders[i].dir = -1;
		}
		if(invaders[i].x + (1 * invaders[i].dir) < 0){
			invaders[i].dir = 1;
		}
		
		invaders[i].x += 1 * invaders[i].dir;
		invaders[i].y += 1;								
		
		if(invaderShoots()){
			shotsI.push({'x':invaders[i].x + (invaderImg.width/ 2), 'y':invaders[i].y + invaderImg.height, 'color':'white'});
		}
	}
	
	// muevo disparos jugador
	for(var i=0;i<shotsP.length;i++){
		
		shotsP[i].y -= 3;
		
		// si disparo jugador se sale del canvas							
		if(shotsP[i].y <= 0){
			shotsP.splice(i, 1);
			continue;
		}
		
	}
	
	// disparos invader fuera de canvas
	for(var i=0;i<shotsI.length;i++){
		if(shotsI[i].y + 4 >= canvas.height){
			shotsI.splice(i, 1);
		}
	}
}

function checkCollisions(){
	// colision disparos invader	
	for(var i=0;i<shotsI.length;i++){
		if(shotsI[i].y + 4 >= playerY){
			if( (shotsI[i].x >= playerX && shotsI[i].x <= playerX + playerImg.width) || (shotsI[i].x + 2 >= playerX && shotsI[i] + 2 <= playerX + playerImg.width) ){
				lives--;
				shotsI.splice(i, 1);							
			}
		}
	}
	
	
	
	// compruebo colision invader
	for(var i=0;i<invaders.length;i++){
		if(invaders[i].y + invaderImg.height >= playerY){
			if( (invaders[i].x >= playerX && invaders[i].x <= playerX + playerImg.width) || (invaders[i].x + invaderImg.width >= playerX && invaders[i].x + invaderImg.width <= playerX + playerImg.width) ){ 
				invaders.splice(i, 1);
				lives--;
			}
		}
	}
	
	// compruebo colision disparos jugador
	for(var i=0;i<invaders.length;i++){
		for(var j=0;j<shotsP.length;j++){

			if(!invaders[i]) continue;
			
			if(shotsP[j].y <= invaders[i].y + invaderImg.height && shotsP[j].y >= invaders[i].y){
				if( (shotsP[j].x >= invaders[i].x && shotsP[j].x <= invaders[i].x + invaderImg.width) || (shotsP[j].x + 2 >= invaders[i].x && shotsP[j] + 2 <= invaders[i].x + invaderImg.width) ){
					points++;
					invaders.splice(i, 1);
					
					shotsP.splice(j, 1);
				}
			}
		}
	}
}

function makeInvader(){
	if(Math.ceil(Math.random()*100) < 5) return true;
	return false;
}

function getInvaderStartPosition(){
	var rango_superior = canvas.width-invaderImg.width;  
	var rango_inferior = 0;  
	var x = Math.floor(Math.random()*(rango_superior-(rango_inferior-1))) + rango_inferior; 
	
	return {'y':0, 'x':x}
}

function invaderShoots(){
	if(Math.ceil(Math.random()*100) < 2) return true;
	return false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


