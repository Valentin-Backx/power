Owner  = Backbone.RelationalModel.extend({
	relations : [{
		type : Backbone.HasMany,
		key : 'sectors',
		relatedModel : 'Sector',
		collectionType : 'SectorCollection',
		reverseRelation : {
			key : 'isOwnedBy',
			includeInJSON : 'id'
		}
	}],
	urlRoot : '/owner/'
});

// Owner = function(name) {
// 	this.name = name;
// 	this.headquarters;
// }

// Owner.prototype.save = function(){
// 	asyncSave("addOwner",{'name':this.name,'hq':this.headquarters.name});
// };