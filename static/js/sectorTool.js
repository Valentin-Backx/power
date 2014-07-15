SectorTool = function () {


	st = new Tool(sectorToolIcon);

	addSectorToolAttributes(st);
	addSectorToolMethods(st);
	addSectorToolKeyControl(st);


	$("#sector-add").click(function(){

		$("#sector-add-prompt").dialog("open");

		$("#sector-add-form").submit(function(e){
			e.preventDefault();

			$("#map-owners").empty();

			for (var owner = 0; owner < map.owners.length; owner++) {
				$("#map-owners").append(
				    	"<input type='radio' name='new-sector-owner' value="+map.owners[owner].name+" />"+
				    	"<label for="+map.owners[owner].name+">"+map.owners[owner].name+"</label>"
				    );
			};
			st.addSector($("#new-sector-name").val(),$("#new-sector-owner").val());
		});
	});

	return st;
}


function addSectorToolAttributes (object) {
	
}

function addSectorToolMethods (object) {

	object.addSector = function(name,owner)
	{
		map.addSector(name,owner);
	}
	

	object.moved = function(event)
	{

	}

	object.wasSelected = function()
	{
		$("#sector-management-prompt").dialog("open");

		$("#sector-management-form").submit(function(e){
			e.preventDefault();
				
		});		
	}
	
}

function addSectorToolKeyControl (object) {
	window.onkeydown = function (event) {
		switch(event.keyCode)
		{
			case 46:
				object.delKey();
				break;
			case 13:
				object.enterKey();
				break;
		}
	}

	object.delKey = function () {

	}

	object.enterKey = function () {

	}	
}