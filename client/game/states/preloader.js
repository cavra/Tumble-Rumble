TumbleRumble.preloader = function(game) {};

TumbleRumble.preloader.prototype = {

	preload: function() {
        console.log('Preloading assets...');
		
		this.show_preload_screen();

		// Game States
		this.preload_menu();
		this.preload_lobby();
		this.preload_stage();
		this.preload_results();

		// Game Objects
		this.preload_stages();
		this.preload_player();
	},
	
	show_preload_screen: function() {

		// Has to be in preload, because it won't create the sprite otherwise
		this.background = this.add.sprite(0, 0, 'preload_background');
		this.loading_bar = this.add.sprite(this.game.world.centerX - 200, 500, 'loading_bar');
		
		// Loads a portion of the image corresponding to amount of assets loaded below
		this.load.setPreloadSprite(this.loading_bar);
	},

	preload_menu: function() {

		// Background
		this.load.image('menu_background', 'game/assets/textures/GUI/welcome_screen.png');
		
		// GUI
		this.load.spritesheet('menu_play_button', 'game/assets/textures/GUI/begin_button.png', 64, 23);
		
		// Music
		this.load.audio('menu_music', ['game/assets/sounds/welcome.wav']);	
	},
	
	preload_lobby: function() {
		// Background
		this.load.image('lobby_background', 'game/assets/textures/GUI/lobby_screen.png');
		
		// GUI
		this.load.spritesheet('lobby_play_button', 'game/assets/textures/GUI/begin_button.png', 64, 23);
		
		// Music
		this.load.audio('lobby_music', ['game/assets/sounds/welcome.wav']);		
	},

	preload_stage: function() {
	
	},

	preload_results: function() {
	
	},

	preload_stages: function() {
		
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

	preload_player: function() {
		// Player
		this.game.load.spritesheet('tumbleweed', 'game/assets/textures/player/tumbleweed.png', 64, 64);

		// Player items
	    this.load.atlasXML('weapon_katana', 'game/assets/textures/weapons/katana.png', 'game/assets/textures/weapons/katana.xml');
	},

	create: function() {

		// Once everything has been preloaded, stop cropping the preload bar
		this.loading_bar.cropEnabled = false;

	},

	update: function() {

		// If the music is ready to play, start the main menu
		if (this.cache.isSoundDecoded('menu_music')) {
			this.state.start('menu');
		}
	}

};