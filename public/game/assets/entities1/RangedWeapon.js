function Weapon(game) {
    this.game = game;
}

Player.prototype.create = function() {
    console.log('Creating Local Weapon');

};

Player.prototype.update = function() {


};

Player.prototype.weaponControls = function() {

    if (this.attack_key.isDown) {
        this.katana.animations.play('swing');
    }
    else {
        this.katana.animations.play('float');
    }
};

Player.prototype.weaponPhysics = function() {
    
    if (this.attack_key.isDown) {
        for (let remotePlayer of remotePlayers) {
            this.game.physics.arcade.overlap(this.katana, remotePlayer.player, this.damageOtherPlayer(remotePlayer), null, this);
        }
    }
};

Player.prototype.damageOtherPlayer = function(remotePlayer) {
    remotePlayer.health -= 1;
    console.log('Player: ', remotePlayer.name, ' has ', remotePlayer.health, ' health left.');
};

