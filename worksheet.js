$(function() {
	// Generate a worksheet on load.
	generate();
})

function getRandomInt(min, max) {
	// Returns an int between min and max inclusive of both.
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEquation(min, max, used) {
	// Returns a string containing an equation we haven't seen before.
		
	// If we'll run out of options, allow repeats.
	var repeats_ok = ((max - min) * (max - min) * 4 < 100);
	
	var equation = "";
	var already = true;
	
	while (already)
	{
		var t1 = getRandomInt(min, max);
		var t2 = getRandomInt(min, max);
		var op = getRandomInt(0, 3);
		
		switch (op)
		{
			case 0:
				equation = t1 + " + " + t2; 
				break;
			
			case 1:
				equation = (t1 + t2) + " - " + t1; 
				break;
	
			case 2:
				equation = t1 + " × " + t2; 
				break;
	
			case 3:
				equation = (t1 * t2) + " ÷ " + t1; 
				break;
		}
				
		already = (repeats_ok) ? false : (used[op][equation] == 1);
		used[op][equation] = 1;		
		//console.log(equation + " - " + already);
	}
	
	return equation + " =";
}

function message(msg) {
	$("#messages").html("<p>" + msg + "</p>");
	$("#messages").show();
}

function generate() {
	$("#worksheet").hide();
	$("#messages").hide();
	
	var min = $("#min").val() * 1;
	var max = $("#max").val() * 1;

	if (!$.isNumeric(min) || min < 1) {
		message("Minimum value must be a number >= 1"); 
		return false; 
	}
	
	if (!$.isNumeric(max) || max <= min) { 
		message("Maximum value must be a number larger than the minimum"); 
		return false; 
	}
	
	var cols = 5;
	var rows = 20;
	
	var used = [ {}, {}, {}, {} ];
	
	var sheet = "<table>";
	
	for (var row = 0; row < rows; row++) {
		sheet += "<tr>";
		for (var col = 0; col < cols; col++) {
			sheet += "<td>" + getEquation(min, max, used) + "</td>";
		}
		sheet += "</tr>";
	}
	
	sheet += "</table>";
	$("#generated").html(sheet);
	$("#worksheet").show();
}