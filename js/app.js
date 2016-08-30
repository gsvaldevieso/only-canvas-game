/* VARIABLES AND CONSTANTS DEFINITION */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var FACTOR = 44;

var character = {
	x: 0,
	y: 0,
	width: Math.round(CANVAS_HEIGHT/FACTOR),
	height: Math.round(CANVAS_WIDTH/FACTOR),
	velX: 0,
	velY: 0
};

var foods = [];

window.onload = function(){
	ctx.beginPath();
	ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.fillStyle = "white";
	ctx.fill();
	
	generateFoods();
	
	setInterval(function(){
		drawGrid();
		drawFoods();
		drawCharacter();
		checkCharacterPosition();
		character.x+=character.velX;
		character.y+=character.velY;
		}, 500);
}

window.onkeypress = function (e) {
    e = e || window.event;
  
    if(e.keyCode == 119){
    	character.velY = -character.height;
    	character.velX = 0;
    }

    if(e.keyCode == 115)
    {
    	character.velY = character.height;
    	character.velX = 0;
    }

    if(e.keyCode == 97)
    {
    	character.velY = 0;
    	character.velX = -character.width;
    }

    if(e.keyCode == 100)
    {
    	character.velY = 0;
    	character.velX = character.width;
    }
};

var generateFoods = function(){
	var maxFoodCount = (CANVAS_HEIGHT/FACTOR);

	for(var x=0;x<maxFoodCount;x++){	
		for(var y=0;y<maxFoodCount;y++){	
			if(Math.floor((Math.random() * 10) + 1) == 2)
				foods.push({
					x: x * Math.round(CANVAS_HEIGHT/FACTOR),
					y: y * Math.round(CANVAS_WIDTH/FACTOR),
					width: Math.round(CANVAS_HEIGHT/FACTOR),
					height: Math.round(CANVAS_WIDTH/FACTOR)
				});
		}
	}
};

var randomNewFood = function(){
	var max = Math.round((CANVAS_HEIGHT/FACTOR));
	var roundX = Math.round((Math.random() * max) + 0);
	var roundY = Math.round((Math.random() * max) + 0);

	foods.push({
		x: roundX * Math.round(CANVAS_HEIGHT/FACTOR),
		y: roundY * Math.round(CANVAS_WIDTH/FACTOR),
		width: Math.round(CANVAS_HEIGHT/FACTOR),
		height: Math.round(CANVAS_WIDTH/FACTOR)
	});
};

var checkCharacterPosition = function(){
	foods.forEach(function(food, index, object) {
		if(food.x == character.x && food.y == character.y){
			object.splice(index, 1);
			randomNewFood();
		}
	});
};

var drawFoods = function(){
	foods.forEach(function(food) {
		ctx.fillStyle = "red";
		ctx.fillRect(food.x,food.y,food.width,food.height);
	});
};

var drawCharacter = function(){
	ctx.fillStyle = "black";
	ctx.fillRect(character.x,character.y,character.width,character.height);
};

var drawGrid = function(){
	ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	var verticalLinesCount = Math.round(CANVAS_HEIGHT/FACTOR);
	var horizontalLinesCount = Math.round(CANVAS_WIDTH/FACTOR);

	for(var x=0;x<FACTOR;x++){
		for(var y=0;y<FACTOR;y++){
			ctx.beginPath();
			ctx.moveTo(0,y * horizontalLinesCount);
			ctx.lineTo(CANVAS_WIDTH, y * horizontalLinesCount);
			ctx.stroke();
		}

		ctx.beginPath();
		ctx.moveTo(x * verticalLinesCount,0);
		ctx.lineTo(x * verticalLinesCount, CANVAS_HEIGHT);
		ctx.stroke();
	}
};