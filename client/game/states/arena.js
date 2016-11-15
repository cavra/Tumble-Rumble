TumbleRumble.arena = function(game) {};

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

    // Initiate the remote players handler
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
    map.setCollisionBetween(1, 1000, true, 'ground', false);
  },

  update: function () {
    // Update our player
    player.update();

    // Update all remote players
    remotePlayersHandler.update();
  },

};