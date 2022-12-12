import p5 from "p5";
import { FFT } from "p5/lib/addons/p5.sound";
import { convertArray } from "three/src/animation/AnimationUtils";
//import "../audio/piano2-CoolEdit.mp3"
import "../images/moon.png"
import "../images/jupiter.png"
import "../images/earth.png"

var jupiter_img, moon_img, earth_img;


const sketch = (s) => {
  let xspacing = 1; // Distance between each horizontal location
  let jsize = 80 // Size of Jupiter
  let msize = 16 // Size of Moon
  let esize = 160 // Size of Earth 
  let w = window.innerWidth/2; // Width of entire wave
  let theta = 0.0; // Start angle at 0
  let amplitude = 58; // Height of wave
  let period = window.innerWidth/3 - msize; // How many pixels before the wave repeats
  let dx; // Value for incrementing x
  let yvalues; // Using an array to store height values for the wave
  let etrans = 0;
  let prevobsx = esize/2;
  let prevobsy = 3*window.innerHeight/4 + 1.5*amplitude;
  let prevactx = esize/2;
  let prevacty = 0;//3*window.innerHeight/4 + 1.5*amplitude*Math.cos(0.05*yvalues.length);



  s.setup = () => {
    //sound = s.loadSound('./audio/piano2-CoolEdit.mp3');
    moon_img = s.loadImage("./images/moon.png");
    jupiter_img = s.loadImage("./images/jupiter.png");
    earth_img = s.loadImage("./images/earth.png");
    let cnv = s.createCanvas(window.innerWidth, window.innerHeight);
    dx = (2*Math.PI / period) * xspacing;
    s.background(0);
    s.fill(255);
    s.textSize(30);
    s.text('Orbital Position of Io', window.innerWidth/2-150, 2*window.innerHeight/4 + 30)
    //s.text('Earth moving towards Jupiter', 100, 2*window.innerHeight/4 + 100)
    //s.text('Earth moving away from Jupiter', 2*window.innerWidth/4+100, 2*window.innerHeight/4 + 100)
    s.text('Earth stationery with respect to Jupiter', 2*window.innerWidth/4-250, 2*window.innerHeight/4 + 100)
    yvalues = new Array(Math.floor((w - (msize + esize)/2)/xspacing));
    prevacty = 3*window.innerHeight/4 + 1.5*amplitude*Math.cos(dx*yvalues.length);
    s.strokeWeight(5);
    s.stroke('green');
    s.fill('green');
    s.line(window.innerWidth - 500, 3/4*window.innerHeight + 1.5*amplitude + 50, window.innerWidth - 450, 3/4*window.innerHeight + 1.5*amplitude + 50);
    s.stroke('red');
    s.fill('red');
    s.line(window.innerWidth - 500, 3/4*window.innerHeight + 1.5*amplitude + 100, window.innerWidth - 450, 3/4*window.innerHeight + 1.5*amplitude + 100);
    s.strokeWeight(2);
    s.stroke('white');
    s.fill('white');
    s.text('Observed Position', window.innerWidth - 420, 3/4*window.innerHeight + 1.5*amplitude + 60)
    s.text('Actual Position', window.innerWidth - 420, 3/4*window.innerHeight + 1.5*amplitude + 110)
    //s.drawingContext.setLineDash([5, 5])
    //s.line(window.innerWidth/2 - 5, window.innerHeight/2 + 35, window.innerWidth/2 - 5, window.innerHeight);
    s.drawingContext.setLineDash([0,0])



    //addEventListener("resize", (event) => {s.setup();});
  }

  s.draw = () => {
    

    s.strokeWeight(2);
    s.fill(0);
    s.stroke('black');
    s.rect(0, 0, window.innerWidth, window.innerHeight/2);
    s.stroke('white');
    s.line(0, window.innerHeight/2 + 35, window.innerWidth, window.innerHeight/2 + 35);
   
    if(s.calcWave()< Math.PI){
      s.renderJupiter();
      s.renderWave();
      s.renderLo();
    } else {
      s.renderWave();
      s.renderLo();
      s.renderJupiter();
    }
    s.renderEarth();
    etrans += window.innerWidth;
    etrans %= window.innerWidth;
    s.strokeWeight(5);
    s.stroke('green');
    s.fill('green');
    s.line(prevobsx, prevobsy, etrans + esize/2, 3/4*window.innerHeight + 1.5*yvalues[0]);//yvalues.length-Math.abs(yvalues.length-etrans)]);
    s.stroke('red');
    s.fill('red');
    s.line(prevactx, prevacty, etrans + esize/2, 3/4*window.innerHeight + 1.5*yvalues[yvalues.length-1]);
    prevobsx = etrans + esize/2;
    prevobsy = 3/4*window.innerHeight + 1.5*yvalues[0];//yvalues.length-Math.abs(yvalues.length-etrans)];
    prevactx = prevobsx;
    prevacty = 3/4*window.innerHeight + 1.5*yvalues[yvalues.length-1];

  }
  s.calcWave = () => {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.05;
    etrans += 2*xspacing;

    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = Math.cos(x) * amplitude;
      x += dx;
    }
    return x % (2*Math.PI);
  }
  s.renderWave = () => {
    s.stroke(255);
    //for (let x = yvalues.length-Math.abs(yvalues.length-etrans); x < yvalues.length-msize/2; x++) {
    //  
    //  let y0 = window.innerHeight / 4  + yvalues[x-1]
    //  let y1 = window.innerHeight / 4  + yvalues[x]
    //  if(etrans < yvalues.length){
    //    let x0 = x * xspacing + xspacing + esize/2
    //    s.line(x0, y0, x0 + xspacing, y1);
    //  } else {
    //    let x0 = -x * xspacing + xspacing - esize/2
    //    x0 += window.innerWidth
    //    s.line(x0 + xspacing, y0, x0, y1);
    //  }
    //}
    for (let x = yvalues.length-Math.abs(yvalues.length); x < yvalues.length-msize/2; x++) {
      let y0 = window.innerHeight / 4  + yvalues[x-1]
      let y1 = window.innerHeight / 4  + yvalues[x]
      let x0 = x * xspacing + xspacing + esize/2
      s.line(x0, y0, x0 + xspacing, y1);
    }

  }

  s.renderLo = () => {
    let x0 = window.innerWidth/2 - (msize)/2;
    let y0 = window.innerHeight / 4  + yvalues[yvalues.length-1] - (msize)/2;

    s.fill(255);
    s.stroke(255);
    s.text('Io', x0 - 40 , y0 + msize/2)
    s.image(moon_img, x0, y0, msize, msize);
  }

  s.renderJupiter = () => {
    let x0 = window.innerWidth/2 - jsize/2
    let y0 = window.innerHeight / 4  - (jsize / 2)
    //s.ellipse(x0, y0, 16, 16);

    s.fill(255);
    s.stroke(255);
    s.text('Jupiter', x0 + jsize + 5, y0 + jsize/2 + 11)
    s.image(jupiter_img, x0, y0, jsize, jsize);
  }
  s.renderEarth = () => {
    let x0 = 0;etrans
    let y0 = window.innerHeight / 4  - (jsize + esize/2)/ 2
    //s.ellipse(x0, y0, 16, 16);
    

    s.text('Earth', x0 + esize/2 - 40, y0 - 20)
    s.image(earth_img, x0, y0, esize, esize);
  }
}
const sketchInstance = new p5(sketch);