PolygonTool = function  () {
	pg = new Tool(polygonToolIcon);


	addPolygonToolAttributes(pg);
	addPolygonToolMethods(pg);
	addPolygonToolKeyControl(pg);

	return pg;
}

function addPolygonToolMethods (object) {

	object.newPolygon = function() {
		console.log(this);	
	};

	object.clicked = function(event) 
	{
		if(!object.drawing&&!object.editingPoint&&!object.editingPoly)
		{
			var clicked = map.clickedPolygon(event);
			if(point = clicked.point)//on a clicke sur un sommet d'un polygon existant, on le déplace
			{
				object.editingPoly = clicked.poly;
				object.editingPoint = point;
				return;
			}else{ //on a clicke dans le vide, on a créé un nouveau polygone en lui créant un sommet directement à  l'endroit du clic
				object.editingPoly = map.addPolygon(event)//la fonction créé un premier sommet ("statique")
				var point = object.editingPoly.coordinates[0];
				object.editingPoint = object.editingPoly.addPoint(event,point);//cette méthode créé un autre sommet, et le met en édition.
				return;
			}
		}

		if(object.editingPoint)//on éditait un sommet d'un poly existant...
		{
			var prevPoint = object.editingPoint;

			var magnet = object.magneticPosition(event);

			if(magnet == object.editingPoly.coordinates[0])
			{
				if(!object.editingPoly.closed)
				{
					object.editingPoly.close();
					object.promptForName(object.editingPoly);
				}
				object.editingPoly = false;
				object.editingPoint = false;
				return;
			}else if(magnet)
			{
				var pos = {"offsetX":magnet.cX,"offsetY":magnet.cY};
			}else{
				var pos = event;
			}

			object.editingPoint.place(pos);//on le place donc ici !
			object.updateAdjancencies();

			if(object.editingPoly.closed)
			{
				object.editingPoly.setCenter();
				object.editingPoly = false;
				object.editingPoint = false;			
			}
			else{
				object.editingPoint = object.editingPoly.addPoint(pos,prevPoint);
			}
			return;
		}
	}

	object.updateAdjancencies = function()
	 {
	 	for (var poly = 0; poly < map.polygons.length; poly++) {
	 		map.polygons[poly].updateAdjacencies();
	 	};
	 }

	object.newPoint = function() {
		console.log(this);
	};

	object.moved = function(event)
	{
		if(object.editingPoint) object.editingPoint.place(event);
	};

	object.promptForName = function  (polygon) {
		$("#poly-name-prompt").dialog("open");
		
		submitCallBack.polygon = polygon;
		
		$("#poly-name-form").submit(function(e){
			e.preventDefault();
			submitCallBack.handler();
		});


	}
}

function addPolygonToolAttributes (object) {
	object.drawing = false;
	object.editingPoint = false;
	object.editingPoly = false;
}

function addPolygonToolKeyControl (object) {
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
		if(object.editingPoint)
		{
			object.editingPoly.removePoint(object.editingPoint);
			object.editingPoint = false;
			object.editingPoly = false;
		}
	}

	object.enterKey = function () {
		if(object.editingPoint)
		{
			index = object.editingPoly.coordinates.indexOf(object.editingPoint);

			object.editingPoly.insertPoint(object.editingPoint);

			object.editingPoint = object.editingPoly.coordinates[index+1];
		}
	}
}

SubmitCallBack = function()
{
	this.polygon;

	this.handler = function()
	{
		var prevTool = activeTool;
		activeTool = null; //pour laisser l'utilisateur utiliser le form sans foutre des sommets partout

		var name = $("#poly-name-form input").first().val();

		this.polygon.changeName(name);

		$("#poly-name-prompt").dialog("close");

		activeTool = prevTool;

	}

}

var submitCallBack = new SubmitCallBack();