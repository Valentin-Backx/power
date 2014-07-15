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
		var owner = new Owner(name);
		owner.save();
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