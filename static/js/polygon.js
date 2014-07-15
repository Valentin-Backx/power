Polygon = function (event) {
	this.center = {"x":0,"y":0};
	this.coordinates = [];
	this.addPoint(event).setStartPoint();
	this.closed = false;
	this.name = "";

	this.adjacents = [];

	this.sector = null;
}

Polygon.prototype.addPoint = function(event,leftNeighbor) {
	//on ramene les coordonnées à ce qu'elles seraient dans un canvas de 1000 x 1000
	var newPoint = new Point(event.offsetX,event.offsetY,leftNeighbor);

	this.coordinates.push(newPoint);

	this.setCenter();

	return newPoint;
};

Polygon.prototype.setCenter = function() {
	var x = 0;
	var y = 0;

	for (var point = 0; point < this.coordinates.length; point++) {
		x += this.coordinates[point].cX;
		y += this.coordinates[point].cY;
	};

	x /= this.coordinates.length;
	y /= this.coordinates.length;

	this.center.x = x;
	this.center.y = y;
};

Polygon.prototype.draw = function() {
	context.font = "normal 25pt Calibri";
	context.fillStyle = "#FF0000";

	context.textAlign = "center";


	for (var point = 0; point < this.coordinates.length; point++) {
		this.coordinates[point].draw();
	};

	context.fillStyle = "#000000";
	context.fillText(this.name,this.center.x,this.center.y);
};

Polygon.prototype.clickedPoint = function(event) {
	for (var point = 0; point < this.coordinates.length; point++) {
		if(this.coordinates[point].isClicked(event.offsetX,event.offsetY)) return this.coordinates[point];
	};
	return false;
};

Polygon.prototype.close = function() {
	this.coordinates.pop();
	this.coordinates[0].leftNeighbor = this.coordinates[this.coordinates.length-1];
	this.closed = true;
};

Polygon.prototype.removePoint = function(point) {
	var index = this.coordinates.indexOf(point);
	this.coordinates.splice(index,1);

	if(this.coordinates.length < 1) {
		map.removePolygon(this);
		return;
	}

	this.coordinates[index].leftNeighbor = this.coordinates[index - 1];
};

Polygon.prototype.insertPoint = function(startPoint) {
	var index = this.coordinates.indexOf(startPoint);


	var indexp1;
	if(index == this.coordinates.length -1) indexp1 = 0;
	else indexp1 = index + 1;

	var newPoint = new Point(startPoint.cX,startPoint.cY,startPoint,this.coordinates[indexp1]);
	startPoint.rightNeighbor = newPoint;
	
	this.coordinates[indexp1].leftNeighbor = newPoint;

	this.coordinates.splice(indexp1,0,newPoint);
};

Polygon.prototype.changeName = function(newName) {
	// console.log(this.name);
	this.name = newName;
};

Polygon.prototype.updateAdjacencies = function() {
	this.adjacents = [];

	for (var point = 0; point < this.coordinates.length; point++) {

		var polyAndPoints = map.getAdjacents({"offsetX":this.coordinates[point].cX,"offsetY":this.coordinates[point].cY});


		for (var polyAndPoint = 0; polyAndPoint < polyAndPoints.length; polyAndPoint++) {

			if(polyAndPoints[polyAndPoint] && polyAndPoints[polyAndPoint].poly!= this && !this.hasAdjacent(polyAndPoints[polyAndPoint].poly))
			{
				this.adjacents.push(polyAndPoints[polyAndPoint].poly);
			}
		};
	};
};

Polygon.prototype.hasPoint = function(target) {
	for (var point = 0; point < this.coordinates.length; point++) {
		if(this.coordinates[point] == target) return;
	};
};

Polygon.prototype.hasAdjacent = function(adjacent) {
	for (var adj = 0; adj < this.adjacents.length; adj++) {
		if(this.adjacents[adj] == adjacent) return true;
	};
	return false;
};