clouds = [];
numClouds = 70;

function preload() {
  cloudImage = loadImage("img/cloud.png");
  GameText = loadImage("img/G1-background.png")
}

function setup() {
  // Create a canvas with a size of 400x400 pixels
  createCanvas(700, 500);
  // Disable stroke (outline) for shapes
  noStroke();
  for (var i = 0; i < numClouds; i++) {
    clouds[i] = new cloud();
  }
}

function draw() {
  background(GameText);
  for (var i = 0; i < numClouds; i++) {
    clouds[i].display();
  }
}

function mouseClicked() {
  for (var i = 0; i < numClouds; i++) {
    // Check if the mouse click is inside the square
    if (
      mouseX >= clouds[i].x &&
      mouseX <= clouds[i].x + clouds[i].size &&
      mouseY >= clouds[i].y &&
      mouseY <= clouds[i].y + clouds[i].size
    ) {
      // Set the squareVisible flag to false to make the square disappear
      clouds[i].isVisible = false;
    }
  }
}

class cloud {
  constructor() {
    this.size = 140; // Size of the square
    this.x = random(-80, width - 80); // X-coordinate of the square
    this.y = random(-80, height - 80); // Y-coordinate of the square
    this.isVisible = true; // Flag to track if the square is visible
  }

  display() {
    if (this.isVisible) {
      image(cloudImage, this.x, this.y, this.size, this.size);
    }
  }
}
