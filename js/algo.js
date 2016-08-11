
var green = '<div style="display:block; padding:0px; margin:0px; width:63px; height:63px; float:left; background-color:#17A70D;" id="%data%"></div>';
var black = '<div style="display:block; padding:0px; margin:0px; width:63px; height:63px; float:left; background-color:#000000;" id="%data%"></div>';
var tokens = [];

function make_id() {
	letters = ["A","B","C","D","E","F","G","H"];
	var nums = ["1","2","3","4","5","6","7","8"];
	var id = [];
	for (e in letters) {
		for (a in nums) {
			id.push(letters[e]+nums[a]);
		}
	}
	return id;
};

var id = make_id();


function make_cols() {
	for (var i=1;i<9;i++) {
		var number = '<div style="display:block; padding:0px;margin:0px; width:63px;height:63px;float:left; background-color: #FFFFFF; font-size: 5ex">%data%</div>'
		$("#col").append(number.replace("%data%", i));
	}
};

function make_rows() {
	for (e in letters) {
		var number = '<div style="display:block; padding:0px;margin:0px; width:63px;height:63px;float:right; background-color: #FFFFFF; font-size: 5ex">%data%</div>'
		$("#row").append(number.replace("%data%", letters[e]));
	}
};

function make_checkers() {
	var count = 0;
	while (count<4) {
		var i = 0;
		while ( i < 4 ) {
			$('#main').append(green.replace("%data%",id.splice(0,1)));
			$('#main').append(black.replace("%data%", id.splice(0,1)));
			i += 1
		}
		var p = 0;
		while (p < 4 ) {
			$('#main').append(black.replace("%data%", id.splice(0,1)));
			$('#main').append(green.replace("%data%", id.splice(0,1)));
			p += 1
		}
		count += 1
	}
};

function show_nl() {
	make_cols();
	make_rows();
	$(document.getElementById("show").remove());
	$('#gamearea').append('<button id="hide" type="button" onclick="hide_nl()" style="color: black; background-color:gray; float:left; margin-top:20px;"><b>Hide Numbers/Letters</b></button>');
};


function hide_nl() {
	$(document.getElementById("row").remove());
	$(document.getElementById("col").remove());
	$('#gamearea').prepend('<div id="col" style="width: 504px; height: 63px; margin:0px;"></div>');
	$('#gamearea').prepend('<div id="row" style="width: 63px; height:504px; float:left; margin-top: 80px;"></div>');
	$(document.getElementById('hide').remove());
	$('#gamearea').append('<button id="show" type="button" onclick="show_nl()" style="color: black; background-color:gray; float:left; margin-top:20px;"><b>Show Numbers/Letters</b></button>');

};

var token = function(h,w,color) {
	this.color = color;
	this.height = h;
	this.width = w;
};

var draw = function(rad,m) {
	var element = '<div id="' + m.replace("#", "") +'tok" style="width: %width%px; height: %height%px; background: %color%; -moz-border-radius: 50px; -webkit-border-radius: 50px;border-radius: 50px; %addposition%"></div>'
	var element = element.replace("%height%", rad.height);
	var element = element.replace("%width%", rad.width);
	var element = element.replace("%color%", rad.color);
	var element = element.replace("%addposition%", "margin-top: 10px; margin-left: 0px; border: double;");
	tokens.push(m +'tok');
	$(m).append(element);
};
	
function tokenSquares() {
	var p2_squares = ["A2","A4","A6","A8","B1","B3","B5","B7","C2","C4","C6","C8"];
	var p1_squares = ["F1","F3","F5","F7","G2","G4","G6","G8","H1","H3","H5","H7"];
	var p1_token = new token(40,40,"gray");
	var p2_token = new token(40,40,"pink");
	for (e in p2_squares) {
		if (document.getElementById(p2_squares[e]+"tok") == null) {
			draw(p2_token,"#"+p2_squares[e]);
		}
	}
	for (e in p1_squares) {
		if (document.getElementById(p1_squares[e]+"tok") == null) {
			draw(p1_token,"#"+p1_squares[e]);
		}
	}
};

var game_started = false;

function play() {
	if (game_started == false) {
		tokenSquares();
		click_functions();
		game_started = true;
	} else {
		alert("Game already started!");
	}
};

function delete_token(token) {
	if (document.getElementById(token.replace("#","")) != null) {
		$(token).remove();
	} else {
		console.log("There is no such token")
	}
};

function reset() {
	var p2_tokens = ["#A2tok","#A4tok","#A6tok","#A8tok","#B1tok","#B3tok","#B5tok","#B7tok","#C2tok","#C4tok","#C6tok","#C8tok"];
	var p1_tokens = ["#F1tok","#F3tok","#F5tok","#F7tok","#G2tok","#G4tok","#G6tok","#G8tok","#H1tok","#H3tok","#H5tok","#H7tok"];
	if (game_started == false) {
		alert("Hit play first!");
	} else {
		for (e in p2_tokens){
			delete_token(p2_tokens[e]);
		}
		for (e in p1_tokens) {
			delete_token(p1_tokens[e]);
		}
		turn = true;
		tokenSquares();
		p1_dead = [];
		p2_dead = [];
	}
};

function reset_moves() {
	id = make_id();
	for (e in id) {
		$("#"+id[e]).css("-webkit-box-shadow", "none");
	}
};

var turn = true;
var p1_dead = [];
var p2_dead = [];

function turns(){
	if (turn == true) {
		turn = false;
	} else {
		if (turn == false) {
			turn = true;
		}
	}
};


var av_moves = function(square) {
	var p2_tokens = ["A2tok","A4tok","A6tok","A8tok","B1tok","B3tok","B5tok","B7tok","C2tok","C4tok","C6tok","C8tok"];
	var p1_tokens = ["F1tok","F3tok","F5tok","F7tok","G2tok","G4tok","G6tok","G8tok","H1tok","H3tok","H5tok","H7tok"];
	var moves = {
		"p2_moves": {
			"A2": ["B3","B1"],
			"A4": ["B5", "B3"],
			"A6": ["B7","B5"],
			"A8": ["B7"],
			"B1": ["C2"],
			"B3": ["C4","C2"],
			"B5": ["C6","C4"],
			"B7": ["C8", "C6"],
			"C2": ["D3","D1"],
			"C4": ["D5","D3"],
			"C6": ["D7","D5"],
			"C8": ["D7"],
			"D1": ["E2"],
			"D3": ["E2","E4"],
			"D5": ["E4","E6"],
			"D7": ["E6", "E8"],
			"E2": ["F1","F3"],
			"E4": ["F3","F5"],
			"E6": ["F5", "F7"],
			"E8": ["F7"],
			"F1": ["G2"],
			"F3": ["G2","G4"],
			"F5": ["G4","G6"],
			"F7": ["G6","G8"],
			"G2": ["H1","H3"],
			"G4": ["H3","H5"],
			"G6": ["H5","H7"],
			"G8": ["H7"]
		},
		"p1_moves": {
			"B1": ["A2"],
			"B3": ["A4","A2"],
			"B5": ["A6","A4"],
			"B7": ["A8", "A6"],
			"C2": ["B3","B1"],
			"C4": ["B5","B3"],
			"C6": ["B7","B5"],
			"C8": ["B7"],
			"D1": ["C2"],
			"D3": ["C4","C2"],
			"D5": ["C6","C4"],
			"D7": ["C8", "C6"],
			"E2": ["D3","D1"],
			"E4": ["D5","D3"],
			"E6": ["D7", "D5"],
			"E8": ["D7"],
			"F1": ["E2"],
			"F3": ["E4","E2"],
			"F5": ["E6","E4"],
			"F7": ["E8","E6"],
			"G2": ["F3","F1"],
			"G4": ["F5","F3"],
			"G6": ["F7","F5"],
			"G8": ["F7"],
			"H1": ["G2"],
			"H3": ["G4","G2"],
			"H5": ["G6", "G4"],
			"H7": ["G8","G6"]
		}
	};
	var jumps = {
		"p1_jumps": {
			"H1G2": "F3",
			"H3G4": "F5",
			"H5G6": "F7",
			"H7G6": "F5",
			"H5G4": "F3",
			"H3G2": "F1",
			"G2F3": "E4",
			"G4F5": "E6",
			"G6F7": "E8",
			"G8F7": "E6",
			"G6F5": "E4",
			"G4F3": "E2",
			"F1E2": "D3",
			"F3E4": "D5",
			"F5E6": "D7",
			"F7E6": "D5",
			"F5E4": "D3",
			"F3E2": "D1",
			"E2D3": "C4",
			"E4D5": "C6",
			"E6D7": "C8",
			"E8D7": "C6",
			"E6D5": "C4",
			"E4D3": "C2",
			"D1C2": "B3",
			"D3C4": "B5",
			"D5C6": "B7",
			"D7C6": "B5",
			"D5C4": "B3",
			"D3C2": "B1",
			"C2B3": "A4",
			"C4B5": "A6",
			"C6B7": "A8",
			"C8B7": "A6",
			"C6B5": "A4",
			"C4B3": "A2"
		},		
		"p2_jumps": {
			"A2B3": "C4",
			"A4B5": "C6",
			"A6B7": "C8",
			"A8B7": "C6",
			"A6B5": "C4",
			"A4B3": "C2",
			"B1C2": "D3",
			"B3C4": "D5",
			"B5C6": "D7",
			"B7C6": "D5",
			"B5C4": "D3",
			"B3C2": "D1",
			"C2D3": "E4",
			"C4D5": "E6",
			"C6D7": "E8",
			"C8D7": "E6",
			"C6D5": "E4",
			"C4D3": "E2",
			"D1E2": "F3",
			"D3E4": "F5",
			"D5E6": "F7",
			"D7E6": "F5",
			"D5E4": "F3",
			"D3E2": "F1",
			"E2F3": "G4",
			"E4F5": "G6",
			"E6F7": "G8",
			"E8F7": "G6",
			"E6F5": "G4",
			"E4F3": "G2",
			"F1G2": "H3",
			"F3G4": "H5",
			"F5G6": "H7",
			"F7G6": "H5",
			"F5G4": "H3",
			"F3G2": "H1"
		}
	}


	var moveto = [];
	var move_kill = [];
	var above = [];
	if (turn == true) {
		for (e in moves.p1_moves) {
			if (e == square) {
				if (p1_tokens.indexOf($("#"+square).children().attr('id')) != -1 ) {
					for (a in e) {
						if ($("#"+square).is(":empty") == false) {
							if ($("#"+moves.p1_moves[e][a]).is(":empty") == true) {
								i = document.getElementById(moves["p1_moves"][e][a]);
								$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px blue");
								moveto.push(moves["p1_moves"][e][a]);
							} else {
								for (tok in p2_tokens) {
									if (p2_tokens[tok] == $("#"+moves.p1_moves[e][a]).children().attr('id')) {
										if ($("#"+jumps.p1_jumps[square+moves.p1_moves[e][a]]).is(':empty')) {
											var i = document.getElementById(jumps.p1_jumps[square+moves.p1_moves[e][a]]);
											$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px red");
											move_kill.push(jumps.p1_jumps[square+moves.p1_moves[e][a]]);
											above.push(moves.p1_moves[e][a]);
										}
									}
								}
							}
						}		
					}
				}
			}
		}
	} else {
		for (e in moves.p2_moves) {
			if (e == square) {
				if (p2_tokens.indexOf($("#"+square).children().attr('id')) != -1) {
					for (a in e) {
						if ($("#"+square).is(":empty") == false) {
							if ($("#"+moves.p2_moves[e][a]).is(":empty") == true) {
								i = document.getElementById(moves["p2_moves"][e][a]);
								$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px blue");
								moveto.push(moves["p2_moves"][e][a]);
							} else {
								for (tok in p1_tokens) {
									if (p1_tokens[tok] == $("#"+moves.p2_moves[e][a]).children().attr('id')) {
										if ($("#"+jumps.p2_jumps[square+moves.p2_moves[e][a]]).is(':empty')) {
											var i = document.getElementById(jumps.p2_jumps[square+moves.p2_moves[e][a]]);
											$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px red");
											move_kill.push(jumps.p2_jumps[square+moves.p2_moves[e][a]]);
											above.push(moves.p2_moves[e][a]);

										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	for (e in move_kill) {
		(function(e){
			var b = $("#"+square).children();
			var t = $("#"+above[e]).children();
			$("#"+move_kill[e]).off("click");
			$("#"+move_kill[e]).on("click", function(){
				$("#"+move_kill[e]).append(b);
				if (p1_tokens.indexOf($(t).attr('id')) != -1){
					p1_dead.push($(t).attr('id'));
					if (p1_dead.length === p1_tokens.length) {
						end();
						alert("Player 2 has won the game!");
					}
				} 
				else {
					p2_dead.push($(t).attr('id'));
					if (p2_dead.length === p2_tokens.length) {
						end();
						alert("Player 1 has won the game!");
					}
				}
				$(t).remove();
				turns();
				reset_functions();
			});
		})(e);
	}
	for (e in moveto) {
		(function(e){
			var b = $("#"+square).children();
			$("#"+moveto[e]).off("click");
			$("#"+moveto[e]).on("click", function(){
				$("#"+moveto[e]).append(b);
				turns();
				$("#"+moveto[e]).off("click");
				reset_functions();
			});
		})(e);
	}
	setTimeout(function(){
		reset_moves();
	},1000);
};

function end(){
	var p2_tokens = ["#A2tok","#A4tok","#A6tok","#A8tok","#B1tok","#B3tok","#B5tok","#B7tok","#C2tok","#C4tok","#C6tok","#C8tok"];
	var p1_tokens = ["#F1tok","#F3tok","#F5tok","#F7tok","#G2tok","#G4tok","#G6tok","#G8tok","#H1tok","#H3tok","#H5tok","#H7tok"];
	if (game_started == false) {
		alert("Hit play first!");
	} else {
		for (e in p2_tokens){
			delete_token(p2_tokens[e]);
		}
		for (e in p1_tokens) {
			delete_token(p1_tokens[e]);
		}
		turn = true;
		p1_dead = [];
		p2_dead = [];
	}
}
function reset_functions() {
	var id = make_id();
	for (e in id){
		(function(e){
			$("#"+id[e]).off("click");
		})(e);
	}
	reset_moves();
	click_functions();
};

function click_functions() {
	id = make_id();
	for (e in id) {
		(function(e){
			$("#"+id[e]).on("click", function(){
				av_moves(id[e]);
			});
		})(e);
	}
};

make_checkers();
