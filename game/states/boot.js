var TumbleRumble = {};

TumbleRumble.boot = function (game) {};

TumbleRumble.boot.prototype = {

    init: function() {

        this.input.maxPointers = 1;

        // toggles auto-pause if user changes focus
        // this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            // this.scale.pageAlignHorizontally = true; //bug: causes canvas to be off-centered
        }
        else // We're on mobile
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(100, 60, 1000, 600);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }

    },

    preload: function() {

        // preload necessary assets for preloading state
        this.load.image('preload_background', 'game/assets/textures/GUI/logo_screen.png');
        this.load.image('loading_bar', 'game/assets/textures/GUI/loading_bar.png', 100, 10);
    },

    create: function() {

        this.state.start('preloader');

    }

};