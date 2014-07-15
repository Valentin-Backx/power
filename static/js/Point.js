Point = function(x,y,leftNeighbor,rightNeighbor)
{
	this.color = "#FF0000";
	this.calculateToCommonCoordinates(x,y);
	this.calculateToCanvasCoordinates();

	this.leftNeighbor = leftNeighbor;
	this.rightNeighbor = rightNeighbor;

}

Point.prototype.calculateToCommonCoordinates = function(x,y) {
	this.x = x * 1000 / canvasWidth;
	this.y = y * 1000 /  canvasHeight;
};

Point.prototype.calculateToCanvasCoordinates = function() {
	this.cX = this.x * canvasWidth / 1000;
	this.cY = this.y * canvasHeight / 1000;	
};

Point.prototype.draw = function() {

	context.fillStyle = this.color;

	context.beginPath();
	
	context.arc(
		this.cX,
		this.cY,
		10,
		0,
		Math.PI * 2,
		0
	);

	context.fill();

	if(this.leftNeighbor) this.drawPathToNeihbor();
};

Point.prototype.isClicked = function(X,Y) {
	var dx = Math.abs(this.cX - X);
	var dy = Math.abs(this.cY - Y);

	return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)) < 10;	
};

Point.prototype.place = function(event) {
	this.calculateToCommonCoordinates(event.offsetX,event.offsetY);
	this.calculateToCanvasCoordinates();
};

Point.prototype.setStartPoint = function() {
	this.color = "#00AA00";
};

Point.prototype.drawPathToNeihbor = function() {
	context.fillStyle = "#FF0000";
	context.beginPath();
	context.moveTo(this.cX,this.cY);
	context.lineTo(this.leftNeighbor.cX,this.leftNeighbor.cY);
	context.stroke();
};