/* ____    ___       _      _       ____  
  / ___|  / _ \     / \    | |     / ___| 
 | |  _  | | | |   / _ \   | |     \___ \ 
 | |_| | | |_| |  / ___ \  | |___   ___) |
  \____|  \___/  /_/   \_\ |_____| |____/ 

1) 

  ____    _____   ____    _____   _____    ____   _   _ 
 / ___|  |_   _| |  _ \  | ____| |_   _|  / ___| | | | |
 \___ \    | |   | |_) | |  _|     | |   | |     | |_| |
  ___) |   | |   |  _ <  | |___    | |   | |___  |  _  |
 |____/    |_|   |_| \_\ |_____|   |_|    \____| |_| |_|

1) Add Grass:
   Define another class - a blade of grass that is always
   rooted at the bottom of the canvas, and slowly grows up
   as the rain falls. Instantiate three blades of grass in
   this drawing.
2) Rain *drops*, not circles
   Rework the show() method to display more traditional
   drop shapes, not circles.

*/

// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background
 *    colorMode, HSB, fill, noStroke
 *    ellipse, line, rect
 *    random
 *    width, height
 *    createSlider
 *    strokeWeight, stroke, 
 *    collideLineCircle, collideCircleCircle
 *    loadImage, image
 *    mouseX, mouseY, cursor, noCursor, ARROW
 */

let can;
let xCan = window.innerWidth-20;
let yCan = window.innerHeight-20;

let fallSpeed = 8;
let numDrops = yCan*.75;
let maxR = 15;
let minR = 2.5;
let drops = [];
let grass = [];

let spdSlider, umbSlider;
let umbrella, umb;
let rain, raindrop;

function preload(){
  umbrella = loadImage("https://cdn.glitch.com/0e35faa4-017d-4478-96ba-d88f9cc931bb%2Fumbrella.png?v=1594841096459");
  rain = loadImage("https://cdn.glitch.com/0e35faa4-017d-4478-96ba-d88f9cc931bb%2Frain.png?v=1594843871869");
  raindrop = loadImage("https://cdn.glitch.com/0e35faa4-017d-4478-96ba-d88f9cc931bb%2FrainDrop.png?v=1594844944177");
}

function setup() {
  can = createCanvas(xCan, yCan);
  colorMode(HSB, 100);
  
  umbSlider = createSlider(50, 500, 250, 25);
  umbSlider.position(245, 15);
  
  spdSlider = createSlider(1, 20, 8);
  spdSlider.position(45, 15);
  
  for(let i=0; i<numDrops; i++) drops[i] = new drop(random(minR, maxR));
  for(let i=0; i<xCan/4; i++) grass[i] = new blade(i);
  
  umb = {
    x: null,
    y: null,
    w: 250,
  };
}

function draw(){
  background(0, 0, 95);
  
  for(const d of drops){
    d.show();
    d.fall();
    d.stop();
  }
  
  for(const g of grass){
    g.show();
    g.hit();
  }
  
  if(umb.x!=null) image(umbrella, umb.x, umb.y, umb.w, umb.w);
  
  if(umbSlider.value() != umb.w) umb.w = umbSlider.value();
  if(spdSlider.value() != fallSpeed){
    for(const d of drops){
      fallSpeed = spdSlider.value()
      d.speed = random(1, fallSpeed);
    }
  }
  
  drawIcon(umbrella, 200);
  drawIcon(rain, 2);
}

function mouseMoved(can){
  umb.x = mouseX - umb.w/2;
  if(mouseY - umb.w*.8 > 30){
    umb.y = mouseY - umb.w + umb.w*.1;
  }
  
  if(mouseY< umb.w*.8 + 30) cursor(ARROW);
  else noCursor();
}
  
function drawIcon(img, x){
  stroke(0);
  strokeWeight(1);
  fill(75);
  rect(x, 2, 30, 30);
  image(img, x, 2, 30, 30);
}

class drop{
  constructor(r){
    this.x = random(xCan);
    this.y = -r;
    this.r = r;
    this.speed = random(1, fallSpeed);
  }
  
  show(){
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.r);
  }
  
  fall(){
    this.y += this.speed;
    
    if(this.y > yCan) this.y = -this.r;
  }
  
  stop(){
    if(umb.x!=null && this.y<(umb.y-20)+umb.w/2){
      let touching = collideCircleCircle(this.x, this.y, this.r, mouseX, (umb.y-20)+umb.w/2, umb.w*.8)
      if(touching) this.y = -this.r;
    }
  }
}

class blade{
  constructor(i){
    this.x = i*4;
    this.y = yCan;
    this.y1 = yCan - random(1, 15);
    this.speed = random(3, 10);
    this.max = random(3*yCan/4-20, 3*yCan/4+20)
  }
  
  show(){
    stroke("green");
    strokeWeight(5);
    line(this.x, this.y, this.x, this.y1);
  }
  
  hit(){
    for(const d of drops){
      if(d.y >= this.y1 && this.y1 > this.max){
        let touching = collideLineCircle(this.x, this.y, this.x, this.y1, d.x, d.y, d.r)
        if(touching){
          this.y1 -= this.speed;
          d.y = -d.r;
        }
      }
    }
  }
}