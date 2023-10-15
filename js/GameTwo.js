//An adaptation of avoid the squares, called collect the squares. You use the mouse position to collect the green squares. Green squares increase score by one, red squares decrease score by one. If you get 15 green squares, you win.

var clothes;
var playerX; // X-coordinate of the player square
var playerWidth = 150; // Size of the player square
var playerHeight = 100;
var squareX, squareY; // X and Y coordinates of the moving square
var clothesIndex = 0;
var squareSize = 60; // Size of the moving square
var squareSpeed = 6; // Speed of the moving square
var entered = false; // collision checking variable
var exited = false; // collision checking variable
var score = 0;
var bag;

function preload() {
  gameover = loadImage("img/gameover.png.png")
  bag = loadImage("img/bag.png")
  landfill = loadImage('img/G2-landfill.png')
  myFont = loadFont('img/Silkscreen-Regular.ttf');
  var redboots = loadImage("img/G3-redboots.png");
  var stripesweater = loadImage("img/G3-stripesweater.png");
  var flowerskirt = loadImage("img/G3-flowerskirt.png");
  var blueshirt = loadImage("img/G3-blueshirt.png");
  var blueskirt = loadImage("img/G3-blueskirt.png");
  var blacksweater = loadImage("img/G3-blksweater.png");
  var darkpants = loadImage("img/G3-darkpants.png");
  var greenskirt = loadImage("img/G3-greenskirt.png");
  var whiteshirt = loadImage("img/G3-whiteshirt.png");
  var blackboots = loadImage("img/G3-blkboots.png");
  var orangeshirt = loadImage("img/G3-orangeshirt.png");
  clothes = [redboots, stripesweater, flowerskirt, blueshirt,blueskirt,blacksweater,darkpants,greenskirt,whiteshirt,blackboots,orangeshirt];
}

function setup() {
  createCanvas(700, 500);
  playerX = width / 2;
  squareX = random(width - squareSize);
  squareY = -squareSize;
  textSize(24);
  textFont(myFont)
  imageMode(CENTER);
  rectMode(CENTER);
  print(clothes.length);
  colorMode(RGB)
}

function draw() {
  // background(landfill);
  image(landfill,width/2,height/2,width,height )
  // Check for collision between player and moving square
  if (
    squareY + squareSize / 2 > height - playerHeight &&
    squareY - squareSpeed + squareSize / 2 < height - playerHeight &&
    squareX - squareSize / 2 > playerX - playerWidth / 2 &&
    squareX - squareSize / 2 + squareSize < playerX + playerWidth / 2
  ) {
    squareX = random(width - squareSize);
    //move it to the top
    squareY = -squareSize;
    //randomize its speed
    squareSpeed = random(6, 12);
    clothesIndex++;
  } else if (squareY > height) {
    squareSpeed = 0;
    image(gameover,width/2,height/2+50,200,100 )
    
  }

  // Display the player square
  fill(0, 0, 0);
  //bag instead of clothes
  image(bag,playerX, height - playerHeight / 2, playerWidth, playerHeight);


  // Move the moving square vertically
  squareY += squareSpeed;

  // Reset the moving square when it goes off the bottom

  playerX = mouseX;

  if (clothesIndex == clothes.length) {
    squareSpeed = 0;
    clear();
    background(137, 217, 194);
    fill(255);
    textAlign(CENTER);
    text("YOU GOT THEM ALL!!", width / 2, height / 2);
  } else {
    // Display the moving square
    image(clothes[clothesIndex], squareX, squareY, squareSize, squareSize);
  }
}
