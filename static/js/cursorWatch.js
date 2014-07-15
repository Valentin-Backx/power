var CursorWatch = function  () {

	var self = this;
	window.addEventListener("mousemove",function(event){self.mousemove(event)},false);
	window.addEventListener("click",function(event){self.mouseclick(event) },false);

	this.overCanvas = false;
}

CursorWatch.prototype.update = function() {
	
};

CursorWatch.prototype.mousemove = function(event) {
	this.isOverCanvas(event);
	if(this.overCanvas){
		this.checkToolBeltOver(event);
		if(activeTool)
		{
			activeTool.moved(event);
		}
	}
};

CursorWatch.prototype.isOverCanvas = function(event) {
	this.overCanvas = 
	(event.pageX > canvas.offsetLeft &&
	event.pageX < canvas.offsetLeft + canvasWidth&&
	event.pageY > canvas.offsetTop&&
	event.pageY < canvas.offsetTop + canvasHeight);

};


CursorWatch.prototype.mouseclick = function(event) {
	if(toolBelt.mouseover){
		toolBelt.toolClicked(event);
		return;	
	} 
	if(activeTool)
	{
		if(event.toElement != canvas) return;
		activeTool.clicked(event);
	}
};

CursorWatch.prototype.checkToolBeltOver = function(event) {
	toolBelt.mouseover = event.offsetX > canvasWidth - canvasWidth * toolBeltRatio;
};
