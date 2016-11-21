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
        else {
            // Mobile-specific behaviour
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(100, 60, 1000, 600);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
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
        this.load.image('preload_background', 'game/assets/textures/GUI/logo_screen.png');
        this.load.image('loading_bar', 'game/assets/textures/GUI/loading_bar.png', 100, 10);
    },

    create: function() {
        this.state.start('preloader');
    }

};