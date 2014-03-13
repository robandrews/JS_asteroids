(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Game = Asteroids.Game = function (canvas) {
    this.asteroids = [];
    this.bullets = [];
    this.ship = null;
    this.canvas = canvas;
    this.DIM_X = this.canvas.width;
    this.DIM_Y = this.canvas.height;
  }
  
  Game.prototype.addAsteroids = function (numAsteroids) {
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push( Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y) );
    }
  }

  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship(this.DIM_X / 2, this.DIM_Y / 2);
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach( function (el) {
      el.draw(ctx);
    });

    this.bullets.forEach( function (el) {
      el.draw(ctx);
    });

    this.ship.draw(ctx);
  }

  Game.prototype.move = function () {
    this.updateVelocities();
    this.asteroids.forEach( function(el) {
      el.move();
    });

    this.bullets.forEach( function(el) {
      el.move();
      el.counter++;
      el.hitAsteroids();
    });

    this.ship.move();
  }

  Game.prototype.updateVelocities = function(){
    that = this;
    if(key.isPressed("left")){
      // that.ship.rotation_velocity += 0.05 // commented out inertia for rotational movement
      that.ship.rotation += 0.03;
    };

    if(key.isPressed("right")) {
      // that.ship.rotational_velocity -= 0.05; // commented out inertia for rotational movement
      that.ship.rotation -= 0.03
    };

   
    if(key.isPressed("up")){
      var vector = that.ship.getVector()
      that.ship.vx = (that.ship.vx + vector[0]*0.03)
      that.ship.vy = (that.ship.vy + vector[1]*0.03)
    };
  }

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet(this));
  }

  Game.prototype.removeAsteroid = function(asteroid){
    var asteroid_index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroid_index, 1);
  }

  Game.prototype.removeBullet = function(bullet){
    var bullet_index = this.bullets.indexOf(bullet);
    this.bullets.splice(bullet_index, 1);
  }

  Game.prototype.step = function(ctx){
    this.move.call(this);
    this.checkBoundaries.call(this);
    this.draw.call(this, ctx);
    this.checkCollisions();
    this.checkBoundaries()
    console.log(key.getPressedKeyCodes());
  }

  Game.prototype.checkCollisions = function() {
    var that = this;
    var crashed = this.asteroids.some( function (el) {
      return el.isCollidedWith(that.ship);
    });
    if(crashed){
      alert("Game over!");
      that.stop();
    }
  }

  Game.prototype.checkBoundaries = function() {
    var that = this;
    
    this.asteroids.forEach(function(asteroid){
      var off = asteroid.isOffTheGrid(that.DIM_X, that.DIM_Y)
      if(off){
        asteroid.posx = off[0];
        asteroid.posy = off[1];
      }
    })
    var removals = []
    this.bullets.forEach(function(bullet){
      var off = bullet.isOffTheGrid(that.DIM_X, that.DIM_Y)
      if(off){
        bullet.posx = off[0];
        bullet.posy = off[1];
      }else if(bullet.counter > 150){
        removals.push(that.bullets.indexOf(bullet));
      }
    })
    removals.forEach(function(idx){
      that.bullets.splice(idx, 1);
    }) 
  }


  Game.prototype.bindKeyHandlers = function(){
    key("space", this.fireBullet.bind(this));
    
    // if(key.isPressed("space")){
//       that.fireBullet.bind(that);
//     }
  }

  Game.prototype.stop = function(){
    clearInterval(this.handle);
  }

  Game.prototype.start = function() {
    this.addAsteroids(0);
    this.addShip();
    this.bindKeyHandlers();
    var context = this.canvas.getContext('2d');
    this.handle = setInterval( this.step.bind(this, context), 5 );
  }

})(this);

