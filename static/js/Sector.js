Sector = function (name)
{
	this.name=name;
	this.owner = null;
	this.polygons = [];//not saved serverside, but useful for clientside...think of filling when loading the map
}

Sector.prototype.save = function() {
	asyncSave("addSector",{'name':this.name,'owner':this.owner.name});
};