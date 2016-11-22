TumbleRumble.menu = function(game) {};

TumbleRumble.menu.prototype = {

	create: function() {
        console.log('Entered Menu');

		// Background
		this.add.sprite(0, 0, 'menuBackground');
		
		// Music
		this.music = this.add.audio('menuMusic', 0.5, true);
		this.music.play();
		
		// Create all UI buttons
		this.createButtons();
		
	},
	
	createButtons: function() {
		
		// Button
		this.playButton = this.add.button(600, 470, 'menuPlayButton', this.startLobby, this, 1, 0, 0);
	    this.playButton.scale.set(3);
	    this.playButton.buttonMode = true;

		// Rectangle for button (forgot what this does?)
	    this.playButtonHitBox = new Phaser.Rectangle(this.playButton.x, this.playButton.y, this.playButton.width, this.playButton.height);

	},

	startLobby: function(pointer) {
		this.music.stop();
		this.state.start('lobby');
	}

};