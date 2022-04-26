var canvas1, ctx, container;
canvas1 = document.querySelector("#myCanvas");
ctx = canvas1.getContext("2d");
var ball;
var message = "gravity simulator";

var wind = (Math.random()*10);
var vx ; // new acceleration towards x axis with wind effect
var vy; // speed at which the ball move

var gravity = 0.5; // m/s^2
var bounce = 0.7; //elasticity estimate 
var xFriction = 0.1;
var x = Math.floor(Math.random() * innerWidth);

function Conversion(meters) //converts meters to pixels canvas assumed to be 3m 
{
    let pixels = (innerHeight - (meters * innerHeight)  / 3 ); //since the origin of a comp. canvas is top left
    return pixels;
}  
let meters = 1.72;  
var y = Conversion(meters) 

//for graph 
xaxis = [];
yaxis = [];

ball = { x, y, radius: 20, color: "red", mass: 1 }; //mass in kgs

var t0= performance.now();
var myInterval = setInterval(draw, 1000 / 35); //calls function draw at the specified interval

function init() {
  setupCanvas();
  vx = wind / ball.mass ;     //acc= force /mass
  vy = gravity / ball.mass; 
  ball;

}//end init method

function draw() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  //display some text
  ctx.fillStyle = "blue";
  ctx.font = "50px Arial";
  ctx.fillText(message, 50, 50);

  //draw cirlce
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  ballMovement();
}



function ballMovement() {
  ball.x += vx;
  ball.y += vy;
  var  initialVy = vy + gravity;
  vy += gravity;
  

  //If either wall is hit, change direction on x axis
  if (ball.x + ball.radius > canvas1.width || ball.x - ball.radius < 0) {
    vx *= -1;
    // console.log(xaxis, yaxis)

    // xaxis.push(x);
    // yaxis.push(y);
  }

  // Ball hits the floor
  if (ball.y + ball.radius > canvas1.height) {// ||
    var finalVy = vy;
    var time = (finalVy - initialVy) / gravity ; 
    console.log(time);
    // Re-positioning on the base
    ball.y = canvas1.height - ball.radius;
    //bounce the ball
    vy *= -bounce;

    //do this otherwise, ball never stops bouncing
    if (vy < 0 && vy > -2.1)
      vy = 0;
    
    //do this otherwise ball never stops on xaxis
    if (Math.abs(vx) < 1.1){
      vx = 0;
      if(vx=0){
        if(vy=0)
        clearInterval(myInterval); //stop callong the function when the vall stops.
        var t1= performance.now();
        console.log(myInterval)
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);  //to get time ball stopped
      }

    }
      xF();  
    
  }

}

function xF() { //friction function
  if (vx > 0)
    vx = vx - xFriction;
  if (vx < 0)
    vx = vx + xFriction;
}


function setupCanvas() {//setup canvas
  container = document.createElement('div');
  container.className = "container";

  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  document.body.appendChild(container);
  container.appendChild(canvas1);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
}


function drawGraph(){
  //wait to draw graph last
const ctx1 = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['1sec', '10secs','20secs', '30 secs', '40secs', '50sec' ],
        datasets: [{
            label: '#displacement y position',
            data: yaxis,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
  }
//drawGraph();