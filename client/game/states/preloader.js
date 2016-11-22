TumbleRumble.preloader = function(game) {};

TumbleRumble.preloader.prototype = {

	preload: function() {
        console.log('Preloading assets...');
		
		this.displayPreloader();

		// Game States
		this.preloadMenu();
		this.preloadLobby();
		this.preloadStage();
		this.preloadResults();

		// Game Objects
		this.preloadStages();
		this.preloadPlayer();
	},
	
	displayPreloader: function() {

		// Has to be in preload, because it won't create the sprite otherwise
		this.background = this.add.sprite(0, 0, 'preloadBackground');

		this.loadingBarBackground = this.add.sprite(this.game.world.centerX - 200, 500, 'loadingBarBackground');
    	this.loadingBarBackground.tint = 0xFFFFFF;

		this.loadingBar = this.add.sprite(this.game.world.centerX - 200, 500, 'loadingBar');
		
		// Loads a portion of the image corresponding to amount of assets loaded below
		this.load.setPreloadSprite(this.loadingBar);
	},

	preloadMenu: function() {

		// Background
		this.load.image('menuBackground', 'game/assets/textures/GUI/welcomeBackground.png');
		
		// GUI
		this.load.spritesheet('menuPlayButton', 'game/assets/textures/GUI/beginButton.png', 64, 23);
		
		// Music
		this.load.audio('menuMusic', ['game/assets/sounds/welcome.wav']);	
	},
	
	preloadLobby: function() {
		// Background
		this.load.image('lobbyBackground', 'game/assets/textures/GUI/lobbyBackground.png');
		
		// GUI
		this.load.spritesheet('lobbyPlayButton', 'game/assets/textures/GUI/beginButton.png', 64, 23);
		
		// Music
		this.load.audio('lobbyMusic', ['game/assets/sounds/welcome.wav']);		
	},

	preloadStage: function() {
		this.load.image('cactus', 'game/assets/textures/world/cactus.png');
	},

	preloadResults: function() {
	
	},

	preloadStages: function() {
		
		// Tilemaps		
		this.load.tilemap('arena1', 'game/assets/tilemaps/arena1/arena1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset1', 'game/assets/tilemaps/arena1/tileset1.png');
		this.load.image('arenaBackground1', 'game/assets/tilemaps/arena1/background.png');

		this.load.tilemap('arena2', 'game/assets/tilemaps/arena2/arena2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset2', 'game/assets/tilemaps/arena2/tileset1.png');
		this.load.image('arenaBackground2', 'game/assets/tilemaps/arena2/background.png');

		this.load.tilemap('arena3', 'game/assets/tilemaps/arena3/arena3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset3', 'game/assets/tilemaps/arena3/tileset1.png');
		this.load.image('arenaBackground3', 'game/assets/tilemaps/arena2/background.png');

		this.load.tilemap('arena4', 'game/assets/tilemaps/arena4/arena4.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset4', 'game/assets/tilemaps/arena4/tileset1.png');
		this.load.image('arenaBackground4', 'game/assets/tilemaps/arena2/background.png');

	},

	preloadPlayer: function() {
		// Player
		this.game.load.spritesheet('tumbleweed', 'game/assets/textures/player/tumbleweed.png', 64, 64);

		// Healthbar
		this.load.image('healthbar', 'game/assets/textures/GUI/healthBar.png');

		// Player items
	    this.load.atlasXML('weapon_katana', 'game/assets/textures/weapons/katana.png', 'game/assets/textures/weapons/katana.xml');
	},

	create: function() {

		// Once everything has been preloaded, stop cropping the preload bar
		this.loadingBar.cropEnabled = false;

	},

	update: function() {

		// If the music is ready to play, start the main menu
		if (this.cache.isSoundDecoded('menuMusic')) {
			this.state.start('menu');
		}
	}

};