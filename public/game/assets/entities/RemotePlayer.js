function RemotePlayer(game) {
    this.game = game;
};

RemotePlayer.prototype.create = function (index, player, x, y) {
  console.log('Creating Remote Player', player);
  
  this.name = index.toString();
  this.health = 3;
  this.player = player;
  this.alive = true;

  this.player = this.game.add.sprite(x, y, 'tumbleweed');

  // Apperance
  this.player.scale.setTo(0.3, 0.3);

  this.lastPosition = { 
    x: x, 
    y: y
  };

};

RemotePlayer.prototype.update = function () {
  if (this.player.x !== this.lastPosition.x || this.player.y !== this.lastPosition.y) {
    this.player.rotation = Math.PI + this.game.physics.arcade.angleToXY(this.player, this.lastPosition.x, this.lastPosition.y);
  } 

  this.lastPosition.x = this.player.x;
  this.lastPosition.y = this.player.y;
};

window.RemotePlayer = RemotePlayer;
