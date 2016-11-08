function LocalPlayer(game) {
    this.game = game;
}

LocalPlayer.prototype.create = function() {
    console.log('Creating Local Player', this);

    // General values
    this.name = "MainUser";

    // Player's main sprite
    this.tumbler = new Tumbler(this.game);
    this.tumbler.create();

    // Player's weapon
    this.weapon = new WeaponKatana(this.game); 
    this.weapon.create();
    this.tumbler.playerSprite.addChild(this.weapon.katana);

    // Player's custom values
    this.alive = true;
    this.health = 100;
    this.playerState = "idle";

    // Player's location
    this.x = this.tumbler.x;
    this.y = this.tumbler.y;

    // Timers
    this.playerJumpTimer = 0;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.player = this.tumbler.playerSprite;
};

LocalPlayer.prototype.update = function() {

    // Handle user input
    this.playerControls();

    // Update the player components
    this.tumbler.update();
    this.weapon.update();

    // Update player's location
    this.x = this.tumbler.x;
    this.y = this.tumbler.y;

    // Handle death
    if (this.health <= 0 && this.alive) {
        console.log('Player died: ', this.name);
        this.alive = false;
        this.tumbler.playerSprite.body = null;
        this.tumbler.playerSprite.kill();
    }
};

LocalPlayer.prototype.playerControls = function() {

    if (this.playerState == "idle") {
        // default controls and physics
    }
    else if (this.playerState == "water") {
        // slow them down
    }
    else if (this.playerState == "hurt") {
        // needs to be invincible for a second or 2, and check if their health is less than 0
        // if it is, KILL them
    }
    else if (this.playerState == "attacking") {
        // slow them down and check if their attack lands
    }

    // Move Left
    if (this.cursors.left.isDown) {
        this.tumbler.playerSprite.body.acceleration.x = -1000
        this.tumbler.playerSprite.scale.x = 0.5;
        this.tumbler.playerSprite.animations.play('tumble');
    }
    // Move Right
    else if (this.cursors.right.isDown) {
        this.tumbler.playerSprite.body.acceleration.x = 1000;
        this.tumbler.playerSprite.scale.x = -0.5;
        this.tumbler.playerSprite.animations.play('tumble');
    }
    // Slow to a stop
    else {
        //slow the player to a stop
        this.tumbler.playerSprite.body.acceleration.x = 0;
        this.tumbler.playerSprite.body.drag.x = 2000;
        this.tumbler.playerSprite.animations.play('standing');
    }

    // Jump (needs work)
    if (this.cursors.up.isDown) {
        this.tumbler.playerSprite.body.allowGravity = false;  
        this.tumbler.playerSprite.body.velocity.y = -480;
    }
    else {
        this.tumbler.playerSprite.body.allowGravity = true;
    }

    if (this.health <= 0) {
        this.tumbler.playerSprite.kill();
    }
};