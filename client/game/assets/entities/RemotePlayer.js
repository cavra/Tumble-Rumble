function RemotePlayer(game) {
    this.game = game;

    // Create the group
    this.remotePlayersGroup = this.game.add.group();
};

RemotePlayer.prototype.create = function (index, x, y) {
	console.log('Creating Remote Player', this);

	// General Values
	this.name = index.toString();

    // Player's main sprite
    this.tumbler = new Tumbler(this.game);
    this.tumbler.create();

    // Player's weapon
    this.weapon = new RemoteWeapon(this.game); 
    this.weapon.create();
    this.tumbler.playerSprite.addChild(this.weapon.katana);

    // Player's custom values
    this.alive = true;
    this.health = 100;
    this.playerState = "idle";
    this.invincibleTimer = 0;

    // Player's location
    this.x = this.tumbler.x;
    this.y = this.tumbler.y;
    this.lastX = this.tumbler.x;
    this.lastY = this.tumbler.y;

    this.player = this.tumbler.playerSprite;
    this.hitbox = this.tumbler.playerSprite;

};

RemotePlayer.prototype.update = function () {

	// Update the player components
	this.tumbler.update();
    this.weapon.update();

    // Update player's location
    this.x = this.tumbler.x;
    this.y = this.tumbler.y;

    // Update the player's facing direction
    if (this.lastX != this.x) {
        if (this.lastX > this.x) {
            this.tumbler.playerSprite.scale.x = 0.5;
        }
        else {
            this.tumbler.playerSprite.scale.x = -0.5;
        }
        this.lastX = this.x;
        this.lastY = this.y;
    }
};

RemotePlayer.prototype.damage = function (damage) {
    // Timer is already running...
    if (this.invincibleTimer.seconds > 0.7) {
        this.invincibleTimer.destroy();
        
        // Decrement the health value
        this.health -= damage;
        console.log('Player: ', this.name, ' was damaged for: ', damage, ' and has ', this.health, ' health left.');
        
        // Tell the server we are damaging the other player
        socket.emit('damage player', { health: this.health});

        // Restart the timer
        this.invincibleTimer = this.game.time.create(false);
        this.invincibleTimer.start();
    }
    // Timer is not running (first case only)
    else if (!this.invincibleTimer.running) {

        // Decrement the health value
        this.health -= damage;
        console.log('Player: ', this.name, ' was damaged for: ', damage, ' and has ', this.health, ' health left.');
        
        // Tell the server we are damaging the other player
        socket.emit('damage player', { health: this.health});

        this.invincibleTimer = this.game.time.create(false);
        this.invincibleTimer.start();
    }
};

RemotePlayer.prototype.attack = function () {
    console.log('Player: ', this.name, ' is attacking.');
    this.weapon.attack();
};

RemotePlayer.prototype.die = function () {
    console.log('Player died: ', this.name);
    this.alive = false;
    this.tumbler.playerSprite.body = null;
    this.tumbler.playerSprite.kill();
};

window.RemotePlayer = RemotePlayer;