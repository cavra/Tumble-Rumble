function Player(game) {
    this.game = game;
}

Player.prototype.create = function() {
    console.log('Creating Local Player');

    // Add the Player sprite and its animations
    this.player = this.game.add.sprite(200, 100, 'tumbleweed');
    this.player.animations.add('standing', [0], true);
    this.player.animations.add('tumble', [0, 1, 2, 3, 4, 5], 5, true);
    this.player.animations.play('standing');

    // Player's Apperance
    this.player.scale.setTo(0.5, 0.5);

    // Player's Physics
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.anchor.set(0.5);
    this.player.body.allowGravity = true;
    this.player.body.maxVelocity.x = 375;
    this.player.body.maxVelocity.y = 1000;
    this.player.body.gravity.y = 1000;

    // Player's Weapons and their animations
    this.katana = this.game.add.sprite(null, null, 'weapon_katana');
    this.katana.animations.add('float', Phaser.Animation.generateFrameNames('Katana', 1, 1), 5, true);
    this.katana.animations.add('swing', Phaser.Animation.generateFrameNames('Katana', 1, 4), 10, true);
    this.katana.animations.play('swing');

    // Weapon's Appearance
    this.katana.scale.setTo(-0.5, 0.5);

    // Weapon's physics
    this.game.physics.arcade.enable(this.katana);
    this.katana.body.moves = false;
    this.katana.anchor.setTo(0.2, 0.8);
    
    // Add the weapon to the player, and set relative position
    this.player.addChild(this.katana);
    this.katana.x = -50;
    this.katana.y = 0;

    // Keep track of the player's location Location
    this.x = this.player.x;
    this.y = this.player.y;

    // Timers
    this.playerJumpTimer = 0;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Player.prototype.update = function() {

    // This is called by the Arena's update function
    this.playerControls();
    this.playerPhysics();

    // Keep the player's location updated
    this.x = this.player.x;
    this.y = this.player.y;
};

Player.prototype.playerControls = function() {

    // Move Left
    if (this.cursors.left.isDown) {
        this.player.body.acceleration.x = -1000
        this.player.scale.x = 0.5;
        this.player.animations.play('tumble');
    }
    // Move Right
    else if (this.cursors.right.isDown) {
        this.player.body.acceleration.x = 1000;
        this.player.scale.x = -0.5;
        this.player.animations.play('tumble');
    }
    // Slow to a stop
    else {
        //slow the player to a stop
        this.player.body.acceleration.x = 0;
        this.player.body.drag.x = 2000;
        this.player.animations.play('standing');
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
