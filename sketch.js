const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint=Matter.Constraint;

var engine, world;
var box1, pig1;
var fondo;
var plataforma, constrainedlog,chain;
var gameState="onSling"
var bg="sprites/bg.png"
var score=0;
var im="sprites/bird.png"
var time=0;


function preload(){
   getBackgrounImg();

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
 
    
    ground = new Ground(600,height,1200,20)
	plataforma=new Ground(150,320,300,170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

  
    bird = new Bird(200,50);
   constrainedlog=new Log(230,180,80,PI/4)
    sling=new Slingshot(bird.body,({x:200,y:50}));


}

function draw(){
     if(fondo)
    background(fondo);
    Engine.update(engine);
   console.log(gameState)
    textSize(20);
    fill("black");
    text("Time: "+ time, 700,50);
    time = time +Math.round(getFrameRate()/60)
  if(time%500===0){
      gameState="gameOver"
      score=0;
    }
 if(gameState==="gameOver"){
    textSize(50);
    fill("black");
    text("GAME OVER¡¡¡ ", 400,200);
    score=0;
    time=0;
    
 }
    textSize(30);
    fill("white")
    text("Puntuacion:"+ score, 900,50)
   
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
	plataforma.display();
 //constrainedlog.display();
    sling.display();
}

function mouseDragged(){
 if(gameState!=="launched" ){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
}

}
function mouseReleased(){
    sling.fly();
    gameState="launched"
}
function keyPressed(){
    if(keyCode===32 && bird. body.speed<1){
    bird.trayectory=[];
        sling.attach(bird.body)    
        Matter.Body.setPosition(bird.body,{x:200,y:50})
        gameState="onSling"
      }
}
async function getBackgrounImg(){
    var respuesta=await fetch ("http://worldtimeapi.org/api/timezone/America/Monterrey")
    var respuestaJSON=await respuesta.json();
    var datetime=respuestaJSON.datetime
    var hour=datetime.slice(11,13)
    if(hour>=06 && hour <19){
        bg="sprites/bg.png"
   }
    else {
        bg="sprites/bg2.jpg"
    }
    fondo=loadImage(bg)
    console.log(fondo)
  
}