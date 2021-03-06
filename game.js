(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Game = Asteroids.Game = function (canvas) {
    this.asteroids = [];
    this.bullets = [];
    this.ship = null;
    this.canvas = canvas;
    this.DIM_X = this.canvas.width;
    this.DIM_Y = this.canvas.height;
    this.score = 0;
    this.level = 1;
  }
  
  Game.prototype.addAsteroids = function (numAsteroids) {
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push( Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y, this.ship) );
    }
  }

  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship(this.DIM_X / 2, this.DIM_Y / 2);
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,this.DIM_X, this.DIM_Y)
    this.asteroids.forEach( function (el) {
      el.draw(ctx);
    });

    this.bullets.forEach( function (el) {
      el.draw(ctx);
    });

    this.ship.draw(ctx);
    
    // this.drawScore(ctx);
  }
  
  // Game.prototype.drawScore = function(ctx){
  //   ctx.clearRect (0 , 0 , 150, 20 );
  //   ctx.fillStyle = "black";
  //   context.font = "16px Arial";
  //   context.fillText("Test", 20, 20);
  // }

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
      that.ship.rotation += 0.035;
    };

    if(key.isPressed("right")) {
      // that.ship.rotational_velocity -= 0.05; // commented out inertia for rotational movement
      that.ship.rotation -= 0.035;
    };
   
    if(key.isPressed("up")){
      var vector = that.ship.getVector()
      that.ship.vx = (that.ship.vx + vector[0]*0.05)
      that.ship.vy = (that.ship.vy + vector[1]*0.05)
    };
  }

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet(this));
  }

  Game.prototype.removeAsteroid = function(asteroid){
    var asteroid_index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroid_index, 1);
    this.score += (this.level*10);
    document.getElementById("num-score").innerHTML=this.score;
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
    this.checkLevelUp()

  }
  
  Game.prototype.checkLevelUp = function(){
    if(this.asteroids < 1){
      this.level+=1;
      document.getElementById("num-level").innerHTML=this.level;
      this.addAsteroids(10)
    }
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
    var off = this.ship.isOffTheGrid(this.DIM_X, this.DIM_Y);
    if(off){
      this.ship.posx = off[0];
      this.ship.posy = off[1];
    }
  }


  Game.prototype.bindKeyHandlers = function(){
    key("space", this.fireBullet.bind(this));
  
  }

  Game.prototype.stop = function(){
    clearInterval(this.handle);
  }

  Game.prototype.start = function() {
    this.addShip();
    this.addAsteroids(10);
    this.bindKeyHandlers();
    var context = this.canvas.getContext('2d');
    this.handle = setInterval( this.step.bind(this, context), 5 );
  }

})(this);

