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
    this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);

    // Timers
    this.weaponAttackTimer = 0;
};

LocalWeapon.prototype.update = function() {
    this.weaponControls();
};

LocalWeapon.prototype.weaponControls = function() {

    // Timer is already running...
    if (this.attackKey.isDown && this.weaponAttackTimer.seconds > 0.5) {
        this.weaponAttackTimer.destroy();
        
        // Execute the attack
        socket.emit('attack player');
        this.katana.animations.play('swing');

        // Restart the timer
        this.weaponAttackTimer = this.game.time.create(false);
        this.weaponAttackTimer.start();
    }
    // Timer is not running (first case only)
    else if (this.attackKey.isDown && !this.weaponAttackTimer.running) {

        // Execute the attack
        socket.emit('attack player');
        this.katana.animations.play('swing');

        this.weaponAttackTimer = this.game.time.create(false);
        this.weaponAttackTimer.start();
    }
};