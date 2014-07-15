Owner = function(name) {
	this.name = name;
	this.headquarters;
}

Owner.prototype.save = function(){
	asyncSave("addOwner",{'name':this.name,'hq':this.headquarters.name});
};