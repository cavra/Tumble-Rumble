TumbleRumble.lobby = function(game) {};

// Global Variables
var socket;
var socketHandler;

var clientCount;
var checkClientCount = false;

TumbleRumble.lobby.prototype = {

	create: function() {
        console.log('Entered Lobby');

	    socket = io.connect();

	    // Initiate the socket handler
	    socketHandler = new SocketHandler(this.game);
	    socketHandler.setEventHandlers(this.game);
	},

	update: function() {
	    if (checkClientCount) {
		    if (clientCount > 1) {
				this.startGame();
		    }
		    else {
		    	// Display text on screen "Waiting for players..."
		    }
	    	checkClientCount = false;
	    }

	    // Display "Play solo" button
	},

	startGame: function() {
		this.state.start('stage');
	},

};