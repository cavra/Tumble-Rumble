function SocketHandler(game) {
    this.game = game;
};

var remotePlayers = [];

SocketHandler.prototype.setEventHandlers = function (game) {

    // Socket connection successful
    socket.on('connect', this.onSocketConnected);

    // Socket disconnection
    socket.on('disconnect', this.onSocketDisconnect);

    // New player message received
    socket.on('new player', this.onNewPlayer);

    // Player move message received
    socket.on('move player', this.onMovePlayer);

    // Player attack message received
    socket.on('take damage', this.onTakeDamage);

    // Player attack message received
    socket.on('attack player', this.onAttackPlayer);

    // Player death message received
    socket.on('kill player', this.onKillPlayer);

    // Player death message received
    socket.on('cactus door', this.onCactusDoor);

    // Player death message received
    socket.on('client count', this.onClientCount);

    // Player removed message received
    socket.on('remove player', this.onRemovePlayer);
};

SocketHandler.prototype.onSocketConnected = function () {
    console.log('Connected to socket server');

    // Reset remotePlayers on reconnect...?
    remotePlayers.forEach(function (remotePlayer) {
      remotePlayer.player.kill();
    })
    remotePlayers = [];

    // Send local player data to the game server
    socket.emit('new connection');
};

SocketHandler.prototype.onSocketDisconnect = function () {
    console.log('Disconnected from socket server');
};

SocketHandler.prototype.onNewPlayer = function (data) {
    console.log('New player connected:', data.id);

    // Avoid possible duplicate players
    var duplicate = playerById(data.id);
    if (duplicate) {
      console.log('Duplicate player!');
      return;
    }

    // Create the instance for the new player
    var newRemotePlayer = new RemotePlayer(myGame);
    newRemotePlayer.create(data.id, data.x, data.y);

    // Add new player to the remote players array
    remotePlayers.push(newRemotePlayer);
};

SocketHandler.prototype.onMovePlayer = function (data) {
    //console.log('onMove called on player:', data.id);
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Update player position using a tween for smooth motion
    myGame.add.tween(tempPlayer.player).to({x: data.x, y: data.y}, 20).start();
};

SocketHandler.prototype.onTakeDamage = function (data) {
    //console.log('Take Damage called on player: ', data.id);
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Damage the player
    tempPlayer.takeDamage(10);
};

SocketHandler.prototype.onAttackPlayer = function (data) {
    //console.log('onAttack called on player: ', data.id);
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Cause the player to attack
    tempPlayer.attack();
};

SocketHandler.prototype.onKillPlayer = function (data) {
    //console.log('onDamagePlayer called on player: ', data.id);
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Update player health
    tempPlayer.die();
};

SocketHandler.prototype.onRemovePlayer = function (data) {
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    console.log("Removing Player: ", data.id);
    tempPlayer.player.kill();

    // Remove player from array
    remotePlayers.splice(remotePlayers.indexOf(tempPlayer), 1);
};

SocketHandler.prototype.onCactusDoor = function (data) {
    //console.log('Cactus door number: ', data.door);
    door = data.door;
    addWall = true;
};

SocketHandler.prototype.onClientCount = function (data) {
    console.log("Number of clients: ", data.clientCount);
    clientCount = data.clientCount;
    checkClientCount = true;
};

SocketHandler.prototype.update = function () {
    // Update all remote players
    for (var i = 0; i < remotePlayers.length; i++) {
      remotePlayers[i].update();
    }
};

// // Prototypes don't return anything?
// SocketHandler.prototype.playerById = function (id) {
//   for (var i = 0; i < remotePlayers.length; i++) {
//     if (remotePlayers[i].name === id) {
//       return remotePlayers[i];
//     }
//   }
//   return false;
// };

function playerById (id) {
  for (var i = 0; i < remotePlayers.length; i++) {
    if (remotePlayers[i].name === id) {
      return remotePlayers[i];
    }
  }
  return false;
};