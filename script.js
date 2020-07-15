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
 */

let xCan = window.innerWidth-20;
let yCan = window.innerHeight-20;

let drop1, drop2, drop3, drop4;
let maxFallSpeed = 8;
let numDrops = 25;

function setup() {
  createCanvas(xCan, yCan);
  colorMode(HSB, 100);
  
  
  
  drop1 = new drop(random(50));
  drop2 = new drop(random(50));
  drop3 = new drop(random(50));
  drop4 = new drop(random(50));
}

function draw() {
  background(0, 0, 95);
  
  drop1.show();
  drop1.fall();
  
  drop2.show();
  drop2.fall();
  
  drop3.show();
  drop3.fall();
  
  drop4.show();
  drop4.fall();
}

class drop{
  constructor(r){
    this.x = random(r, xCan-r);
    this.y = -r;
    this.r = r;
    this.speed = random(maxFallSpeed);
  }
  
  show(){
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.r);
  }
  
  fall(){
    this.y += this.speed;
  }
}