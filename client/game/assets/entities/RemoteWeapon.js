function RemoteWeapon(game) {
    this.game = game;
};

RemoteWeapon.prototype.create = function(weapon) {
    console.log('Creating Melee Weapon');

    // Weapon texture and animations
    this.katana = this.game.add.sprite(null, null, 'weapon_katana');
    this.katana.animations.add('float', ["Katana1"], 5, true);
    this.katana.animations.add('swing', ["Katana1", "Katana2", "Katana3", "Katana4", "Katana3", "Katana2", "Katana1"], 15, false);
    this.katana.animations.play('float');

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

    this.isAttacking = null;
};

RemoteWeapon.prototype.update = function() {
    this.weaponPhysics();
};

RemoteWeapon.prototype.attack = function() {
    this.katana.animations.play('swing');
    this.isAttacking = true;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function() {this.isAttacking = false;}, this);
};

RemoteWeapon.prototype.weaponPhysics = function() {
    // First check if the player is attacking
    if (this.isAttacking) {
        if (this.game.physics.arcade.overlap(this.katana, player.player, null, null, this)) {
            // Damage the other player
            player.takeDamage(15);
        }
    }
};