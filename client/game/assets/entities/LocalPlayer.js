function LocalPlayer(game) {
    this.game = game;
};

LocalPlayer.prototype.create = function() {
    console.log('Creating Local Player', this);

    // Player's main sprite
    this.tumbler = new Tumbler(this.game);
    this.tumbler.create();

    // Player's health bar
    this.healthBar = new HealthBar(this.game);
    this.healthBar.create();
    this.tumbler.playerSprite.addChild(this.healthBar.healthBar);

    // Player's weapon
    this.weapon = new LocalWeapon(this.game);
    this.weapon.create();
    this.tumbler.playerSprite.addChild(this.weapon.katana);

    // Send local player data to the game server
    socket.emit('new player', {x: this.tumbler.playerSprite.x, y: this.tumbler.playerSprite.y});

    // Player's custom values
    this.alive = true;
    this.health = 100;
    this.player = this.tumbler.playerSprite;

    // Timers
    this.invincibleTimer = 0;
    this.tumbler.playerSprite.checkWorldBounds = true;
    this.tumbler.playerSprite.events.onOutOfBounds.add(this.die, this);

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //this.setPlayerControls(); // this might be easier on the client
};

LocalPlayer.prototype.update = function() {

    if (this.alive) {
        // Tell the server we are moving our player
        socket.emit('move player', {x: this.tumbler.playerSprite.x, y: this.tumbler.playerSprite.y});

        // Handle user input
        this.playerControls();
        this.playerPhysics();

        // Update the player components
        this.tumbler.update();
        this.weapon.update();

        // Handle death
        if (this.health <= 0) {
            this.die();
        }
    }
};

LocalPlayer.prototype.playerControls = function() {

     if (this.tumbler.playerSprite.angle < 0 && !this.tumbler.playerSprite.body.touching.down) {
            this.tumbler.playerSprite.angle += 1;
     }

    // Move Left
    if (this.cursors.left.isDown) {
        this.tumbler.playerSprite.body.acceleration.x = -1000
        this.tumbler.playerSprite.scale.x = 1;
        this.tumbler.playerSprite.animations.play('tumble');
    }
    // Move Right
    else if (this.cursors.right.isDown) {
        this.tumbler.playerSprite.body.acceleration.x = 1000;
        this.tumbler.playerSprite.scale.x = -1;
        this.tumbler.playerSprite.animations.play('tumble');
    }
    // Slow to a stop
    else {
        //slow the player to a stop
        this.tumbler.playerSprite.body.acceleration.x = 0;
        this.tumbler.playerSprite.body.drag.x = 2500;
        //this.tumbler.playerSprite.animations.play('standing');
    }

    // Jump (needs work)
    if (this.jumpButton.isDown) {
        this.tumbler.playerSprite.body.allowGravity = false;  
        this.tumbler.playerSprite.body.velocity.y = -480;
        this.game.add.tween(this.tumbler.playerSprite).to({angle: -30}, 100).start();
    }
    else {
        this.tumbler.playerSprite.body.allowGravity = true;
    }
};

LocalPlayer.prototype.playerPhysics = function (damage) {
    if (this.game.physics.arcade.collide(this.tumbler.playerSprite, cacti, null, null, this)) {
        this.takeDamage(10);
    };
};

LocalPlayer.prototype.takeDamage = function (damage) {
    // Timer is already running...
    if (this.invincibleTimer.seconds > 0.7) {
        // Kill the running timer
        this.invincibleTimer.destroy();
        
        // Decrement the health value
        this.health -= damage;
        this.tumbler.playerSprite.tint = 0x000000;
        console.log('LocalPlayer: was damaged for: ', damage, ' and has ', this.health, ' health left.');
        socket.emit('take damage', { health: this.health});
        this.healthBar.crop(this.health);
        
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
        console.log('LocalPlayer: was damaged for: ', damage, ' and has ', this.health, ' health left.');
        this.healthBar.crop(this.health);
        
        // Restart the timer
        this.invincibleTimer = this.game.time.create(false);
        this.invincibleTimer.start();

        // Remove the tint after the timer is up
        this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function() {this.tumbler.playerSprite.tint = 0xFFFFFF;}, this);
    }
};

LocalPlayer.prototype.die = function () {
    console.log('LocalPlayer died');

    // Tell the server we died
    socket.emit('kill player');
    someoneDied = true;

    this.alive = false;
    this.tumbler.playerSprite.body = null;
    this.tumbler.playerSprite.destroy(true); // true destroys children
    this.tumbler.playerSprite.kill();
};