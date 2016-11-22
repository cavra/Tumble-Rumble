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

    // Player's health bar
    this.healthBar = new HealthBar(this.game);
    this.healthBar.create();
    this.tumbler.playerSprite.addChild(this.healthBar.healthBar);

    // Player's custom values
    this.alive = true;
    this.health = 100;

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

RemotePlayer.prototype.takeDamage = function (damage) {
    // Decrement the health value
    this.health -= damage;
    this.tumbler.playerSprite.tint = 0x000000;
    console.log('RemotePlayer: ', this.name, ' was damaged');
    this.healthBar.crop(this.health);

    // Remove the tint after the timer is up
    this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function() {this.tumbler.playerSprite.tint = 0xFFFFFF;}, this);
};

RemotePlayer.prototype.attack = function () {
    console.log('RemotePlayer: ', this.name, ' is attacking.');
    this.weapon.attack();
};

RemotePlayer.prototype.die = function () {
    console.log('RemotePlayer died: ', this.name);
    
    someoneDied = true;

    this.alive = false;
    this.tumbler.playerSprite.body = null;
    this.tumbler.playerSprite.destroy(true); // true destroys children
    this.tumbler.playerSprite.kill();
};

window.RemotePlayer = RemotePlayer;