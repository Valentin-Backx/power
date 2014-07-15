var params = {
			autoOpen: false,
			show: {
				effect: "blind",
				duration: 1000
			},
			hide: {
				effect: "explode",
				duration:1000
			}
		};

function uiPrepare () {
	$(function() {
		$( "#dialog" ).dialog(params);

		$( "#opener" ).click(function() {
		  $( "#dialog" ).dialog( "open" );
		  getMaps();
		});

		$("#poly-name-prompt").dialog(params);

		$("#sector-management-prompt").dialog(params);

		$("#sector-add-prompt").dialog(params);

		$("#owner-add-prompt").dialog(params);

	});
}
