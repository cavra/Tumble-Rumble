TumbleRumble.lobby = function(game) {

};

TumbleRumble.lobby.prototype = {

	create: function() {

	},

	update: function() {


	},

	start_game: function(pointer) {
	
		this.state.start('selection');
	}

};