(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "grey"

  Asteroid.RADIUS = 15;

  Asteroid.MAX_VEL = 0.5;

  Asteroid.randomAsteroid = function(dimX, dimY, ship) {
    var xrange = [];
    var yrange = [];
    
    xrange.push(ship.posx-80);
    xrange.push(ship.posx+80);
    yrange.push(ship.posy-80);
    yrange.push(ship.posy+80);
    
    var posx = Math.random() * dimX;
    var posy = Math.random() * dimY;
    
    var vx = Math.random() * Asteroid.MAX_VEL * (Math.random() < 0.5 ? -1 : 1);
    var vy = Math.random() * Asteroid.MAX_VEL * (Math.random() < 0.5 ? -1 : 1);
    
    while( (posx > xrange[0] && posx < xrange[1]) || (posy > yrange[0] && posy < yrange[1]) ){
      posx = Math.random() * dimX;
      posy = Math.random() * dimY;
    }
    return new Asteroid(posx, posy, vx, vy, this.randomAsteroidSize(), Asteroid.COLOR);
  }
  
  Asteroid.randomAsteroidSize = function(){
    var rand = Math.random()
    
    if(rand < 0.33){
      return this.RADIUS;
    }else if(rand > 0.66){
      return this.RADIUS * 2;
    }else{
      return this.RADIUS * 3;
    }
    
  }

})(this);

