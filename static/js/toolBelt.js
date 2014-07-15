var ToolBelt = function  () {
	this.margin = 10;

	this.tools = [PolygonTool(),SectorTool(),OwnerTool()];

	this.mouseover = false;

	this.left = canvasWidth - canvasWidth * toolBeltRatio;
}


ToolBelt.prototype.update = function() {
	
};

ToolBelt.prototype.draw = function() {
	if(!this.mouseover) return;

	var currentHeight = 0;

	for (var tool = 0; tool < this.tools.length; tool++) {
		currentHeight += this.tools[tool].drawIcon(tool,currentHeight);
	};
};

ToolBelt.prototype.toolClicked = function(event) {
	var height = 0;
	for (var tool = 0; tool < this.tools.length; tool++) {
		height += this.tools[tool].iconHeight;
		
		if(height >= event.offsetY)
		{
			activeTool = this.tools[tool];
			this.tools[tool].wasSelected();
			return;
		}
	};
};


