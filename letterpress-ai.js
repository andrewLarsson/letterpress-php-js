/*Constants*/
var LETTERPRESS_API = "http://letterpress-php.tk/api/";
var API_CALL = [];
API_CALL["user"] = "auth.json";
API_CALL["game"] = "game.json";

function LetterpressPlayer() {
	/*Contains all the variables and methods required to construct a player for Letterpress using the Letterpress-PHP API.*/
	/*Built using jQuery 1.8.3*/
	/*Copyright 2013 Andrew Larsson*/

	//Strict mode is enabled to ensure 'this' is used properly throughout.
	"use strict";

	//Store this constructor class in a variable, so public methods can be called from private functions.
	var self = this;

	/*Private Variables*/
	var dictionary = [];

	/*Public Properties*/
	this.version = "0.1";
	this.username = "";
	this.token = "";
	this.game = {};

	/*Constructor*/
	var __construct = function() {
		/*Initializes variables.*/

		dictionary = getDictionary();
	}

	/*Public Methods*/
	this.registerUser = function(username) {
		var response = api(API_CALL["user"], "register", {"username": username});
		if(response["status"] != 0) {
			return false;
		}
		self.token = response["data"]["user"]["token"];
		self.username = response["data"]["user"]["username"]
		return true;
	}

	this.authenticateUser = function(token) {
		var response = api(API_CALL["user"], "authenticate", {"token": token});
		if(response["status"] != 0) {
			return false;
		}
		self.token = response["data"]["user"]["token"];
		self.username = response["data"]["user"]["username"]
		return true;
	}

	this.newGame = function() {
		var response = api(API_CALL["game"], "new", {"token": self.token});
		if(response["status"] != 0) {
			return false;
		}
		self.game = response["data"]["game"];
		return true;
	}

	this.joinGame = function(gameID) {
		var response = api(API_CALL["game"], "join", {"token": self.token, "game_id": gameID});
		if(response["status"] != 0) {
			return false;
		}
		self.game = response["data"]["game"];
		return true;
	}

	this.checkGame = function() {
		var response = api(API_CALL["game"], "check", {"token": self.token, "game_id": self.game["id"]});
		if(response["status"] != 0) {
			return false;
		}
		self.game = response["data"]["game"];
		return true;
	}

	this.checkWord = function(word) {
		if(dictionary.indexOf(word) > -1) {
			return true;
		} else {
			return false;
		}
	}

	this.playWord = function(wordJSON) {
		var response = api(API_CALL["game"], "play", {"token": self.token, "game_id": self.game["id"], "word": JSON.stringify(wordJSON)});
		if(response["status"] != 0) {
			return false;
		}
		self.game = response["data"]["game"];
		return true;
	}

	this.skipTurn = function() {
		var response = api(API_CALL["game"], "skip", {"token": self.token, "game_id": self.game["id"]});
		if(response["status"] != 0) {
			return false;
		}
		self.game = response["data"]["game"];
		return true;
	}

	this.resignGame = function() {
		var response = api(API_CALL["game"], "resign", {"token": self.token, "game_id": self.game["id"]});
		if(response["status"] != 0) {
			return false;
		}
		self.game = response["data"]["game"];
		return true;
	}

	/*Private Functions*/
	var api = function(apiCall, action, parameters) {
		var response = {};
		var apiURL = LETTERPRESS_API + apiCall + "?" + action;
		$.each(parameters, function(key, value) {
			apiURL += ("&" + key + "=" + value);
		});
		var apiAJAX = $.ajax({
			url: apiURL,
			dataType: "json",
			async: false,
			success: function(result) {
				response = result;
			},
			error: function(error) {
				console.log(error);
			}
		});
		return response;
	}

	var getDictionary = function() {
		var returnDictionary = [];
		$.ajax({
			url: LETTERPRESS_API + "resources/dictionary/dictionary.txt",
			async: false,
			success: function(result) {
				returnDictionary = result.split("\n");
			},
			error: function(error) {
				console.log(error);
			}
		});
		return returnDictionary;
	}

	/*Initialization Call*/
	__construct();
}

function LetterpressAI() {
	/*Contains all the variables and methods required to construct an AI to play Letterpress using the Letterpress-PHP API through the Letterpress-PHP JavaScript frontend API.*/
	/*Built using jQuery 1.8.3*/
	/*Copyright 2013 Andrew Larsson*/

	//Strict mode is enabled to ensure 'this' is used properly throughout.
	"use strict";

	//Store this constructor class in a variable, so public methods can be called from private functions.
	var self = this;

	/*Private Variables*/

	/*Public Properties*/
	this.version = "0.1";

	/*Constructor*/
	var __construct = function() {
		/*Initializes variables*/

	}

	/*Public Methods*/

	/*Private Functions*/

	/*Initialization Call*/
	__construct();
}
