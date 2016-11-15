function LocalPlayer(game) {
    this.game = game;
};

LocalPlayer.prototype.create = function() {
    console.log('Creating Local Player', this);

    // General values
    this.name = "MainUser";

    // Player's main sprite
    this.tumbler = new Tumbler(this.game);
    this.tumbler.create();

    // Player's weapon
    this.weapon = new LocalWeapon(this.game); 
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
    this.invincibleTimer = 0;

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.player = this.tumbler.playerSprite;
};

LocalPlayer.prototype.update = function() {

    if (this.alive) {
        // Tell the server we are moving our player
        socket.emit('move player', { x: player.x, y: player.y});

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
    }
};

LocalPlayer.prototype.playerControls = function() {

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
        this.tumbler.playerSprite.body.drag.x = 2500;
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
    
    // Handle death
    if (this.health <= 0) {
        this.die();
    }
};

LocalPlayer.prototype.takeDamage = function (damage) {
    // Timer is already running...
    if (this.invincibleTimer.seconds > 0.7) {
        // Kill the running timer
        this.invincibleTimer.destroy();
        
        // Decrement the health value
        this.health -= damage;
        this.tumbler.playerSprite.tint = 0x000000;
        console.log('Player: ', this.name, ' was damaged for: ', damage, ' and has ', this.health, ' health left.');
        
        // Restart the timer
        this.invincibleTimer = this.game.time.create(false);
        this.invincibleTimer.start();

        // Remove the tint after the timer is up
        this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function() {this.tumbler.playerSprite.tint = 0xFFFFFF;}, this);
    }
    // Timer is not running (first case only)
    else if (!this.invincibleTimer.running) {
        // Decrement the health value
        this.health -= damage;
        this.tumbler.playerSprite.tint = 0x000000;
        console.log('Player: ', this.name, ' was damaged for: ', damage, ' and has ', this.health, ' health left.');
        
        // Restart the timer
        this.invincibleTimer = this.game.time.create(false);
        this.invincibleTimer.start();

        // Remove the tint after the timer is up
        this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function() {this.tumbler.playerSprite.tint = 0xFFFFFF;}, this);
    }
};

LocalPlayer.prototype.die = function () {
    console.log('Player died: ', this.name);

    // Tell the server we died
    socket.emit('kill player');

    this.alive = false;
    this.tumbler.playerSprite.body = null;
    this.tumbler.playerSprite.destroy(true); // true destroys children
    this.tumbler.playerSprite.kill();
};