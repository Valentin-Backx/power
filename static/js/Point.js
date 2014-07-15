Point = Backbone.RelationalModel.extend({
	urlRoot : "/point/",
	
	relations : [
		{
			type : Backbone.HasOne,
			key : 'leftNeighbor',
			relatedModel : 'Point',
			reverseRelation : {
				type : Backbone.HasOne,
				key : 'isLeftNeighborOf',
				includeInJSON : 'id'
			}
		},
		{
			type : Backbone.HasOne,
			key : 'rightNeighbor',
			relatedModel : 'Point',
			reverseRelation : {
				type : Backbone.HasOne,
				key : 'isRightneighborOf',
				includeInJSON : 'id'
			}
		}
	],

	initializeWithEvent : function(event)
	{
		this.set ({color : "#FF0000"});
		// console.log(args);
		// debugger;
		this.calculateToCommonCoordinates(event["offsetX"],event["offsetY"]);
		this.calculateToCanvasCoordinates();

		//settés avec le "new"
		// this.leftNeighbor = leftNeighbor;
		// this.rightNeighbor = rightNeighbor;		
	}
});


// Point = function(x,y,leftNeighbor,rightNeighbor)
// {


// }

Point.prototype.calculateToCommonCoordinates = function(x,y) {
	this.set('x' , x * 1000 / canvasWidth);
	this.set('y',  y * 1000 /  canvasHeight);
};

Point.prototype.calculateToCanvasCoordinates = function() {
	this.cX = this.get('x') * canvasWidth / 1000;
	this.cY = this.get('y') * canvasHeight / 1000;	
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

PointCollection = Backbone.Collection.extend({
	model : Point
});