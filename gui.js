$(document).ready(function(){
	// Compute the number of intersections, self-intersections, and the Goldman bracket of curves
    $("#compute").click(function(){
		// Getting input c1, c2, and sw
		var sw = new Word();
		sw.setWordString($("#sw").val());
		var c1 = new Word();
		c1.setWordString($("#c1").val());
		var c2= new Word();
		c2.setWordString($("#c2").val());
		// Cyclically reduce 2 words(curves) c1 and c2
		c1.toReduceCyclic(); c2.toReduceCyclic();
		
		// Calculate and show the results
		$("#SI").text("The number of self-intersections of " + 
					c1.toString() + " is " + selfIntersectionNumber(c1,sw));
		$("#SI").slideDown("slow");
		
		$("#intersectionNumber").text("The (minimal) number of intersections between " + c1.toString() + 
				" and " + c2.toString() + " is " + intersectionNumber(c1, c2, sw));
		$("#intersectionNumber").slideDown("slow");
		
		$("#goldman").text(goldmanBracket(c1, c2, sw).toString());
		$("#goldman").slideDown("slow");
		
		$("#cobracket").text(cobracket(c1, sw).toString());
		$("#cobracket").slideDown("slow");
    });
	
	// Reset function: reset everything to null
	$("#reset").click(function(){
		$("#sw").val("");
		$("#c1").val("");
		$("#c2").val("");

		$("#intersectionNumber").slideUp("slow");
		$("#SI").slideUp("slow");
		$("#goldman").slideUp("slow");
		$("#cobracket").slideUp("slow");
		$("#intersectionNumber").text("");
		$("#SI").text("");
		$("#goldman").text("");
		$("#cobracket").text("");
	});
	
	// Slide effect
	$("#siSlide").click(function(){
		$("#SI").slideToggle("slow");
	});
	$("#intersectionSlide").click(function(){
		$("#intersectionNumber").slideToggle("slow");
	});
	$("#goldmanSlide").click(function(){
		$("#goldman").slideToggle("slow");
	});
	$("#cobracketSlide").click(function(){
		$("#cobracket").slideToggle("slow");
	});
	
});
