let bubbles = [];
let nav, d, j;
let opn = 0;
let cou = 100;
let mic;
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width);
	mic= new p5.AudioIn();
	mic.start();
  if (width < 800) {
    d = createElement('div', '');
    d.id('d');
    d.parent('ain');
    j = createElement('i', '');
    j.parent('d');
    j.class('fa fa-bars fa-2x');
    d.position(10, 10);


  }
  for (i = 0; i < 50; i++) {
    let bubble = new Bubble(random(width), random(0, height), 0, 0, 0);
    bubbles.push(bubble);
  }
  let rainb = selectAll(".rain");
  for (let i = 0; i < rainb.length; i++) {
    let x = 200; // Math.floor(random(100, 255));
    rainb[i].style("background-color", "rgba(" + x + ',' + x + ',' + x + ',0.5)');
    rainb[i].style('padding', '2vh');
    rainb[i].style('border-radius', '10%');
    rainb[i].mouseOver(function() {
      this.style('font-size', '15pt');
    });
    rainb[i].mouseOut(function() {
      this.style('font-size', '13pt');
    });
  }
  nav = select('#nav');
}

function mousePressed() {
  for (i = 0; i < 10; i++) {
    let bubble = new Bubble(mouseX, mouseY, random(-10, 10), random(-10, 10), 5);
    bubbles.push(bubble);
  }
}

function draw() {
	let vol=mic.getLevel();
  cou++;
  if (cou % 100 == 0) {
    changeImg();
  }
  background(0, 0, 0, 50);
  noStroke();
  if (random(1) < 0.01) {
    let bubble = new Bubble(random(width), random(0, height / 2), random(-5, -15), random(5, 15), 5);
    bubbles.push(bubble);
  }
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
    bubbles[i].show();

    if (bubbles[i].check()) {
      bubbles.splice(i, 1);
    }
  }
  fill(120, 120, 120, 120);
  beginShape();
  vertex(0, height);
  for (let i = 0; i < width; i += 5) {
    vertex(i, height - (50 + (( vol*height)/2?( vol*height)/2:height/2) * Math.pow(2, -(i - mouseX) * (i - mouseX) / 20000)));
  }
  vertex(width, height);
  endShape(CLOSE);
  if (mouseX < width * 0.1) {
    nav.style('visibility', 'visible');
    nav.class('animated fadeInLeft');
    nav.removeClass('animated fadeOutLeft');
  } else if ((mouseX > width * 0.3 && width > 800) || (mouseX > width * 0.6 && width < 800)) {
    //nav.style('visibility','hidden');
    nav.removeClass('animated fadeInLeft');
    nav.class('animated fadeOutLeft');
  }

}
class Bubble {
  constructor(x, y, vx, vy, dalp) {
    this.x = x;
    this.y = y;
    this.r = random(1, 4);
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;
    this.g = 0.5;
    this.dalp = dalp;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    //this.vy+=this.g;
    this.alpha -= this.dalp;
  }
  show() {
    fill(random(220, 255), random(240, 255), random(230, 255), this.alpha);
    ellipse(this.x, this.y, this.r, this.r);
  }
  check() {
    return this.alpha < 0;
  }
};

function chan(x) {
  opn = x;
}

function changeImg() {
  let im = select('#image-blurred-edge');
  im.style('background-image', "url('img/aka" + (Math.floor(cou / 100)) % 9 + ".jpg')")
}
