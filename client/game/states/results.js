TumbleRumble.results = function(game) {};

TumbleRumble.results.prototype = {

	init: function (isWinner) {   
		this.isWinner = isWinner;
	},
	
	create: function() {
        console.log('Entered Results');

	    var style = {
	        font: "32px Arial", 
	        fill: "#FFFFFF", 
	        align: "left", 
	        stroke: "black", 
	        strokeThickness: 3,
	        wordWrap: false,
	        wordWrapWidth: 100,
	        shadowOffsetX: 0,
	        shadowOffsetY: 0,
	        shadowColor: "black",
	        shadowBlur: 10
	    };

	    // Display the player's status (win or lose)
        if (this.isWinner) {	    
		    this.textWinner = this.game.add.text(this.game.width/2, this.game.height/2, 'You won!', style);
			this.textWinner.anchor.set(0.5);
        }
        else {
		    this.textLoser = this.game.add.text(this.game.width/2, this.game.height/2, 'You lost :(', style);
			this.textLoser.anchor.set(0.5);
        }

        // Add the event (8000 = 8 seconds)
		this.game.time.events.add(8000, this.exitResults, this);
	},

	exitResults: function() {
		socket.disconnect();
		this.state.start('boot', true, true);
	},

};