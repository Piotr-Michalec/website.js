var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var intervalRatio = 80;
//variables for snakes head
var x = canvas.width/2;
var y = canvas.height/2;
var snakeInterval;

//var for snakes body
var bodyElements = [];
//variables for snakes food

var foodX;
var foodY;
//gameplay variables
var score=0;
var lives=1;
var foodEaten=false;
//prevents movement in opposite direction
var snakeDirectionID =0;

//keyboard input

canvas.onkeydown = function (e) {
    if (e.key === '38' || e.key === '40') {
        e.view.event.preventDefault();
    }
}
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        moveLeft();

    }
    else if (event.keyCode == 39) {
        moveRight();
    }
    else if (event.keyCode == 38) {
        moveUp();
        event.preventDefault();
    }
    else if (event.keyCode == 40) {
        moveDown();
        event.preventDefault();
    }
}, true);

//call function which returns number of lives, display press start to play or game over
gameInfo();

function gameInfo(){
    document.getElementById("lives").innerHTML=("Lives = "+lives);
    if(score==0||lives==3){
        document.getElementById("gameplayInfo").innerHTML=("Press Start to play!")
    }
    else if(lives==0){
        document.getElementById("gameplayInfo").innerHTML=("GAME OVER!!!")
    }
else{

}
    
}

function draw(a, b) {
    //draw the snake
   if(lives!=0){
    updateBodylength(); 
    updateSpeed();
    foodDetection();
    borderDetection();
    bodyDetection();
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    context.fillRect(x, y, 10, 10);
    context.fillStyle = "#8cf442";
    context.fill();
    
   
    var a;
    var b;
    x = x + a;
    y = y + b;
    //draw the food
    context.fillRect(foodX, foodY, 10, 10);
    context.fillStyle = "#f44277";
    context.fill();

   }
   else{
    context.clearRect(0, 0, canvas.width, canvas.height)

   }

   //drawTheBody
   for(i=0; i<bodyElements.length;i++){


    context.fillRect(bodyElements[i].bx,bodyElements[i].by, 10, 10);
    context.fillStyle = "#0095DD";
    context.fill();

   }
  
}


function moveUp() {
    if (snakeDirectionID!=2){
    snakeDirectionID =1;
    clearInterval(snakeInterval);
    snakeInterval = setInterval(draw, intervalRatio, 0, -5)
}
}

function moveDown() {
    if (snakeDirectionID!=1){
    snakeDirectionID =2;
    clearInterval(snakeInterval);
    snakeInterval = setInterval(draw, intervalRatio, 0, 5)
}
}


function moveLeft() {
    if (snakeDirectionID!=4){
    snakeDirectionID =3;
    clearInterval(snakeInterval);
    snakeInterval = setInterval(draw, intervalRatio, -5, 0)
}
}

function moveRight() {
    if (snakeDirectionID!=3){
    snakeDirectionID =4;
    clearInterval(snakeInterval);
    snakeInterval = setInterval(draw, intervalRatio, 5, 0)
}
}


function borderDetection(){

if(x==0||x==canvas.width||y==0||y==canvas.height){
    clearInterval(snakeInterval)
    console.log("game over")
    x = canvas.width/2;
     y = canvas.height/2;
    context.clearRect(0, 0, canvas.width, canvas.height)
    lives--;
    
    gameInfo();
}
}
//detect collision with snakes body
function bodyDetection(){
if(bodyElements.filter(function(element){
return BodyElement.bx===x&&BodyElement.by===y}))
{
    console.log("ssssssssssssssssssssssss");
}
}



function foodDetection(){
   

if  ((Math.abs(x - foodX) <= 10)&&(Math.abs(y - foodY) <= 10)){
    score++;
    foodEaten=true;
console.log("punkt")
start();
document.getElementById("displayScore").innerHTML=("Score ="+score);

}

  else{
      foodEaten=false;
  }  

}

function start(){
//create random coordinates of food for snake
//starts the game
if(lives>0){
foodX =Math.floor(Math.random() * (canvas.width - 0 + 1) ) + 0;
foodY =Math.floor(Math.random() * (canvas.height - 0 + 1) ) + 0;
console.log("random coord "+foodX+" "+foodY)
if(score<1){
    moveRight();}
}
else document.getElementById("gamelayInfo").innerHTML = ("Game over!!!");
}


//body
class BodyElement{
    constructor(bx,by){
        this.bx=bx;
        this.by=by;
    }
}
function updateBodylength(){
    console.log("Długośc"+bodyElements.length)
    console.log("bool "+foodEaten)
var b = new BodyElement(x,y);
bodyElements.unshift(b);
if (foodEaten==false&&bodyElements.length>15){
    bodyElements.pop(b); 
    console.log("teraz");
}
}
function updateSpeed()
{
    if (score%5==0){
        intervalRatio-50;
    }
}
