var button;
var data;


document.ready = function()
{

	button = document.getElementById("submit-button");
	data = document.getElementById("dataset");
	
	if(data.getAttribute("data-ready") == "True")
	{
		greyOut();	
	}
	
}

function greyOut () {
	button.disabled = 'disabled';
}

