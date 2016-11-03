TumbleRumble.arena = function(game) {
	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world,"
    //  or you'll over-write the world reference.
};

TumbleRumble.arena.prototype = {

	create: function() {

		this.music = this.add.audio('welcome_music', 0.5, true);
		this.music.play();

        this.buildWorld();
    	this.createPlayer();
	},

    buildWorld: function() {

        //the world
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        this.background = this.add.tileSprite(0, 0, 1000, 600, 'welcome_background');

        //tilemap
        map = this.game.add.tilemap('sample_arena');

        //the first parameter is the tileset name as specified in Tiled
        //the second is the key to the asset
        map.addTilesetImage('sample_1', '..\/..\/..\/..\/platformerGraphicsDeluxe_Updated\/Tiles\/tiles_spritesheet.png..\/..\/..\/..\/platformerGraphicsDeluxe_Updated\/Tiles\/tiles_spritesheet.png');
        map.addTilesetImage('sample2', '..\/..\/..\/..\/sheet1.png')

        //create layers
        outline = map.createLayer('Map Outline');

        //collision on blockedLayer
        map.setCollisionBetween(1, 1000, true, 'ground');
        map.setCollisionBetween(1, 1000, true, 'walls');
        map.setCollisionBetween(1, 1000, true, 'platforms');


    },

    createPlayer: function() {

        //create an instance for the player
        this.player = new Player(this.game); 
        
        //create the player
        this.player.create();
    },

	update: function() {
		
		this.player.update();
	},

};