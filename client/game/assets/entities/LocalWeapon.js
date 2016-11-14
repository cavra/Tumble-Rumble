function LocalWeapon(game) {
    this.game = game;
};

LocalWeapon.prototype.create = function(weapon) {
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
};

LocalWeapon.prototype.update = function() {
    this.weaponControls();
    this.weaponPhysics();
};

LocalWeapon.prototype.weaponControls = function() {

    if (this.attack_key.isDown) {
        socket.emit('attack player', { attack: true});
        this.katana.animations.play('swing');
    }
};

LocalWeapon.prototype.weaponPhysics = function() {
    
    // First check if the player is attacking
    if (this.attack_key.isDown) {
        // Then check if the weapon is touching any of the other players
        for (var i = 0; i < remotePlayers.length; i++) {
            // If it is...
            if (this.game.physics.arcade.overlap(this.katana, remotePlayers[i].player, null, null, this)) {
                // Damage the other player
                this.damageOtherPlayer(remotePlayers[i]);
            }
        }
    }
};

LocalWeapon.prototype.damageOtherPlayer = function(remotePlayer) {
    remotePlayer.damage(1);
};