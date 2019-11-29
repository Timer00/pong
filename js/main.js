var intervalo,x,y,ctx,canvas,balls,palhetaL,palhetaR,mouseX,mouseY,tracado,controlsMouse,keyUp,keyDown,Lpoint,Rpoint,multiP;
tracado = 0;
controlsMouse = true; multiP = false;
x = 200; y = 200; Lpoint = 0; Rpoint = 0;
keyUpP = 87; keyDownP = 83; keyUp = 38; keyDown = 40;
function load(){
	canvas = document.getElementById('box');
	ctx = canvas.getContext('2d');
	function ball(x,y,r,speed){
		this.x = x;
		this.y = y;
		this.r = r
		this.speed = speed;
				
		this.reverseX = false;
		this.reverseY = false;
				
		this.drawn = function(){
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
			ctx.fill();
		
			if (this.x - this.r < 0){
				Rpoint++;
				document.getElementById('Rpoints').innerHTML = Rpoint;
				this.speed = 3;
				this.x = canvas.width/2;
				this.y = canvas.height/2;
				this.reverseX = false;
			}
			if (this.x + this.r > canvas.width){
				Lpoint++;
				document.getElementById('Lpoints').innerHTML = Lpoint;
				this.speed = 3;
				this.x = canvas.width/2;
				this.y = canvas.height/2;
				this.reverseX = true;
			}
			if (this.y - this.r < 0){
				this.reverseY = false;
				var wallHit = document.getElementById('wallHits');
				wallHit.play();
			}
			if (this.y + this.r > canvas.height){
				this.reverseY = true;
				var wallHit = document.getElementById('wallHits');
				wallHit.play();
			}
		}
	}
	balls = new ball(canvas.width/2,canvas.height/2,15,3);
	
	function palheta(x,y,width,height,speed,reverseSide){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
	
		this.up = false;
		this.down = false;
		
		this.drawn = function(){
			ctx.fillRect(this.x,this.y,this.width,this.height);
		
			if ((balls.x - balls.r < this.x+this.width) &&
			(balls.x + balls.r > this.x) &&
			(balls.y - balls.r < this.y + this.height) &&
			(balls.y + balls.r > this.y)){
				var hits = document.getElementById('hits');
				hits.play();
				if (balls.y - balls.r > this.y + this.height-30 && balls.y - balls.r < this.y + this.height){
					balls.reverseY = false;
				}
				if (balls.y + balls.r < this.y + 30 && balls.y + balls.r > this.y){
					balls.reverseY = true;
				}
				balls.reverseX = reverseSide;
				balls.speed += 0.5;
				console.log(balls.speed)
			}
		
		}
	}
	palhetaL = new palheta(25,(canvas.height/2)-100,25,150,5,false);
	palhetaR = new palheta(canvas.width-50,(canvas.height/2)-100,25,150,10,true);
//	=============Mouse control==========
	document.onmousemove = mouseMove;
	function mouseMove(e) {
		e = e || window.event
		mouseX = e.pageX;
		mouseY = e.pageY;
	}	
//	=============Keyboard control============	
	window.addEventListener("keydown", checkKeyDown, false);
	function checkKeyDown(e) {
		if (event.keyCode == keyUp){
			palhetaR.up = true;
		} else if (event.keyCode == keyDown){
			palhetaR.down = true;
		}
		if (event.keyCode == keyUpP){
			palhetaL.up = true;
		} else if (event.keyCode == keyDownP){
			palhetaL.down = true;
		}
	}
	window.addEventListener("keyup", checkKeyUp, false);	
	function checkKeyUp(e){
		if (event.keyCode == keyUp){
			palhetaR.up = false;
		} else if (event.keyCode == keyDown){
			palhetaR.down = false;
		}
		if (event.keyCode == keyUpP){
			palhetaL.up = false;
		} else if (event.keyCode == keyDownP){
			palhetaL.down = false;
		}
	}
	console.log(screen.width);
}	
function changeControl(){
	if (controlsMouse){
		controlsMouse = false;
		document.getElementById('controlMode').innerHTML = " Keyboard";
	} else {
		controlsMouse = true;
		document.getElementById('controlMode').innerHTML = " Mouse";
	}
}
function showDifficulty(){
	document.getElementById('menuT').style.display = 'none';
	document.getElementById('singleP').style.display = 'none';
	document.getElementById('multiP').style.display = 'none';
	document.getElementById('controls').style.display = 'none';
	
	document.getElementById('difficulty').style.display = 'block';
	document.getElementById('novice').style.display = 'block';
	document.getElementById('average').style.display = 'block';
	document.getElementById('expert').style.display = 'block';
}
function multiPlayer(){
	multiP = true;
	setTimeout('play()', 0);
}
function novice(){
	palhetaL.speed = 5;
	setTimeout('play()', 0);
}
function average(){
	palhetaL.speed = 10;
	setTimeout('play()', 0);
}
function expert(){
	palhetaL.speed = 20;
	setTimeout('play()', 0);
}
function play(){
	document.getElementById('menuT').style.display = 'none';
	document.getElementById('singleP').style.display = 'none';
	document.getElementById('multiP').style.display = 'none';
	document.getElementById('controls').style.display = 'none';
	document.getElementById('Lpoints').style.display = 'block';
	document.getElementById('Rpoints').style.display = 'block';
	document.getElementById('title').style.display = 'none';
	document.getElementById('difficulty').style.display = 'none';
	document.getElementById('novice').style.display = 'none';
	document.getElementById('average').style.display = 'none';
	document.getElementById('expert').style.display = 'none';
	intervalo = setInterval(animate, 1000/60);
}
function animate(){
//	--------Clear canvas---------
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
//  ----------Background-----------
	tracado = 5;
	for (var i = 0; i < 10; i++){
		ctx.fillStyle = "white";
		ctx.fillRect((canvas.width/2)-10,tracado,10,40);
		tracado += 50;
	}
//	============PalhetaR==========
	if (controlsMouse){
		palhetaR.y = mouseY - palhetaR.height;
	} else {
		if (palhetaR.up){
			palhetaR.y -= palhetaR.speed;
		}
		if (palhetaR.down){
			palhetaR.y += palhetaR.speed;
		}
		if (palhetaR.y < 0){
			palhetaR.y += palhetaR.speed;
		}
		if (palhetaR.y + palhetaR.height > canvas.height){
			palhetaR.y -= palhetaR.speed;
		}
	}
//	============PalhetaL==========	
	if (multiP){
		palhetaL.speed = 10;
		if (palhetaL.up){
			palhetaL.y -= palhetaL.speed;
		}
		if (palhetaL.down){
			palhetaL.y += palhetaL.speed;
		}
		if (palhetaL.y < 0){
			palhetaL.y += palhetaL.speed;
		}
		if (palhetaL.y + palhetaL.height > canvas.height){
			palhetaL.y -= palhetaL.speed;
		}
	} else {
		palhetadx = balls.x - palhetaL.x;
		palhetady = balls.y - (palhetaL.y+100);
		palhetadistance = Math.sqrt(palhetadx*palhetadx + palhetady*palhetady);
		palhetaspeedX = (palhetadx/palhetadistance) * palhetaL.speed;
		palhetaspeedY = (palhetady/palhetadistance) * palhetaL.speed;
		palhetaL.y += palhetaspeedY;
	}
//	=======Ball wall colision==========		
	if (balls.reverseX){
		balls.x -= balls.speed;
	} else {
		balls.x += balls.speed;
	}
	if (balls.reverseY){
		balls.y -= balls.speed;
	} else {
		balls.y += balls.speed;
	}
//	=========Drawning==========
	balls.drawn();
	palhetaL.drawn();
	palhetaR.drawn();
}