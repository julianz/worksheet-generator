function getRandomInt(min, max) {
	// Returns an int between min and max inclusive of both.
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEquation(min, max, used) {
	// Returns a string containing an equation we haven't seen before.
	
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
				
		already = (used[op][equation] == 1);
		used[op][equation] = 1;		
		//console.log(equation + " - " + already);
	}
	
	return equation + " =";
}

function generate() {
	$("#worksheet").hide();
	var min = $("#min").val() * 1;
	var max = $("#max").val() * 1;
	
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
	$("#worksheet").html(sheet);
	$("#worksheet").show();
}