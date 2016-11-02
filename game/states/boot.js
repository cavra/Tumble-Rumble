var TumbleRumble = {};

TumbleRumble.boot = function (game) {};

TumbleRumble.boot.prototype = {

    init: function() {

    	this.clearGameCache();

        this.input.maxPointers = 1;

        // toggles auto-pause if user changes focus
        this.stage.disableVisibilityChange = true;
        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
        }
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(100, 60, 1000, 600);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }

    },

	clearGameCache: function() {
	    this.game.cache = new Phaser.Cache(this.game);
	    this.game.load.reset();
	    this.game.load.removeAll();
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