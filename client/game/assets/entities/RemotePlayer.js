function RemotePlayer(game) {
    this.game = game;
};

RemotePlayer.prototype.create = function (index, x, y) {
	console.log('Creating Remote Player', this);

	// General Values
	this.name = index.toString();

    // Player's main sprite
    this.tumbler = new Tumbler(this.game);
    this.tumbler.create();

    // Player's custom values
    this.alive = true;
    this.health = 100;
    this.playerState = "idle";
    this.invincibleTimer = 0;

    // Player's location
    this.x = this.tumbler.playerSprite.x;
    this.y = this.tumbler.playerSprite.y;
    this.lastX = this.x;
    this.lastY = this.y;

    this.player = this.tumbler.playerSprite;
};

RemotePlayer.prototype.update = function () {

	// Update the player components
	this.tumbler.update();

    // Update player's location
    this.x = this.tumbler.playerSprite.x;
    this.y = this.tumbler.playerSprite.y;

    // Update the player's facing direction
    if (this.lastX != this.x) {
        if (this.lastX > this.x) {
            this.tumbler.playerSprite.scale.x = 1;
        }
        else {
            this.tumbler.playerSprite.scale.x = -1;
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