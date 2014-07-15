Tool = function  (image) {
	this.image = image;

	this.iconWidth = canvasWidth * toolBeltRatio;
	this.iconHeight = this.image.height * this.iconWidth / this.image.width;
}

Tool.prototype.wasSelected = function() {
	
};

Tool.prototype.drawIcon = function(index,currentHeight) {

	context.drawImage(
		this.image,//src
		0,//sx
		0,//sy
		this.image.width,//sw
		this.image.height,//sh
		canvasWidth - canvasWidth * toolBeltRatio,//dx
		currentHeight+toolBelt.margin*index,//dy
		this.iconWidth,//dw
		this.iconHeight
	);

	return this.iconHeight;
};

Tool.prototype.clicked = function(event) {
		console.log("I am active tool and I got clicked");
};

Tool.prototype.magneticPosition = function(event) {
	for (var poly = 0; poly < map.polygons.length; poly++) {
		if(magnet = map.polygons[poly].clickedPoint(event))
		{
			return magnet;
		}
	};
	return false;
};