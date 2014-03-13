(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var MovingObject = Asteroids.MovingObject = function(posx, posy, vx, vy, radius, color){
    this.posx = posx;
    this.posy = posy;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function() {
    this.posx = this.posx + this.vx;
    this.posy = this.posy + this.vy;
  }

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posx,
      this.posy,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distance = Math.sqrt(Math.pow((this.posx - otherObject.posx), 2) + Math.pow((this.posy - otherObject.posy), 2))

    return ((this.radius + otherObject.radius) > distance)
  }

  MovingObject.prototype.isOffTheGrid = function(gridx, gridy){
    if(this.posx < 0){
      return [(this.posx + gridx), this.posy];
    }else if(this.posx > gridx){
      return [(this.posx - gridx), this.posy]
    }else if(this.posy < 0){
      return [this.posx, (this.posy + gridy)]
    }else if(this.posy > gridy){
      return [this.posx, (this.posy - gridy)]
    }else{
      return false
    }
  }

})(this);