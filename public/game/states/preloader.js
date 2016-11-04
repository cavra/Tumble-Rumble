TumbleRumble.preloader = function(game) {

	this.background = null;
	this.loading_bar = null;
	
};

TumbleRumble.preloader.prototype = {

	preload: function() {
		
		// Game States
		this.preload_boot();
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
	
	preload_boot: function() {

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
		this.load.tilemap('map_level_0', 'game/assets/tilemaps/arena_0/arena_0.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles_spritesheet0', 'game/assets/tilemaps/arena_0/tiles_spritesheet.png');
		
		this.load.tilemap('arena_1', 'game/assets/tilemaps/arena_1/arena_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles_spritesheet1', 'game/assets/tilemaps/arena_1/tiles_spritesheet.png');

	},
	
	preload_player: function() {

		this.load.image('tumbleweed', 'game/assets/textures/player/tumbleweed.png');
	
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