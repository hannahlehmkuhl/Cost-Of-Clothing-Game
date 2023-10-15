let bigRectDimensions = { x: 0, y: 0, w: 0, h: 0 };
let clothingItems = [];
let gameOver = false;
let numSquares = 4;

var pants, shirt, shoes, headband;

function preload() {
setting = loadImage("img/G3-background.png")
avatar = loadImage("img/G3-avatar.png")
pants = loadImage("img/G3-darkpants.png");
shirt = loadImage("img/G3-whiteshirt.png"); 
shoes = loadImage("img/G3-sneakers.png"); 
headband = loadImage("img/redbow.png"); 
myFont = loadFont("img/slkscr.ttf")
}


function setup() {
  createCanvas(700, 500);
  rectMode(CENTER);

  bigRectDimensions.x = width / 2;
  bigRectDimensions.y = height / 2;
  bigRectDimensions.w = width * 0.3;
  bigRectDimensions.h = height * 0.8;

  textSize(30);
  
  // Create 6 squares around perimeter
  clothingItems[0] = new clothingItem(90,80,shoes)
  clothingItems[1] = new clothingItem(90,170,pants)
  clothingItems[2] = new clothingItem(85,85,shirt)
  clothingItems[3] = new clothingItem(90,70,headband)

  
}

function draw() {
  noStroke();
  imageMode(CORNER);
  background(200);
  imageMode(CENTER);
  // Draw the big rectangle
  rect(
    bigRectDimensions.x,
    bigRectDimensions.y,
    bigRectDimensions.w,
    bigRectDimensions.h
  );

 image(setting,width/2,height/2,width,height);
 image(avatar,width/2,height/2,100,330);


  // Check if all small squares are inside the big rectangle
  let allInside = true;
  // go through all the small squares with a for loop
  for (let i = 0; i < clothingItems.length; i++) {
    // if the current small square is NOT inside the big rectangle
    if (!clothingItems[i].inside(bigRectDimensions)) {
      // set the allInside variable to false because at least one small square is not in the rectangle
      allInside = false;
    }
  }

  // Display "You are ready for class" text if all small squares are inside of big one
  if (allInside) {
    background(137, 217, 194);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(24);
    textFont(myFont);
    text("Well Done!", width / 2, 450);
    image(avatar,width/2,height/2,100,330)
  }

  // Draw and update small squares
  for (let i = 0; i < clothingItems.length; i++) {
    clothingItems[i].display();
    clothingItems[i].update();
  }
}

function mousePressed() {
  // Check if the mouse is pressed inside any small square
  for (let i = 0; i < clothingItems.length; i++) {
    let r = clothingItems[i];
    if (r.contains(mouseX, mouseY)) {
      r.dragging = true;
      r.offsetX = mouseX - r.x;
      r.offsetY = mouseY - r.y;
    }
  }
}

function mouseReleased() {
  // Release the dragged small square
  for (let i = 0; i < clothingItems.length; i++) {
    clothingItems[i].dragging = false;
  }
}

//defines a class called square, which manages the 6 squares
class clothingItem {
  constructor(w,h,img) {
    this.x = random(width - 50);
    this.y = random(height - 50);
    this.w = w;
    this.h = h;
    this.img = img;
    this.dragging = false;
  }

  display() {
    fill(100, 100, 100, 100);
    image(this.img, this.x, this.y, this.w, this.h);
  }

  contains(px, py) {
    return (
      px > this.x - this.w / 2 &&
      px < this.x + this.w / 2 &&
      py > this.y - this.h / 2 &&
      py < this.y + this.h / 2
    );
  }

  //this function updates the position if the rectangle is being dragged
  update() {
    if (this.dragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  //this function returns true if the small square is inside the big one
  inside(bigRect) {
    //the following if statement checks if all 4 sides of a small square are contained within the 4 sides of the big rectangle

    if (
      this.x - this.w / 2 > bigRect.x - bigRect.w / 2 &&
      this.x + this.w / 2 < bigRect.x + bigRect.w / 2 &&
      this.y - this.h / 2 > bigRect.y - bigRect.h / 2 &&
      this.y + this.h / 2 < bigRect.y + bigRect.h / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
