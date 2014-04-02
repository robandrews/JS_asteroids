(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Bullet = Asteroids.Bullet = function(posx, posy, direction, game) {
    this.game = game;
    this.counter = 0
    Asteroids.MovingObject.call(this, posx, posy, direction[0]*4, direction[1]*4, Bullet.RADIUS, Bullet.COLOR )
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 3;
  Bullet.COLOR = "red";

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