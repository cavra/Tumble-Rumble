function RemotePlayer(game) {
    this.game = game;
};

RemotePlayer.prototype.create = function (index, player, x, y) {
  console.log('Creating Remote Player', player);
  
  this.name = index.toString();
  this.player = player;

  this.player = this.game.add.sprite(x, y, 'tumbleweed');
  this.game.physics.arcade.enable(this.player);

  // Apperance
  this.player.scale.setTo(0.5, 0.5);
  this.player.anchor.set(0.5);

  // Custom values
  this.health = 100;

  this.lastPosition = { 
    x: x, 
    y: y
  };

};

RemotePlayer.prototype.update = function () {
  this.lastPosition.x = this.player.x;
  this.lastPosition.y = this.player.y;

  if (this.health <= 0) {
    console.log('Player died: ', this.name);
    this.player.body = null;
    this.player.kill();
  }

};

window.RemotePlayer = RemotePlayer;
