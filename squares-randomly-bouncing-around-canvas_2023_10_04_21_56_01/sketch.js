//this program draws 10 squares and moves them randomly around the canvas
//when they hit the edges of the canvas, they bounce off and move in the opposite direction

var numSquares = 10;

var squares = []; //this variable is an array where we will hold our square objects

function setup() {
  createCanvas(600, 400);
  noStroke();

  // This loop runs ten times, and each time it creates a new square object with a random location
  
  for (let i = 0; i < numSquares; i++) {
    let x = random(width - 50); //random x value
    let y = random(height - 50); //random y value
    squares.push(new square(x, y)); //the squares are managed with the square class
  }
}

function draw() {
  background(240);

  fill(50, 150, 70, 100); 

  // Every time the draw function loops, this loop runs once for each square (squares.length) 

  
  for (let i = 0; i < squares.length; i++) {
    squares[i].move();
    squares[i].display();
  }
}

class square {
  
  //the square class keeps track of the x and y position for each square, how big it is,
  // and the speed its moving at (which also controls its direction depending on if speed is 
  // positive or negative)
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  move() {

    // Move the square by adding the speed values to the x and y locations
    
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // if the x value of a square reaches the left or right of the canvas then change the direction of its movement by multiplying xSpeed by -1
    
    if (this.x <= 0 || this.x >= width - this.size) {
      this.xSpeed *= -1;
    }
    
    // if the y value of a square reaches the top or bottom of the canvas then change the direction of its movement by multiplying ySpeed by -1
    
    if (this.y <= 0 || this.y >= height - this.size) {
      this.ySpeed *= -1;
    }
  }
  
  //the display method simply draws the square at its current position
  display() {
    rect(this.x, this.y, this.size); 
  }
}
