function asyncSave (callback,parameters) {
	$.post({
		url:"http://"+window.location.host+"/editor/"+callback,
		data:parameters
	});
}