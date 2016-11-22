function StageHandler(game) {
    this.game = game;
};

var cacti;

StageHandler.prototype.constructStage = function() {
    // Add the Background
    this.background = this.game.add.tileSprite(0, 0, 1024, 576, 'arenaBackground1');
    this.game.physics.setBoundsToWorld();

    cacti = this.game.add.group();

    // Give all the clients 2 seconds to properly sync with the server
    this.ready = false;
    this.game.time.events.add(2000, function() {this.ready = true}, this);
};

StageHandler.prototype.addCactiWall = function() {    
    for (var i = 0; i < 10; i++)
        if (i != door && i != door+1 && i != door+2) 
            this.addCactus(1024, i*60);
};

StageHandler.prototype.addCactus = function(x, y) {
    var cactus = this.game.add.sprite(x, y, 'cactus');
    cacti.add(cactus);
    this.game.physics.arcade.enable(cactus);

    cactus.body.velocity.x = -200;
    cactus.body.immovable = true;
    cactus.checkWorldBounds = true;
    cactus.outOfBoundsKill = true;
};

StageHandler.prototype.update = function() {
    this.background.tilePosition.x -= 2;

    if (this.ready && addWall) {
        this.addCactiWall();
        addWall = false;

        // Wait at least 1 second before adding the next wall
        this.ready = false;
        this.game.time.events.add(1000, function() {this.ready = true}, this); 
    }
    // Skip a wall if the client isn't ready
    else if (!this.ready && addWall) {
        addWall = false;
    }
};