$(document).ready(function() {
	players = [];
	wordArray = [];
	wordText = "";
	for(var i = 1; i < 3; i ++) {
		players[i] = new LetterpressPlayer();
		if(!players[i].registerUser("JavaScript players[" + i + "]")) {
			console.log("There was a problem registering players[" + i + "]");
		}
	}
	if(players[1].newGame()) {
		if(!players[2].joinGame(players[1].game["id"])) {
			console.log("There was a problem joining the game.");
		}
	} else {
		console.log("There was a problem creating the game.");
	}
	$.each(players[1].game["board"], function(indexRow, row) {
		$.each(row, function(indexColumn, column) {
			var cell = $("#game_board").children("tbody").children("tr.game_row").eq(indexRow).children("td.game_tile").eq(indexColumn);
			cell.html(players[1].game["board"][indexRow][indexColumn].letter);
			cell.addClass("owner_" + players[1].game["board"][indexRow][indexColumn].owner);
		});
	});

	$(".game_tile").click(function() {
		wordArray.push([$(this).parent()[0].rowIndex, this.cellIndex]);
		wordText += $(this).html();
		$("#word_preview").html(wordText);
	});

	$("#play_word_btn").click(function() {
		if(players[1].checkWord(wordText)) {
			if(!players[(players[1].game["current_turn"]) ? 1 : 2].playWord(wordArray)) {
				console.log("\"" + wordText + "\" is not a word.");
			}
		} else {
			console.log("\"" + wordText + "\" is not a word.");
		}
		wordArray = [];
		wordText = "";
		updateBoard();
	});

	function updateBoard() {
		players[1].checkGame();
		$.each(players[1].game["board"], function(indexRow, row) {
			$.each(row, function(indexColumn, column) {
				var cell = $("#game_board").children("tbody").children("tr.game_row").eq(indexRow).children("td.game_tile").eq(indexColumn)
				cell.removeClass("owner_0 owner_1 owner_2");
				cell.addClass("owner_" + players[1].game["board"][indexRow][indexColumn].owner);
			});
		});
	}
});
