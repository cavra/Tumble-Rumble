TumbleRumble.arena = function(game) {};

// Global Variables
var socket;
var myGame; 

var remotePlayersHandler;
var remotePlayers;
var player;

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
    tilemapHandler = new TilemapHandler(this.game);
    tilemapHandler.buildArena2();

    // Initiate the remote players handler
    remotePlayersHandler = new RemotePlayersHandler(this.game, player);
    remotePlayersHandler.setEventHandlers();

    // Spawn the local player
    player = new LocalPlayer(this.game);
    player.create();
  },

  update: function () {
    // Update our player
    player.update();

    // Update all remote players
    remotePlayersHandler.update();
  },

};