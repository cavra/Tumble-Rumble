TumbleRumble.stage = function(game) {};

// Global Variables
var myGame; 

var player;
var someoneDied = false;

var door;
var addWall = false;

TumbleRumble.stage.prototype = {

    create: function() {
        console.log('Entered Stage');

        // Take care of basic stuff
        myGame = this.game;

        // Start the music
        this.music = this.add.audio('welcome_music', 0.5, true);
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
        if (someoneDied && remotePlayers.length < 2) {
            socket.emit('winner');
            if (player.alive) {
                this.state.start('results', true, true, true);
            }
            else {
                this.state.start('results', true, true, false)
            }
        }
    },

    destructor: function () {
        someoneDied = false; // Need this to restart, apparently
        addWall = false;
    },

};