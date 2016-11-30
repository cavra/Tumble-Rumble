function StageHandler(game) {
    this.game = game;
};

var cacti;
var style = {
    font: "32px Arial", 
    fill: "#FFFFFF", 
    align: "left", 
    stroke: "black", 
    strokeThickness: 3,
    wordWrap: false,
    wordWrapWidth: 100,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "black",
    shadowBlur: 10
};

StageHandler.prototype.constructStage = function() {
    // Add the Background
    this.background = this.game.add.tileSprite(0, 0, 1024, 576, 'arenaBackground1');
    this.game.physics.setBoundsToWorld();

    // Prepare the cacti walls
    cacti = this.game.add.group();

    // Give all the clients 2 seconds to properly sync with the server
    this.ready = false;
    this.game.time.events.add(2000, function() {this.ready = true}, this);

    // Create the text
    this.addText();
};

StageHandler.prototype.addText = function() {
    this.score = 0;
    this.textScore = this.game.add.text(20, 20, 'Cacti Cleared: ' + this.score, style);

    this.gameTimer = this.game.time.create(false);
    this.gameTimer.start();
    this.textTimer = this.game.add.text(this.game.width - 20, 20, 'Time Survived: ' + this.gameTimer.seconds.toFixed(0), style);
    this.textTimer.anchor.set(1, 0);

    // this.textFPS = this.game.add.text(this.game.width - 20, 60, 'FPS: ' + this.game.time.fps, style);
    // this.textFPS.anchor.set(1, 0);
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
    
        this.game.time.events.add(5000, function() {
            this.score += 1;
        }, this);             

        // Wait at least 1 second before adding the next wall
        this.ready = false;
        this.game.time.events.add(1000, function() {this.ready = true}, this); 
    }
    // Skip a wall if the client isn't ready
    else if (!this.ready && addWall) {
        addWall = false;
    }

    // Update the text
    this.updateText();
};

StageHandler.prototype.updateText = function() {
    this.textScore.setText("Cacti Cleared: " + this.score);

    this.textTimer.setText("Time Survived: " + this.gameTimer.seconds.toFixed(0));

    // this.textFPS.setText("FPS: " + this.game.time.fps);
};
