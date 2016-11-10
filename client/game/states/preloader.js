TumbleRumble.preloader = function(game) {

	this.background = null;
	this.loading_bar = null;
	
};

TumbleRumble.preloader.prototype = {

	preload: function() {
		
		this.show_preload_screen();

		// Game States
		this.preload_welcome();
		this.preload_lobby();
		this.preload_selection();
		this.preload_arena();
		this.preload_results();
		this.preload_settings();

		// Game Objects
		this.preload_arenas();
		this.preload_player();

	},
	
	show_preload_screen: function() {

		// Has to be in preload, because it won't create the sprite otherwise
		this.background = this.add.sprite(0, 0, 'preload_background');
		this.loading_bar = this.add.sprite(this.game.world.centerX - 200, 500, 'loading_bar');
		
		// Loads a portion of the image corresponding to amount of assets loaded below
		this.load.setPreloadSprite(this.loading_bar);
	
	},

	preload_welcome: function() {

		// Background
		this.load.image('welcome_background', 'game/assets/textures/GUI/welcome_screen.png');
		
		// GUI
		this.load.spritesheet('welcome_play_button', 'game/assets/textures/GUI/begin_button.png', 64, 23);
		
		// Music
		this.load.audio('welcome_music', ['game/assets/sounds/welcome.wav']);	
	},

	preload_lobby: function() {
	
	},
	
	preload_selection: function() {
	
	},

	preload_arena: function() {
	
	},

	preload_results: function() {
	
	},

	preload_settings: function() {
	
	},

	preload_arenas: function() {
		
		// Tilemaps		
		this.load.tilemap('arena1', 'game/assets/tilemaps/arena1/arena1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset1', 'game/assets/tilemaps/arena1/tileset1.png');

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
		if (this.cache.isSoundDecoded('welcome_music'))
		{
			this.state.start('welcome');
		}
	}

};