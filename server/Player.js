/* ************************************************
** GAME PLAYER CLASS
************************************************ */
var Player = function (startX, startY) {
  var x = startX;
  var y = startY;
  var id;
  var health;

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

  var setX = function (newX) {
    x = newX;
  };

  var setY = function (newY) {
    y = newY;
  };

  var setHealth = function (newHealth) {
    health = newHealth;
  };

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    getHealth: getHealth,
    setX: setX,
    setY: setY,
    setHealth: setHealth,
    id: id
  };
};

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = Player;
