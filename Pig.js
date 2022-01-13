class Pig extends baseclass{
    constructor(x, y) {
      super(x,y,50,50);
      this.image=loadImage("sprites/enemy.png")
      this.Visiblity=255;
    }
    display(){
   // console.log(this.body.speed)
    if(this.body.speed<4.5){
    super.display();
    }
    else {
      World.remove(world,this.body);
      push();
      tint(255, this.Visiblity);
      this.Visiblity=this.Visiblity-5;
      image(this.image, this.body.position.x, this.body.position.y,50,50)
      pop();
    }
    }
    score(){
      if(this.Visiblity<0 && this.Visiblity>-100){
        score=score+1
      }

    }
  };
  