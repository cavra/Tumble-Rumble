function Player(game) {
    this.game = game;
}

Player.prototype.create = function() {
    console.log('Creating Local Player');

    this.player = this.game.add.sprite(200, 100, 'tumbleweed');

    // Apperance
    this.player.scale.setTo(0.3, 0.3);

    // Physics
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.anchor.set(0.5);
    this.player.body.allowGravity = true;
    this.player.body.maxVelocity.x = 375;
    this.player.body.maxVelocity.y = 1000;
    this.player.body.gravity.y = 1000;

    // Location
    this.x = this.player.x;
    this.y = this.player.y;

    // Timers
    this.playerJumpTimer = 0;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Player.prototype.update = function() {

    // These are called by the Arena's update function
    this.playerControls();
    this.playerPhysics();

    // Leep location updated, accounting for anchor displacement
    this.x = this.player.x;
    this.y = this.player.y;
};

Player.prototype.playerControls = function() {

    // Move Left
    if (this.cursors.left.isDown) {
        this.player.body.acceleration.x = -1000
        this.player.scale.x = 0.3;
    }
    // Move Right
    else if (this.cursors.right.isDown) {
        this.player.body.acceleration.x = 1000;
        this.player.scale.x = -0.3;
    }
    // Slow to a stop
    else {
        //slow the player to a stop
        this.player.body.acceleration.x = 0;
        this.player.body.drag.x = 2000;
    }

    // Jump (needs work)
    if (this.cursors.up.isDown) {
        this.player.body.allowGravity = false;
        this.player.body.velocity.y = -480;
    }
    else {
        this.player.body.allowGravity = true;
    }
};

Player.prototype.playerPhysics = function() {
    
    // World
    this.game.physics.arcade.collide(this.player, groundLayer);
    
};
