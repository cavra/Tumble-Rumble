var TumbleRumble = {};

TumbleRumble.boot = function (game) {};

TumbleRumble.boot.prototype = {

    init: function() {
        console.log('Booting up...');

        //this.clearGameCache(); // this causes the game to not load anything

        this.input.maxPointers = 1;

        // Toggles auto-pause if user changes focus
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            // Add any desktop-specific behaviour details here            
        }
        // Mobile-specific behaviour
        else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(80, 50, 1024, 576);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
        }
    },

    clearGameCache: function() {
        // Makes sure updates to the game will show
        this.game.cache = new Phaser.Cache(this.game);
        this.game.load.reset();
        this.game.load.removeAll();
    },

    preload: function() {
        // Preload necessary assets for the Preloading game state
        this.load.image('preloadBackground', 'game/assets/textures/GUI/bootBackground.png');
        this.load.image('loadingBar', 'game/assets/textures/GUI/loadingBar.png', 100, 10);
        this.load.image('loadingBarBackground', 'game/assets/textures/GUI/loadingBarBackground.png', 100, 10);
    },

    create: function() {
        this.state.start('preloader');
    }

};