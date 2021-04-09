var Boy, mask, sanitizer, virus, runningboy, ground, bg, restart;
var boyimg, maskimg, sanitizerimg, virusimg, runningboyimg, bgimg, restartimg;
var masksGroup, sanitizersGroup, virusGroup;
var Play = 1;
var End = 0;
var gameState = Play;
var score = 0;
var collectSound, dieSound;
function preload(){
Boyimg = loadImage("Sprites/Boy.png");
runningboyimg = loadImage("Sprites/boygif.png");
bgimg = loadImage("Sprites/bg.png");
maskimg = loadImage("Sprites/mask.png");
sanitizerimg = loadImage("Sprites/sanitizer.png");
virusimg = loadImage("Sprites/corona.png");
collectSound = loadSound("Sprites/collect.mp3");
dieSound = loadSound("Sprites/die.mp3");
restartimg = loadImage("Sprites/restart.png");
}

function setup() {
  createCanvas(1500,700);
  ground = createSprite(750,675,1600,20);
  
bg = createSprite(600,400,1200,800);
bg.addImage(bgimg);
bg.scale = 7;

  Boy = createSprite(100,625,20,20);
  Boy.addImage(Boyimg);
  Boy.scale = 0.9;
  Boy.debug = false;
  Boy.setCollider ("rectangle",0,0,100,200);

masksGroup = new Group();
sanitizersGroup = new Group();
virusGroup = new Group();
  
}

function draw() {
  if(gameState===Play){
    //bgSound.play();
     bg.velocityX=-4 -score/1;
 if(bg.x < 0){
 bg.x = bg.width/2;
 
 }
  background(255,255,255);  
ground.depth = Boy.depth + 1;
Boy.collide(ground);


if (keyDown ("space")){
  Boy.velocityY = -12;
  }
  
  Boy.velocityY = Boy.velocityY + 1;

spawnVirus();
spawnSanitizer();
spawnMask();

if(Boy.isTouching(masksGroup)){
  score = score+1;
  masksGroup.destroyEach();
  collectSound.play();
  }

  if(Boy.isTouching(sanitizersGroup)){
    score = score+1;
    sanitizersGroup.destroyEach();
    collectSound.play();
    }

    if(Boy.isTouching(virusGroup)){
      gameState = End;
      bg.velocityX = 0;
      virusGroup.destroyEach();
      sanitizersGroup.destroyEach();
      masksGroup.destroyEach();
      restart = createSprite(650,350,20,20);
      restart.addImage(restartimg);
      restart.scale = 1;
      dieSound.play();
      }
    }
    else if(gameState===End){
      Boy.velocityY = 0;
      masksGroup.destroyEach();
      sanitizersGroup.destroyEach();
      virusGroup.destroyEach();
      //bgSound.stop();
      
        }

        if(mousePressedOver(restart)){
          /*  gameState=Play;
            coinsGroup.destroyEach();
            rocketsGroup.destroyEach();*/
            reset();
            }

  drawSprites();
  
  fill ("white")
  textSize(50);
  text("Score: " +score,1000,180);
}


function spawnMask(){
  if(frameCount % 120 ===0){
    mask = createSprite(1500,Math.round(random(120,420)),20,20);
    mask.velocityX = -12 -score/5 ;
    mask.addImage(maskimg);
    mask.scale=0.5;
    masksGroup.add (mask);
      }
}

function spawnVirus(){
  if(frameCount % 150 ===0){
    virus = createSprite(1500,Math.round(random(230,400)),20,20);
    virus.velocityX = -20 -score/5;
    virus.addImage(virusimg);
    virusGroup.add(virus);
    virus.scale = 0.4;
    
    
      }
}

function spawnSanitizer(){
  if(frameCount % 120 ===0){
    sanitizer = createSprite(1500,Math.round(random(110,400)),20,20);
    sanitizer.velocityX = -10 -score/5;
    sanitizer.addImage(sanitizerimg);
    sanitizer.scale=0.5;
    sanitizersGroup.add (sanitizer);
      }
}

function reset(){
  gameState=Play;
  virusGroup.destroyEach();
  sanitizersGroup.destroyEach();
  masksGroup.destroyEach();
  restart.visible = false;
  score = 0;


}