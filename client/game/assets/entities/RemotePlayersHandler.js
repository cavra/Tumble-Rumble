function RemotePlayersHandler(game) {
    this.game = game;
    remotePlayers = [];

    // var playerById = function (id) {
    //     for (var i = 0; i < remotePlayers.length; i++) {
    //         if (remotePlayers[i].name === id) {
    //             return remotePlayers[i];
    //             }
    //         }
    //     return false;
    // };
};

RemotePlayersHandler.prototype.setEventHandlers = function () {
    // Socket connection successful
    socket.on('connect', this.onSocketConnected);

    // Socket disconnection
    socket.on('disconnect', this.onSocketDisconnect);

    // New player message received
    socket.on('new player', this.onNewPlayer);

    // Player move message received
    socket.on('move player', this.onMovePlayer);

    // Player damage message received
    socket.on('damage player', this.onDamagePlayer);

    // Player attack message received
    socket.on('attack player', this.onAttackPlayer);

    // Player removed message received
    socket.on('remove player', this.onRemovePlayer);
};

RemotePlayersHandler.prototype.onSocketConnected = function () {
    console.log('Connected to socket server');

    // Reset remotePlayers on reconnect...?
    remotePlayers.forEach(function (remotePlayer) {
      remotePlayer.player.kill();
    })
    remotePlayers = [];

    // Send local player data to the game server
    socket.emit('new player', { x: player.x, y: player.y});
};

RemotePlayersHandler.prototype.onSocketDisconnect = function () {
    console.log('Disconnected from socket server');
};

RemotePlayersHandler.prototype.onNewPlayer = function (data) {
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

RemotePlayersHandler.prototype.onMovePlayer = function (data) {
    //console.log('onMove called on player:', data.id);
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Update player position
    tempPlayer.player.x = data.x;
    tempPlayer.player.y = data.y;
};

RemotePlayersHandler.prototype.onDamagePlayer = function (data) {
    //console.log('onDamagePlayer called on player: ', data.id);
    var tempPlayer = playerById(data.id);

    // Player not found
    if (!tempPlayer) {
      console.log('Player not found: ', data.id);
      return;
    }

    // Update player health
    tempPlayer.health = data.health;
};

RemotePlayersHandler.prototype.onAttackPlayer = function (data) {
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

RemotePlayersHandler.prototype.onRemovePlayer = function (data) {
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

RemotePlayersHandler.prototype.update = function () {
    // Update all remote players
    for (var i = 0; i < remotePlayers.length; i++) {
      remotePlayers[i].update();
    }
};

// // Prototypes don't return anything?
// RemotePlayersHandler.prototype.playerById = function (id) {
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