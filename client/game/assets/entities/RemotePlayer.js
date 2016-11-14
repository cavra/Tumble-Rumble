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

    // Player's location
    this.x = this.tumbler.x;
    this.y = this.tumbler.y;

    this.player = this.tumbler.playerSprite;
    this.hitbox = this.tumbler.playerSprite;

};

RemotePlayer.prototype.update = function () {

	// Update the player components
	this.tumbler.update();

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

RemotePlayer.prototype.damage = function (damage) {
    this.health -= damage;
    console.log('Player: ', this.name, ' was damaged for: ', damage, ' and has ', this.health, ' health left.');
    
    // Tell the server we are damaging the other player
    socket.emit('damage player', { health: this.health});
};

RemotePlayer.prototype.attack = function () {
    console.log('Player: ', this.name, ' is attacking.');
    this.weapon.attack();
};

window.RemotePlayer = RemotePlayer;