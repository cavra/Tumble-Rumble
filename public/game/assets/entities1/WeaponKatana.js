function WeaponKatana(game) {
    this.game = game;
}

WeaponKatana.prototype.create = function(weapon) {
    console.log('Creating Melee Weapon');

    // Weapon texture and animations
    this.katana = this.game.add.sprite(null, null, 'weapon_katana');
    this.katana.animations.add('float', Phaser.Animation.generateFrameNames('Katana', 1, 1), 5, true);
    this.katana.animations.add('swing', Phaser.Animation.generateFrameNames('Katana', 1, 4), 15, true);

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

WeaponKatana.prototype.update = function() {
    this.weaponControls();
    this.weaponPhysics();

};

WeaponKatana.prototype.weaponControls = function() {

    if (this.attack_key.isDown) {
        this.katana.animations.play('swing');
    }
    else {
        this.katana.animations.play('float');
    }
};

WeaponKatana.prototype.weaponPhysics = function() {
    
    if (this.attack_key.isDown) {
        for (let remotePlayer of remotePlayers) {
            this.game.physics.arcade.overlap(this.katana, remotePlayer.player, this.damageOtherPlayer(remotePlayer), null, this);
        }
    }
};

WeaponKatana.prototype.damageOtherPlayer = function(remotePlayer) {
    remotePlayer.health -= 1;
    console.log('Player: ', remotePlayer.name, ' has ', remotePlayer.health, ' health left.');
};

