var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage,cloud;
var ob1,ob2,ob3,ob4,ob5,ob6,obs;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obsGroup ,clouds;
var restart,reImg,go,goImg;
var cheakp,jump,die

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  ded = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1=loadImage("ob1.png");
  ob2=loadImage("ob2.png");
  ob3=loadImage("ob3.png");
  ob4=loadImage("ob4.png");
  ob5=loadImage("ob5.png");
 // ob6=loadImage("ob6.png");
  goImg=loadImage("gameOver.png");
  reImg=loadImage("restart.png");
  cheakp=loadSound("checkpoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");

 
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("dead", ded);
  trex.debug=false;
  trex.setCollider("circle",0,0,40);

  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //restart button 
 
  //generate random numbers
  //var rand =  Math.round(random(1,100))
  //console.log(rand)

 score=0
 obsGroup = new Group();
  cloudsGroup = new Group();



  restart=createSprite(300,130)
    restart.addImage("rebutton",reImg)
    restart.scale=0.4
    //gameover
    go=createSprite(300,100)
    go.addImage("gameover",goImg)
  go.scale=0.6
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  trex.collide(invisibleGround);
 
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(4+score/500);
   // score = score + Math.round(frameCount/60);
   score=score+1
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -13;
      jump.play()
    }
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;

    }

    //spawn the clouds
   spawnClouds();
  
   //spawn obstacles on the ground
   spawnObstacles();
    if (trex.isTouching(obsGroup)){
    /*trex.velocityY=-10
      jump.play();*/
     die.play()

      gameState=END
    }
      if(score%500===0 && score>0){
        cheakp.play()
        //ground.velocityX-=3
        //obsgroup.velocityX-=3

      }
     restart.visible=false
     go.visible=false

  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    obsGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.changeAnimation("dead",ded)
    obsGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
    trex.velocityY=0
    if (mousePressedOver (restart)||keyDown("space")){
      reload()
 

    }

  restart.visible=true
     go.visible=true
  }



  
 
  
 
  
  
 
  
 
  
  drawSprites();
}
//function to spawn the clouds
function spawnClouds(){
 
 // write your code here 
 if(frameCount%50===0) {
  
 
  cloud=createSprite(600,100)
  
  cloud.addImage("cloud",cloudImage)
  cloud.velocityX=-2
  cloud.y=Math.round(random(25,100))
  cloud.scale=0.5
  trex.depth=cloud.depth+1

  cloud.lifetime=300
  cloudsGroup.add(cloud)
    }

}
function spawnObstacles(){
 
  // write your code here 
  if(frameCount%60===0) {
   
  
   obs=createSprite(600,160)
   
   //obs.addImage("obs",ob1)
   var n=Math.round (random(1,5))
   switch(n){
    case 1:obs.addImage("obs",ob1);
    break;
    case 2:obs.addImage("obs",ob2);
    break;
    case 3:obs.addImage("obs",ob3);
    break;
    case 4:obs.addImage("obs",ob4);
    break;
    case 5:obs.addImage("obs",ob5);
    break;
    //case 6:obs.addImage("obs",ob6)
   // obs.scale=0.3
   // break;
    default:break;

   }
   obs.velocityX = -(4+score/500);
   
   obs.scale=0.5
  // trex.depth=cloud.depth+1
 
   obs.lifetime=300
   obsGroup.add(obs)
     }
 
 }
 function reload()
 {
gameState=PLAY
obsGroup.destroyEach()
cloudsGroup.destroyEach()
score=0

trex.changeAnimation("running", trex_running)

 }
 


