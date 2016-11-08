function Tumbler(game) {
    this.game = game;
}

Tumbler.prototype.create = function() {
    console.log('Creating Tumbleweed Texture');

    // Add the Tumbler's sprite and its animations
    this.playerSprite = this.game.add.sprite(200, 100, 'tumbleweed');
    this.playerSprite.animations.add('standing', [0], true);
    this.playerSprite.animations.add('tumble', [0, 1, 2, 3, 4, 5], 5, true);
    this.playerSprite.animations.play('standing');

    // Tumbler's Apperance
    this.playerSprite.scale.setTo(0.5, 0.5);

    // Tumbler's Physics
    this.game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
    this.playerSprite.body.collideWorldBounds = true;
    this.playerSprite.anchor.set(0.5);
    this.playerSprite.body.allowGravity = true;
    this.playerSprite.body.gravity.y = 1000;
    this.playerSprite.body.maxVelocity.x = 375;
    this.playerSprite.body.maxVelocity.y = 1000;

    // Keep track of location
    this.x = this.playerSprite.x;
    this.y = this.playerSprite.y;

    // Timers
    this.tumblerJumpTimer = 0;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Tumbler.prototype.update = function() {

    // Update sprites's location
    this.x = this.playerSprite.x;
    this.y = this.playerSprite.y;

    // World
    this.game.physics.arcade.collide(this.playerSprite, groundLayer);
    
};