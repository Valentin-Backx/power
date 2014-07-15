Sector = Backbone.RelationalModel.extend({
	relations : [
		{
			type : Backbone.HasMany,
			key : 'polygons',
			relatedModel : 'polygon',
			collectionType : 'polygonCollection',
			reverseRelation : {
				key : 'isPartOf',
				includeInJSON : 'id'

			}
		}
	]
});

// Sector = function (name)
// {
// 	this.name=name;
// 	this.owner = null;
// 	this.polygons = [];//not saved serverside, but useful for clientside...think of filling when loading the map
// }

SectorColleciton = Backbone.Collection.extend({
	model : Sector
});
