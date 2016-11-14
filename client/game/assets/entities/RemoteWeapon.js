function RemoteWeapon(game) {
    this.game = game;
};

RemoteWeapon.prototype.create = function(weapon) {
    console.log('Creating Melee Weapon');

    // Weapon texture and animations
    this.katana = this.game.add.sprite(null, null, 'weapon_katana');
    this.katana.animations.add('float', Phaser.Animation.generateFrameNames('Katana', 1, 1), 5, true);
    this.katana.animations.add('swing', Phaser.Animation.generateFrameNames('Katana', 1, 4), 15, false);

    // Weapon's appearance
    this.katana.scale.setTo(-0.5, 0.5);
    this.katana.x = -50;
    this.katana.y = 0;

    // Weapon's physics
    this.game.physics.arcade.enable(this.katana);
    this.katana.body.moves = false;
    this.katana.anchor.setTo(0.2, 0.8);

    // Weapon control keys
    this.attack_key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
};

RemoteWeapon.prototype.update = function() {
    // Might need something here later
};

RemoteWeapon.prototype.attack = function() {
    this.katana.animations.play('swing');
};