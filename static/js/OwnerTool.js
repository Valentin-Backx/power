OwnerTool = function  () {
	ot = new Tool(ownerToolIcon);

	addOwnerToolAttributes(ot);
	addOwnerToolMethods(ot);
	addOwnerToolKeyControl(ot);

	$("owner-add-form").submit(function  (e) {
		e.preventDefault();

		ot.addOwner($("new-owner-name").val());
	});

	return ot;
}

function addOwnerToolAttributes (object) {
	
}

function addOwnerToolMethods (object) {
	object.addOwner = function  (name) {
		var owner = new Owner({name:name,polygons:[]});
		// owner.save(); this is handled by backbone relational now
		map.owners.push(owner);
	}

	object.moved = function  (event) {
		
	}

	object.wasSelected = function()
	{
		$("owner-add-prompt").dialog("open");
	}
}

function addOwnerToolKeyControl (object) {
	
}