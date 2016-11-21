function TilemapHandler(game) {
    this.game = game;
};

// Global variables
var groundLayer;

TilemapHandler.prototype.buildArena1 = function() {
    // Add the Background
    this.background = this.game.add.sprite(0, 0, 'arenaBackground1');

    // Add the Tilemap
    this.map = this.game.add.tilemap('arena1');

    // Map the correct tileset images to the tilemap
    // (The first parameter is the tileset name as specified in Tiled)
    // (The second is the key to the asset)
    this.map.addTilesetImage('tileset1', 'tileset1');

    // Create tilemap layers
    groundLayer = this.map.createLayer('ground');
    this.map.setCollisionBetween(1, 1000, true, 'ground', false);
};

TilemapHandler.prototype.buildArena2 = function() {
    // Add the Background
    this.background = this.game.add.sprite(0, 0, 'arenaBackground2');

    // Add the Tilemap
    this.map = this.game.add.tilemap('arena2');

    // Map the correct tileset images to the tilemap
    // (The first parameter is the tileset name as specified in Tiled)
    // (The second is the key to the asset)
    this.map.addTilesetImage('tileset1', 'tileset1');

    // Create tilemap layers
    groundLayer = this.map.createLayer('ground');
    this.map.setCollisionBetween(1, 1000, true, 'ground', false);
};

TilemapHandler.prototype.buildArena3 = function() {
    // Add the Background
    this.background = this.game.add.sprite(0, 0, 'arenaBackground3');

    // Add the Tilemap
    this.map = this.game.add.tilemap('arena3');

    // Map the correct tileset images to the tilemap
    // (The first parameter is the tileset name as specified in Tiled)
    // (The second is the key to the asset)
    this.map.addTilesetImage('tileset1', 'tileset1');

    // Create tilemap layers
    groundLayer = this.map.createLayer('ground');
    this.map.setCollisionBetween(1, 1000, true, 'ground', false);
};

TilemapHandler.prototype.buildArena4 = function() {
    // Add the Background
    this.background = this.game.add.sprite(0, 0, 'arenaBackground4');

    // Add the Tilemap
    this.map = this.game.add.tilemap('arena4');

    // Map the correct tileset images to the tilemap
    // (The first parameter is the tileset name as specified in Tiled)
    // (The second is the key to the asset)
    this.map.addTilesetImage('tileset1', 'tileset1');

    // Create tilemap layers
    groundLayer = this.map.createLayer('ground');
    this.map.setCollisionBetween(1, 1000, true, 'ground', false);
};