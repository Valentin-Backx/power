var canvas,context;

var canvasWidth,canvasHeight;

var bgRatio;

var toolBelt,cursorWatch;

var toolBeltRatio = 0.05;

var map;

var activeTool;

window.onload = function () {

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	
	canvasHeight = window.innerHeight - 100;
	canvasWidth = window.innerWidth - 335;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	bgRatio = backgroundImage.width / backgroundImage.height;

	toolBelt = new ToolBelt();
	cursorWatch = new CursorWatch();

	map = new Map();

	run();
}

//Fonctions de synchronisation d'affichage
window.requestAnimFrame = 	(
	function(){
		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
	}
)();

function run () {

	context.fillStyle = "#FFFFFF";

	context.fillRect(0,0,canvasWidth,canvasHeight);


	context.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,canvasHeight * bgRatio,canvasHeight);

	cursorWatch.update();

	toolBelt.draw();

	map.draw();

	requestAnimFrame(run);

}

