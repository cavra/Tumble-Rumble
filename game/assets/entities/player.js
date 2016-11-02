var player;
var cursors;

function Player(game) {
    this.game = game;
}

Player.prototype.create = function() {

    player = this.game.add.sprite(200, 100, 'tumbleweed');
    player.scale.setTo(0.3, 0.3);
    player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(player, Phaser.Physics.ARCADE);

    cursors = this.game.input.keyboard.createCursorKeys();
};

Player.prototype.update = function() {

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
        player.scale.x = 0.3;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
        player.scale.x = -0.3;
    }

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 200;
    }
};
