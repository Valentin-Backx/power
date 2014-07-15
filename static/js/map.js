Map = function  () {
	this.polygons = [];
	this.sectors = [];
	this.owners = [];//player spots
}

Map.prototype.addPolygon = function() {
	var poly = new Polygon(event);
	this.polygons.push(poly);
	return poly;
};

Map.prototype.draw = function() {
	for (var i = 0; i < this.polygons.length; i++) {
		this.polygons[i].draw();
	};
};

Map.prototype.clickedPolygon = function(event) {
	for (var poly = 0; poly < this.polygons.length; poly++) {
		if(point = this.polygons[poly].clickedPoint(event))
		{
			console.log(point);
			 return {"poly":this.polygons[poly],"point":point};	
		}
	};
	return false;
};

Map.prototype.getAdjacents = function(target)
{
	var res = [];

	for (var poly = 0; poly < this.polygons.length; poly++) {
		if(point = this.polygons[poly].clickedPoint(target)) res.push({"poly":this.polygons[poly],"point":point});
	};
	return res;
}

Map.prototype.removePolygon = function(poly) {

	this.polygons.splice(this.polygons.indexOf(poly),1);



	delete poly;
};

Map.prototype.addSector = function(name,owner) {

	var sector = new Sector({name: name});

	sector.set('isOwnedBy' , owner);

	sector.owner = function  (owner) {
		for (var i = map.owners.length - 1; i >= 0; i--) {
			if(map.owners[i] == owner) return map.owner[i];
		};
	}

	this.sectors.push(sector);

	// sector.save(); this is handled by backbone relational now
};