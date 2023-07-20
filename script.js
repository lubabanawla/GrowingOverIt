/* VARIABLES */
let player;
let walls;
let obstacle;
let flower;
let flowertwo;
let flowerthree;


/* PRELOAD LOADS FILES */
function preload(){
eggImg = loadImage("assets/butterflyegg.png");
floweroneImg = loadImage("assets/flowerone.png");
flowertwoImg = loadImage("assets/flowertwo.png");
flowerthreeImg = loadImage("assets/flowerthree.png");
birdImg = loadImage("assets/bird.png");
caterpillarImg = loadImage("assets/caterpillar.png");
pupaImg = loadImage("assets/pupa.png");
butterflyImg = loadImage("assets/butterfly.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
background(135,206,250);
  // create button
  enterButton = new Sprite(width/2, height/2+100);

  // sprites
   player = new Sprite(eggImg, 350, 50, 40, 40);
   player.pos = { x: -100, y: -100}
  player.rotationLock = true;
   
  obstacle = new Sprite(birdImg, 110,50,40,40);
  obstacle.pos = { x: -100, y: -100}
  obstacle.rotationLock = true;

  // img resize
  eggImg.resize(50,0)
  floweroneImg.resize(50, 0)
  flowertwoImg.resize(50, 0)
  flowerthreeImg.resize(50, 0)
  birdImg.resize(60,0)
  caterpillarImg.resize(60,0)
  pupaImg.resize(60,0)
  butterflyImg.resize(60,0)
}

/* DRAW LOOP REPEATS */
function draw() {
background(135,206,250)
textAlign(CENTER);
textSize(30);
noStroke();

  // HOME SCREEN
text("Growing Over It!", width/2, height/2-100)
textSize(15);
text("Instructions: Avoid the bird\nthat’s coming to eat you\nand become a beautiful\nbutterfly :). Please wait 3-4\nseconds before playing.\nLet the bird go on screen.", 200, 150)
  
// enter button
enterButton.w = 100
  enterButton.h = 50
  enterButton.collider = 'k'
  enterButton.color = 'white'
  enterButton.text = 'Enter'
  enterButton.textColor = 'black'

// enter button pressed
if (enterButton.mouse.presses()) {
  showScreen1();
  screen = 1;
}

if (screen == 1) {
  background(135,206,250);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text("Start", 330, 20);
    text("End", 22, 395);

// sprite movement
    if (kb.pressing("left")) {
      player.vel.x = -3;
    } else if (kb.pressing("right")) {
      player.vel.x = 3;
    } else if (kb.pressing("up")) {
      player.vel.y = -3;
    } else if (kb.pressing("down")) {
      player.vel.y = 3;
    } else {
      player.vel.x = 0;
      player.vel.y = 0;
    }

    // dont hit maze
    if(player.y < 20){
      player.y = 20;
    }
     
  // obstacle
    // Set the follower's velocity to move towards the target sprite
  obstacle.vel.x = (player.pos.x - obstacle.pos.x) * 0.01;
 obstacle.vel.y = (player.pos.y - obstacle.pos.y) * 0.01;

  // Update the follower's position
   obstacle.pos.x =  obstacle.pos.x + obstacle.vel.x;
   obstacle.pos.y = obstacle.pos.y + obstacle.vel.y;

    if(player.collides(flower)){
    flower.x = -500;
    player.img = caterpillarImg
    player.width = 50;
    player.height = 50;
  }

      if(player.collides(flowerthree)){
    flowerthree.x = -500;
    player.img = pupaImg
    player.width = 50;
    player.height = 50;
  }

        if(player.collides(flowertwo)){
    flowertwo.x = -500;
    player.img = butterflyImg
    player.width = 50;
    player.height = 50;
  }


    // you win
  if(player.y > 375){
    background(209,237,242);
    showScreen2();
  }
  
    // you lose
  if (player.collides(obstacle)){
      background(135,206,250);
      showScreen3();
    screen = 3;
    }
}

if (screen == 3) {
  background(135,206,250);
  fill(0, 0, 255);
  textSize(30);
  textAlign(CENTER);
  text("YOU DIED", 200, 150);
  textSize(15);
  text("Better luck next time!\nBut it’s okay.\nYou can always restart\nby refreshing the page.\nYou have the opportunity to learn\nfrom your mistakes.\nThat’s what we call growth!", 200, 200);
}
  
}

/* FUNCTIONS */
function showScreen1(){
background(135,206,250);
drawMaze();
enterButton.pos = { x: -100, y: -100};
player.pos = { x: 350, y: 50};

// flower 1 
flower = new Sprite(floweroneImg, 350,350,40,40, "k")
flower.rotationLock = true;

// flower 2
flowertwo = new Sprite(flowertwoImg, 150,350,40,40, "k")
flowertwo.rotationLock = true;

// flower 3 
flowerthree = new Sprite(flowerthreeImg, 50,200,40,40, "k")
flowerthree.rotationLock = true;  
}

function drawMaze(){
  //Create the maze
  walls = new Group();
  walls.color = color(0);
  walls.collider = "s";
  
  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height/2, 5, height - 15);  
  new walls.Sprite(150, 60, 5, 100);
  new walls.Sprite(width/2 + 35, 390, 325, 5);
  new walls.Sprite(50, 300, 75, 5);  
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);
}

function showScreen2(){
background(135,206,250);
  player.pos = { x: -500, y: 380 };
  obstacle.pos = { x: -100, y: -100}
  walls.x = -1000;
 fill(0, 0, 255);;
  textSize(30);
  textAlign(CENTER);
  text("CONGRATS!", 200, 150);
  textSize(15);
  text("You grew to become a butterfly.\n Even though a bird went after you,\nyou persevered and endured.\nNow that's hope.", 200,  200)
}

function showScreen3(){
  background(135,206,250);
  obstacle.collider = "s"
  obstacle.pos = { x: -500, y: -500 };
  player.pos = { x: -500, y: 370 };
  flower.pos = { x: -500, y: -500 };
  flowertwo.pos = { x: -500, y: -500 };
  flowerthree.pos = { x: -500, y: -500 }; 
  walls.x = -1000;
}