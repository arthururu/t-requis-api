//cria as variaveis
var t_rex,t_rexRunning,t_rexJumping,t_rexCollided;
var canvas;
var ground,ground_Img,ground_Inv;
var cloud,cloud_Img,cloud_gp;
var cacto,cacto_img01,cacto_img02,cacto_img03,cacto_img04,cacto_img05,cacto_img06,cacto_gp;
var sorteio;
var score = 0;
var Play = 1;
var End = 0;
var gameState = Play;

function preload(){
    t_rexRunning = loadAnimation("trex3.png","trex4.png");
    t_rexJumping = loadAnimation("trex1.png");
    t_rexCollided = loadAnimation("trex_collided.png");
    ground_Img = loadImage("ground2.png");
    cloud_Img = loadAnimation("cloud.png");
    cacto_img01 = loadAnimation("obstacle1.png");
    cacto_img02 = loadAnimation("obstacle2.png");
    cacto_img03 = loadAnimation("obstacle3.png");
    cacto_img04 = loadAnimation("obstacle4.png");
    cacto_img05 = loadAnimation("obstacle5.png");
    cacto_img06 = loadAnimation("obstacle6.png");



}

function setup(){
    canvas = createCanvas(600,200);

    t_rex = createSprite(50,150,20,20);
    t_rex.addAnimation("running",t_rexRunning);
    t_rex.addAnimation("jumping",t_rexJumping);
    t_rex.addAnimation("collided",t_rexCollided);
    t_rex.scale = 0.5;

    ground = createSprite(300,160,600,20);
    ground.addImage("solo",ground_Img);
    ground.velocityX = -2;
    ground_Inv = createSprite (300,180,600,20);
    ground_Inv.visible=false;
    score=0;
    cacto_gp = new Group();
    cloud_gp = new Group();
}



function draw(){
    background("white");
    if (t_rex.isTouching(cacto_gp)){
        background("blue")
    }
    
    if (gameState === Play) {
        if(keyDown("space")&& t_rex.y >130) { 
            t_rex.velocityY = -10;
            //t_rex.changeAnimation("jumping",t_rexJumping);
        }
         gravidade();
        spawCloud();
        spawnObstacles();
        if (ground.x < 0){
            ground.x = ground.width/2;
           }
    }

    else if(gameState === End){
    stopGame();
    }
  



   textSize(20);
   strokeWeight(2);
   text("Pontuação" + score,450,20);

   
   
    console.log(t_rex.y);

    //gravidade
   

    t_rex.collide(ground_Inv);
   
    drawSprites();
}
function gravidade(){
    t_rex.velocityY += 0.5;
}
function spawCloud(){
 
 if (frameCount % 100 === 0) {
    cloud = createSprite(600,20,30,30);
    cloud. addAnimation("cloud",cloud_Img);
    cloud.velocityX = -2;
    cloud.y= Math.round(random(20,100));
    cloud.scale= random(0.2,1);
    cloud.depth = t_rex.depth - 1;
    cloud.lifetime = 310;
 }
}

function spawnObstacles() {

if (frameCount % 200 === 0){
    
cacto = createSprite(600,150,30,30);
   
    cacto.velocityX = -2;
    sorteio= Math.round(random(1,6));
     switch (sorteio) {
         case 1:  cacto.addAnimation("cacto1",cacto_img01);    
             break;
        case 2: cacto.addAnimation("cacto2",cacto_img02); 
              break;
        case 3: cacto.addAnimation("cacto3",cacto_img03); 
               break;
        case 4: cacto.addAnimation("cacto4",cacto_img04); 
               break;
        case 5: cacto.addAnimation("cacto5",cacto_img05); 
               break;
        case 6:  cacto.addAnimation("cacto6",cacto_img06);
               break;
     }




    cacto.scale= random(0.2,1);
    cacto.depth = t_rex.depth - 1;
    cacto.lifetime = 310;
    cacto_gp.add(cacto);
    
}
}
 function stopGame() {
    ground.velocityX = 0;
 }