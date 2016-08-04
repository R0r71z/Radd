
var black = '<div style="display:block; padding:0px; margin:0px; width:48px; height:48px; float:left; background-color:#17A70D;"></div>';
var white = '<div style="display:block; padding:0px; margin:0px; width:48px; height:48px; float:left; background-color:#000000;"></div>';

function make_checkers() {
	var count = 0;
	while (count<4) {
		var i = 0;
		while ( i < 4 ) {
			$('#main').append(white);
			$('#main').append(black);
			i += 1
		}
		var p = 0;
		while (p < 4 ) {
			$('#main').append(black);
			$('#main').append(white);
			p += 1
		}
		count += 1
	}
}

make_checkers();