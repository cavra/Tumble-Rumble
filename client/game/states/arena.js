TumbleRumble.arena = function(game) {
  //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;    //  a reference to the currently running game
    this.add;   //  used to add sprites, text, groups, etc
    this.camera;  //  a reference to the game camera
    this.cache;   //  the game cache
    this.input;   //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;    //  for preloading assets
    this.math;    //  lots of useful common math operations
    this.sound;   //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage;   //  the game stage
    this.time;    //  the clock
    this.tweens;    //  the tween manager
    this.state;     //  the state manager
    this.world;   //  the game world
    this.particles; //  the particle manager
    this.physics; //  the physics manager
    this.rnd;   //  the repeatable random number generator
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world,"
    //  or you'll over-write the world reference.
};

// Global Variables
var socket;

var player;
var remotePlayersHandler;
var remotePlayers;

var myGame; 

var groundLayer;

TumbleRumble.arena.prototype = {

  create: function() {
    console.log('Running Arena Game State');

    // Take care of basic stuff
    myGame = this.game;
    socket = io.connect();

    // Start the music
    this.music = this.add.audio('welcome_music', 0.5, true);
    this.music.play();

    // Build the world
    this.buildWorld();

    // Spawn the remote players, if there are any
    remotePlayersHandler = new RemotePlayersHandler(this.game, player);
    remotePlayersHandler.setEventHandlers();

    // Spawn the local player
    player = new LocalPlayer(this.game); 
    player.create();
  },

  buildWorld: function() {
    // We are using Arcade physics for our game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Background
    //this.background = this.add.tileSprite(0, 0, 1000, 600, 'welcome_background');

    // Tilemap
    map = this.game.add.tilemap('arena1');

    // Map the correct tileset image to the tilemap
    // The first parameter is the tileset name as specified in Tiled
    // The second is the key to the asset
    map.addTilesetImage('tileset1', 'tileset1');

    // Create tilemap layers
    groundLayer = map.createLayer('ground');
    map.setCollisionBetween(1, 1000, true, 'ground');
  },

  update: function () {
    // Update our player
    player.update();

    // Update all remote players
    remotePlayersHandler.update();
  },

};