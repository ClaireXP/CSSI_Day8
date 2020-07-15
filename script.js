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
 *    ellipse
 *    random
 *    width, height
 *    createSlider
 *    strokeWeight, stroke, 
 */
 *    collideLineCircle

let xCan = window.innerWidth-20;
let yCan = window.innerHeight-20;

let fallSpeed = 8;
let numDrops = yCan/3;
let maxR = 15;
let minR = 2.5;
let drops = [];

let spdSlider;

function setup() {
  createCanvas(xCan, yCan);
  colorMode(HSB, 100);
  spdSlider = createSlider(1, 20, 8);
  spdSlider.position(10, yCan-10);
  
  for(let i=0; i<numDrops; i++) drops[i] = new drop(random(minR, maxR));
  for(let i=0; i<xCan/2; i++) drops[i] = new drop(random(minR, maxR));
}

function draw() {
  background(0, 0, 95);
  
  if(spdSlider.value() != fallSpeed){
    for(const d of drops){
      fallSpeed = spdSlider.value()
      d.speed = random(1, fallSpeed);
    }
  }
  
  for(const d of drops){
    d.show();
    d.fall();
  }
}

class drop{
  constructor(r){
    this.x = random(r, xCan-r);
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
}

class grass{
  constructor(){
    this.x = random(0, xCan);
    this.y = yCan;
    this.y1 = yCan - random(1, 15);
    this.speed = random(1, fallSpeed);
  }
  
  show(){
    stroke(120, 100, 50);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y1);
  }
  
  grow(){
    this.y1 -= this.speed;
    
    if(this.y > yCan) this.y = -this.r;
  }
}
  
  cohit(d){
    collideLineCircle(this.x, this.y, this.x, this.y1, d.x, d.y, d.r)
  }