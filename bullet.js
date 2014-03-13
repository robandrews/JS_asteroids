(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Bullet = Asteroids.Bullet = function(posx, posy, direction, game) {
    this.game = game;
    this.counter = 0
    Asteroids.MovingObject.call(this, posx, posy, direction[0]*10, direction[1]*10, Bullet.RADIUS, Bullet.COLOR )
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 2;
  Bullet.COLOR = "black";

  Bullet.prototype.hitAsteroids = function() {
    var that = this
    this.game.asteroids.forEach( function (el) {
      if (el.isCollidedWith(that)){
        that.game.removeAsteroid(el);
        that.game.removeBullet(that);
      }
    })
  }

})(this);