TumbleRumble.stage = function(game) {};

// Global Variables
var myGame; 

var player;
var someoneDied = false;

var door;
var addWall = false;

var remotePlayersNumber = 0;

TumbleRumble.stage.prototype = {

    create: function() {
        console.log('Entered Stage');

        // Take care of basic stuff
        myGame = this.game;

        // Start the music
        this.music = this.add.audio('stageMusic', 0.5, true);
        this.music.play();

        // Initiate the Stage Handler
        stageHandler = new StageHandler(this.game);
        stageHandler.constructStage();

        // Spawn the local player
        player = new LocalPlayer(this.game);
        player.create();
    },

    update: function () {
        // Update our player
        player.update();

        // Update all remote players
        socketHandler.update();

        // Update the stage
        stageHandler.update();

        // Check for game over
        console.log("Number of remotes: ", remotePlayersNumber);
        if (someoneDied && player.alive && remotePlayersNumber == 0) {
            this.destructor();
            this.state.start('results', true, true, true);
        }
        else if (!player.alive) {
            this.destructor();
            this.state.start('results', true, true, false)
        }
    },

    destructor: function () {
        this.music.stop();
        someoneDied = false; // Need this to restart, apparently
        remotePlayersNumber = 0;
        addWall = false;
    },

};