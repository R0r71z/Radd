function jump(from,above) {
	var jumps = {
		"p1_jumps": {
			"H1G2": ["F3"],
			"H3G4": ["F5"],
			"H5G6": ["F7"],
			"H7G6": ["F5"],
			"H5G4": ["F3"],
			"H3G2": ["F1"],
			"G2F3": ["E4"],
			"G4F5": ["E6"],
			"G6F7": ["E8"],
			"G8F7": ["E6"],
			"G6F5": ["E4"],
			"G4F3": ["E2"],
			"F1E2": ["D3"],
			"F3E4": ["D5"],
			"F5E6": ["D7"],
			"F7E6": ["D5"],
			"F5E4": ["D3"],
			"F3E2": ["D1"],
			"E2D3": ["C4"],
			"E4D5": ["C6"],
			"E6D7": ["C8"],
			"E8D7": ["C6"],
			"E6D5": ["C4"],
			"E4D3": ["C2"],
			"D1C2": ["B3"],
			"D3C4": ["B5"],
			"D5C6": ["B7"],
			"D7C6": ["B5"],
			"D5C4": ["B3"],
			"D3C2": ["B1"],
			"C2B3": ["A4"],
			"C4B5": ["A6"],
			"C6B7": ["A8"],
			"C8B7": ["A6"],
			"C6B5": ["A4"],
			"C4B3": ["A2"]
		},
		"p2_jumps": {
			"A2B3": ["C4"],
			"A4B5": ["C6"],
			"A6B7": ["C8"],
			"A8B7": ["C6"],
			"A6B5": ["C4"],
			"A4B3": ["C2"],
			"B1C2": ["D3"],
			"B3C4": ["D5"],
			"B5C6": ["D7"],
			"B7C6": ["D5"],
			"B5C4": ["D3"],
			"B3C2": ["D1"],
			"C2D3": ["E4"],
			"C4D5": ["E6"],
			"C6D7": ["E8"],
			"C8D7": ["E6"],
			"C6D5": ["E4"],
			"C4D3": ["E2"],
			"D1E2": ["F3"],
			"D3E4": ["F5"],
			"D5E6": ["F7"],
			"D7E6": ["F5"],
			"D5E4": ["F3"],
			"D3E2": ["F1"],
			"F1G2": ["H3"],
			"F3G4": ["H5"],
			"F5G6": ["H7"],
			"F7G6": ["H5"],
			"F5G4": ["H3"],
			"F3G2": ["H1"]
		}
	};
	var p2_tokens = ["A2tok","A4tok","A6tok","A8tok","B1tok","B3tok","B5tok","B7tok","C2tok","C4tok","C6tok","C8tok"];
	var p1_tokens = ["F1tok","F3tok","F5tok","F7tok","G2tok","G4tok","G6tok","G8tok","H1tok","H3tok","H5tok","H7tok"];
	var moveto = [];

	if (turn == true) {
		for (e in jumps.p1_jumps) {
			if (e == from+above) {
				if ($("#"+jumps.p1_jumps[e]).is(':empty')) {
					if (p2_tokens.indexOf($("#"+above).children().attr('id')) != -1 ) {
						i = document.getElementById(jumps["p1_jumps"][from+above]);
						$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px red");
						setTimeout(function(){
							reset_moves();
						}, 2000);
						moveto.push(jumps["p1_jumps"][from+above]);
					}
				}
			}
		}
	} else {
		for (e in jumps.p2_jumps) {
			if (e == from+above) {
				if ($("#"+jumps.p2_jumps[e]).is(':empty')) {
					if (p1_tokens.indexOf($("#"+above).children().attr('id')) != -1 ) {
						i = document.getElementById(jumps["p2_jumps"][from+above]);
						$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px red");
						setTimeout(function(){
							reset_moves();
						}, 2000);
						moveto.push(jumps["p2_jumps"][from+above]);
					}
				} 
			}
		}
	}
};
