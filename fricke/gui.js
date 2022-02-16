var time;
$(document).ready(function(){
	$("#compute").click(function(){
	$("#note").text("Note: Computing.....");
		time = new Date().getTime();
		setTimeout(function(){
			new Promise(compute).then(doneCompute("Note: Done! The computation time is about "));
		}, 50);
	});
	
	$("#reset").click(function(){
		$("#note").text("Note:");
		$("#word").val("");
		$("#fpOutput").text("");
	});
});

function compute(value){
	$("#fpOutput").html(Fricke($("#word").val()).toString());
	$("#fpOutput").slideDown("slow");
}

function doneCompute(value){
	$("#note").text(value + (new Date().getTime() - time - 50) + " milliseconds.");
}
