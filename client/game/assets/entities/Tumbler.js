function Tumbler(game) {
    this.game = game;
}

Tumbler.prototype.create = function() {
    console.log('Creating Tumbleweed Texture');

    // Add the Tumbler's sprite and its animations
    this.playerSprite = myGame.add.sprite(200, 100, 'tumbleweed'); // Sometimes this doesn't work?
    this.playerSprite.animations.add('standing', [0], true);
    this.playerSprite.animations.add('tumble', [0, 1, 2, 3, 4, 5], 5, true);
    this.playerSprite.animations.play('tumble');

    // Tumbler's Physics
    this.game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
    this.playerSprite.anchor.set(0.5);
    this.playerSprite.body.allowGravity = true;
    this.playerSprite.body.gravity.y = 1500;
    this.playerSprite.body.maxVelocity.x = 300;
    this.playerSprite.body.maxVelocity.y = 800;
    //this.playerSprite.body.collideWorldBounds = true;
};

Tumbler.prototype.update = function() {
    // Too glitchy to use
    //this.game.physics.arcade.collide(this.playerSprite, player.tumbler.playerSprite);
};