/* ************************************************
** GAME PLAYER CLASS
************************************************ */
var Player = function (startX, startY) {
  var x = startX;
  var y = startY;
  var id;
  var health;
  var attack;

  // Getters and setters
  var getX = function () {
    return x;
  };

  var getY = function () {
    return y;
  };

  var getHealth = function () {
    return health;
  };

  var getAttack = function () {
    return attack;
  };

  var setX = function (newX) {
    x = newX;
  };

  var setY = function (newY) {
    y = newY;
  };

  var setHealth = function (newHealth) {
    health = newHealth;
  };

  var setAttack = function (newAttack) {
  	attack = newAttack;
  }

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    getHealth: getHealth,
    getAttack: getAttack,
    setX: setX,
    setY: setY,
    setHealth: setHealth,
    setAttack: setAttack,
    id: id
  };
};

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = Player;
