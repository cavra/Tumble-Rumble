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

	create: function () {

        this.build_world();
    	
	},

    build_world: function () {

        //the world
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        this.background = this.add.tileSprite(0, 0, 1000, 600, 'preload_background');

        //tilemap
        map = this.game.add.tilemap('arena_1');

        //the first parameter is the tileset name as specified in Tiled
        //the second is the key to the asset
        map.addTilesetImage('Wood', 'tiles_spritesheet1');

        //create layers
        groundLayer = map.createLayer('ground');
        grassLayer = map.createLayer('grass');

        //collision on blockedLayer
        map.setCollisionBetween(1, 1000, true, 'ground');

    },

	update: function () {
	    
	},

};