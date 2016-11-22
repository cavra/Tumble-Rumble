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

		// Background
		this.add.sprite(0, 0, 'lobbyBackground');
		
		// Music
		this.music = this.add.audio('lobbyMusic', 0.5, true);
		this.music.play();

	    this.createText();
	    this.createButtons();
	},

	createText: function () {
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

		this.textWait = this.game.add.text(this.game.width/2, this.game.height/2, 'Waiting for other players to join...', style);
		this.textWait.anchor.set(0.5);

		this.textSolo = this.game.add.text(600, 450, 'Or play Solo', style);
		this.textSolo.anchor.set(0.5);
	},

	createButtons: function() {
		// Button
		this.playButton = this.add.button(600, 470, 'lobbyPlayButton', this.startGame, this, 1, 0, 0);
	    this.playButton.scale.set(3);
	    this.playButton.buttonMode = true;

		// Rectangle for button (forgot what this does?)
	    this.playButtonHitBox = new Phaser.Rectangle(this.playButton.x, this.playButton.y, this.playButton.width, this.playButton.height);
	},

	update: function() {
	    if (checkClientCount) {
		    if (clientCount > 1) {
				this.startGame();
		    }
	    	checkClientCount = false;
	    }
	},

	startGame: function() {
		this.music.stop();
		this.state.start('stage');
	},

};