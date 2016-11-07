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
var remotePlayers;

var myGame; 

TumbleRumble.arena.prototype = {

  create: function() {
    console.log('Running Arena Game State');

    myGame = this.game;

    socket = io.connect();

    this.music = this.add.audio('welcome_music', 0.5, true);
    this.music.play();

    this.buildWorld();
    this.createRemotePlayers();
    this.createPlayer();
  },

  buildWorld: function() {
    // World
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Background
    //this.background = this.add.tileSprite(0, 0, 1000, 600, 'welcome_background');

    // Tilemap
    map = this.game.add.tilemap('arena1');

    // The first parameter is the tileset name as specified in Tiled
    // The second is the key to the asset
    map.addTilesetImage('tileset1', 'tileset1');

    // Create layers
    groundLayer = map.createLayer('ground');

    // Collision on blockedLayer
    map.setCollisionBetween(1, 1000, true, 'ground');
  },

  createPlayer: function() {

    // Create an instance for the player
    player = new Player(this.game, remotePlayers); 
    
    // Create the player
    player.create();
  },

  createRemotePlayers: function() {
    remotePlayers = [];

    // Start listening for events
    this.setEventHandlers();
  },


  setEventHandlers: function() {
    // Socket connection successful
    socket.on('connect', this.onSocketConnected);

    // Socket disconnection
    socket.on('disconnect', this.onSocketDisconnect);

    // New player message received
    socket.on('new player', this.onNewPlayer);

    // Player move message received
    socket.on('move player', this.onMovePlayer);

    // Player removed message received
    socket.on('remove player', this.onRemovePlayer);
  },

  // Socket connected
  onSocketConnected: function () {
    console.log('Connected to socket server');

    // Reset remotePlayers on reconnect
    remotePlayers.forEach(function (enemy) {
      enemy.player.kill();
    })
    remotePlayers = [];

    // Send local player data to the game server
    socket.emit('new player', { x: player.x, y: player.y});
  },

  // Socket disconnected
  onSocketDisconnect: function () {
    console.log('Disconnected from socket server');
  },

  // New player
  onNewPlayer: function (data) {
    console.log('New player connected:', data.id);

    // Avoid possible duplicate players
    var duplicate = playerById(data.id);
    if (duplicate) {
      console.log('Duplicate player!');
      return;
    }

    // Create the instance for the new player
    var newRemotePlayer = new RemotePlayer(myGame);
    newRemotePlayer.create(data.id, player, data.x, data.y);

    // Add new player to the remote players array
    remotePlayers.push(newRemotePlayer);
  },

  // Move player
  onMovePlayer: function (data) {
    var movePlayer = playerById(data.id);

    // Player not found
    if (!movePlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Update player position
    movePlayer.player.x = data.x;
    movePlayer.player.y = data.y;
  },

  // Remove player
  onRemovePlayer: function (data) {
    var removePlayer = playerById(data.id);

    // Player not found
    if (!removePlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    removePlayer.player.kill();

    // Remove player from array
    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
  },

  update: function () {

    // Update our player
    player.update();
    socket.emit('move player', { x: player.x, y: player.y});

    // Update all other players
    for (var i = 0; i < remotePlayers.length; i++) {
      if (remotePlayers[i].alive) {
        remotePlayers[i].update();
        this.game.physics.arcade.collide(player, remotePlayers[i].player);
      }
    }
  },

}

// Find player by ID
function playerById (id) {
  for (var i = 0; i < remotePlayers.length; i++) {
    if (remotePlayers[i].name === id) {
      return remotePlayers[i];
    }
  }
  return false;
}