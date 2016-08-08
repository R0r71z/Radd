
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
	if (game_started == false) {
		alert("Hit play first!");
	} else {
		id = make_id();
		for (e in id){
			$(id[e]).remove();
			tokenSquares();
		}
	}
};

function reset_moves() {
	id = make_id();
	for (e in id) {
		$("#"+id[e]).css("-webkit-box-shadow", "none");
	}
}

var av_moves = function(token) {
	var moves = {
	}
	for (e in moves) {
		if (e == token) {
			for (a in moves[e]) {
				if ($("#"+moves[e][a]).is(":empty")){
					i = document.getElementById(moves[e][a]);
					$(i).css("-webkit-box-shadow", "inset 0px 0px 0px 5px blue");
					setTimeout(function(){
					reset_moves();
					}, 1500);
				}
			}
		}
	}
}

function click_functions() {
	$("#A2tok").click(function(){
		av_moves("A2tok");
	});
	$("#A4tok").click(function(){
		av_moves("A2tok");
	});
	$("#A6tok").click(function(){
		av_moves("A6tok");
	});
	$("#A8tok").click(function(){
		av_moves("A8tok");
	});
	$("#B1tok").click(function(){
		av_moves("B8tok");
	});
	$("#B3tok").click(function(){
		av_moves("B3tok");
	});
	$("#B5tok").click(function(){
		av_moves("B5tok");
	});
	$("#B7tok").click(function(){
		av_moves("B7tok");
	});
	$("#C2tok").click(function(){
		av_moves("C2tok");
	});
	$("#C4tok").click(function(){
		av_moves("C4tok");
	});
	$("#C6tok").click(function(){
		av_moves("C6tok");
	});
	$("#C8tok").click(function(){
		av_moves("C8tok");
	});
	$("#F1tok").click(function(){
		av_moves("F1tok");
	});
	$("#F3tok").click(function(){
		av_moves("F3tok");
	});
	$("#F5tok").click(function(){
		av_moves("F5tok");
	});
	$("#F7tok").click(function(){
		av_moves("F7tok");
	});
	$("#G2tok").click(function(){
		av_moves("G2tok");
	});
	$("#G4tok").click(function(){
		av_moves("G4tok");
	});
	$("#G6tok").click(function(){
		av_moves("G6tok");
	});
	$("#G8tok").click(function(){
		av_moves("G8tok");
	});
	$("#H1tok").click(function(){
		av_moves("H1tok");
	});
	$("#H3tok").click(function(){
		av_moves("H3tok");
	});
	$("#H5tok").click(function(){
		av_moves("H5tok");
	});
	$("#H7tok").click(function(){
		av_moves("H7tok");
	});
};

click_functions();
make_checkers();
