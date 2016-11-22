function HealthBar(game) {
    this.game = game;
};

HealthBar.prototype.create = function() {
    // this.healthBarBackground = this.game.add.sprite(0,0, 'healthbar');
    // this.healthBarBackground.tint = 0x000000;

    this.healthBar = this.game.add.sprite(0,0, 'healthbar');
    this.healthBar.cropEnabled = true;

    this.healthBar.anchor.set(0.5);
    this.healthBar.x = 0;
    this.healthBar.y = -30;

    this.originalWidth = this.healthBar.width;
};

HealthBar.prototype.crop = function(health) {
    this.croppedHealth = new Phaser.Rectangle(0, 0, (health / 100) * this.originalWidth, this.healthBar.height); 
    this.healthBar.crop(this.croppedHealth);
};