TumbleRumble.welcome = function(game) {

	this.music = null;
	this.play_button = null;
	this.play_rectangle = null;

};

TumbleRumble.welcome.prototype = {

	create: function() {

		//background
		this.add.sprite(0, 0, 'welcome_background');
		
		//audio
		this.music = this.add.audio('welcome_music', 0.5, true);
		this.music.play();
		
		this.create_buttons();
		
	},
	
	create_buttons: function() {
		
		//button
		this.play_button = this.add.button(600, 470, 'welcome_play_button', this.start_game, this, 1, 0, 0);
	    this.play_button.scale.set(3);
	    this.play_button.buttonMode = true;
		//this.playButton.setOverSound(sound, marker);

		//rectangle for button
	    this.play_rectangle = new Phaser.Rectangle(this.play_button.x, this.play_button.y, this.play_button.width, this.play_button.height);

	},

	update: function() {

		this.play_button.bringToTop()

	},

	start_game: function(pointer) {
	
		this.music.stop();
		this.state.start('lobby');
	}

};