//cria as variaveis
var t_rex,t_rexRunning,t_rexJumping,t_rexCollided;
var canvas;
var ground, ground_img,ground_invis;
var cloud,cloud_img,cloud_gp;
var cacto,cacto_img01,cacto_img02,cacto_img03,cacto_img04,cacto_gp;
var cacto_img05,cacto_img06;
var gameOver, gameOver_img, restart,restart_img;
var die_song,score_song,jump_song;
var sorteio;
var pontos;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
    t_rexRunning = loadAnimation("trex3.png","trex4.png");
    t_rexJumping = loadAnimation("trex1.png");
    t_rexCollided = loadAnimation("trex_collided.png");

    ground_img = loadImage("ground2.png");

    cloud_img = loadImage("cloud.png");

    cacto_img01 = loadImage("obstacle1.png");
    cacto_img02 = loadImage("obstacle2.png");
    cacto_img03 = loadImage("obstacle3.png");
    cacto_img04 = loadImage("obstacle4.png");
    cacto_img05 = loadImage("obstacle5.png");
    cacto_img06 = loadImage("obstacle6.png");

    gameOver_img = loadImage("gameOver.png");
    restart_img = loadImage("restart.png");

    jump_song = loadSound("jump.mp3");
    score_song = loadSound("checkPoint.mp3");
    die_song = loadSound("die.mp3");


    
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);

    t_rex = createSprite(50,height-70,20,20);
    t_rex.addAnimation("running",t_rexRunning);
    t_rex.addAnimation("jumping",t_rexJumping);
    t_rex.addAnimation("collided",t_rexCollided);
    t_rex.scale = 0.5;
    t_rex.debug = false;
    t_rex.setCollider("circle",0,0,30);

    ground = createSprite(width/2,height-30,width,20);
    ground.addImage("ground", ground_img);
    

    ground_invis = createSprite(300,height-10,600,10);
    ground_invis.visible = false;

    restart = createSprite(width/2,height/2,20,20);
    gameOver = createSprite(width/2,restart.y-40,100,20);
    
    gameOver.addImage(gameOver_img);
    restart.addImage(restart_img);
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    gameOver.visible = false;
    restart.visible = false;

    cacto_gp = new Group();
    cloud_gp = new Group();

    pontos = 0;


    //console.log(gameState);
    
}


function draw(){
    background("white");

    if(t_rex.isTouching(cacto_gp)){
        gameState = END;
        t_rex.changeAnimation("collided",t_rexCollided);
        //die_song.play();
    }
    //console.log(gameState);
    
    if (gameState === PLAY) {

        pontos = Math.round(frameCount/2);

        if (pontos >0 && pontos%100 === 0) {
            score_song.play();
        }

        if(touches.lenght > 0 || keyDown("space") && t_rex.y >= height-60) {
            t_rex.velocityY = -10;
            jump_song.play(); 
            //t_rex.changeAnimation("jumping",t_rexJumping);
            touches = [];
        }
       
        ground.velocityX = -(2+(pontos/100));

        if(ground.x < 0){
            ground.x = ground.width/2;
        }

        

        spawnClouds();
        spawnObstacles();
        //console.log(gameState);
        
    } else if(gameState === END) {
        stopGame();

        if(mousePressedOver(restart)){
            resetGame();
        }
    }
    gravity();

    //console.log(gameState);

    t_rex.collide(ground_invis);

    textSize(20);
    strokeWeight(2);
    text("Score: "+pontos,width-200,height-180);

    

    drawSprites();
}

function gravity() {
    t_rex.velocityY += 0.5;
}

function spawnClouds() {
    if(frameCount%100 === 0){
        cloud = createSprite(width,100,30,10);
        cloud.addImage("cloud",cloud_img);
        cloud.velocityX = -(2+(pontos/100));
        cloud.y = Math.round(random(height-180,height-100));
        cloud.scale = random(0.2,1);
        cloud.depth = t_rex.depth -1;
        cloud.lifetime = 310;
        cloud_gp.add(cloud);
    }
    
}

function spawnObstacles() {
    if(frameCount % 150 === 0){
        cacto = createSprite(width,height-40,10,30);
        sorteio = Math.round(random(3,3));
        switch (sorteio) {
            case 1: cacto.addImage("cacto1",cacto_img01);
            cacto.scale = 0.4;
                break;
            case 2: cacto.addImage("cacto2",cacto_img02);
            cacto.scale = 0.3;
                break;
            case 3: cacto.addImage("cacto3",cacto_img03);
            cacto.scale = 0.3;
                break;
            case 4: cacto.addImage("cacto4",cacto_img04);
            cacto.scale = 0.3;
                break;
            case 5: cacto.addImage("cacto5",cacto_img05);
            cacto.scale = 0.3;
                break;
            case 6: cacto.addImage("cacto6",cacto_img06);
            cacto.scale = 0.3;
                break;
        
        }
        cacto.velocityX = -(2+(pontos/100));
        cacto.depth = t_rex.depth -1;
        cacto.lifetime = 310;
        cacto_gp.add(cacto);
    }
}

function stopGame(){
    ground.velocityX = 0;
    cacto_gp.setVelocityXEach(0);
    cloud_gp.setVelocityXEach(0);
    cacto_gp.setLifetimeEach(-1);
    cloud_gp.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;

}
function resetGame(){
    frameCount = 0;
    pontos = 0;
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    cacto_gp.destroyEach();
    cloud_gp.destroyEach();
    t_rex.changeAnimation("running",t_rexRunning);
    
}

