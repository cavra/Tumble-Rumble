function RemotePlayer(game) {
    this.game = game;
};

RemotePlayer.prototype.create = function (index, player, x, y) {
  console.log('Creating Remote Player', player);
  
  this.name = index.toString();
  this.player = player;

  this.player = this.game.add.sprite(x, y, 'tumbleweed');

  // Apperance
  this.player.scale.setTo(0.3, 0.3);
  this.player.anchor.set(0.5);

  this.lastPosition = { 
    x: x, 
    y: y
  };

};

RemotePlayer.prototype.update = function () {
  this.lastPosition.x = this.player.x;
  this.lastPosition.y = this.player.y;
};

window.RemotePlayer = RemotePlayer;
