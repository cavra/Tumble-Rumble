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

    this.player = this.tumbler.playerSprite;

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

window.RemotePlayer = RemotePlayer;