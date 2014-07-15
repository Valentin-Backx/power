Polygon = Backbone.RelationalModel.extend({
	urlRoot : '',
	relations : 
	[
		{
			type : Backbone.HasMany,
			key : 'coordinates',
			relatedModel : "Point",
			collectionType : 'PointCollection',
			reverseRelation : {
				key : 'isInPolygon',
				includeInJSON : 'id'
			}
		},
		{
			type : Backbone.HasMany,
			key : "adjacents",
			relatedModel : 'Polygon',
			collectionType : 'PolygonCollection',
			reverseRelation : {
				key : 'isAdjacentTo',
				includeInJSON : 'id'
			}
		}
	]
});

PolygonCollection = Backbone.Collection.extend({
	model : Polygon
})

Polygon.prototype.initialize = function(event) {

	this.set(
		{
			center : new Point({"x":0,"y":0,"event" : event})
		},
		{
			'remove' : false
		}
	);

	// this.center = ;
	// this.coordinates = [];
	this.addPoint(event).setStartPoint();
	this.closed = false;
	// this.name = "";

	// this.adjacents = [];

	this.sector = null;	
};


Polygon.prototype.addPoint = function(event,leftNeighbor) {
	//on ramene les coordonnées à ce qu'elles seraient dans un canvas de 1000 x 1000
	var newPoint = new Point({'leftNeighbor':leftNeighbor});

	newPoint.initializeWithEvent(event);

	// console.log(this.getRelation('coordinates'));

	this.getRelation('coordinates').relatedCollection.push(newPoint);

	this.setCenter();

	return newPoint;
};

Polygon.prototype.setCenter = function() {
	var x = 0;
	var y = 0;

	for (var point = 0; point < this.get('coordinates').length; point++) {
		x += this.coordinates[point].cX;
		y += this.coordinates[point].cY;
	};

	x /= this.get('coordinates').length;
	y /= this.get('coordinates').length;

	this.get('center').set( {'x': x});
	this.get('center').set({'y':y});
};

Polygon.prototype.draw = function() {
	context.font = "normal 25pt Calibri";
	context.fillStyle = "#FF0000";

	context.textAlign = "center";


	for (var point = 0; point < this.get('coordinates').length; point++) {
		this.get('coordinates').at(point).draw();
	};

	context.fillStyle = "#000000";
	context.fillText(this.name,this.get('center').get('x'),this.get('center').get('y'));
};

Polygon.prototype.clickedPoint = function(event) {
	for (var point = 0; point < this.get('coordinates').length; point++) {
		if(this.get('coordinates').at(point).isClicked(event.offsetX,event.offsetY)) return this.get('coordinates').at(point);
	};
	return false;
};

Polygon.prototype.close = function() {
	this.get('coordinates').pop();
	this.get('coordinates').at(0).leftNeighbor = this.get('coordinates').at(this.get('coordinates').length-1);
	this.closed = true;
};

Polygon.prototype.removePoint = function(point) {
	var index = this.get('coordinates').indexOf(point);
	this.get('coordinates').splice(index,1);

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
	this.Set({'name' : newName});
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