var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var intervalRatio = 50;
//variables for snakes head
var x = canvas.width / 2;
var y = canvas.height / 2;
var snakeInterval;

//var for snakes body
var bodyElements = [];
//variables for snakes food

var foodX;
var foodY;
//gameplay variables
var score = 0;
var lives = 1;
var foodEaten = false;
var checkIfGameIsInProgress =true;
//prevents movement in opposite direction
var snakeDirectionID = 0;

//keyboard input

canvas.onkeydown = function (e) {
    if (e.key === '38' || e.key === '40') {
        e.view.event.preventDefault();
    }
}
document.addEventListener('keydown', function (event) {
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

function gameInfo() {
    document.getElementById("displayScore").innerHTML = ("Score =" + score);
    
     if (lives == 0) {
        document.getElementById("gameplayInfo").innerHTML = ("GAME OVER!!!")
    }
    

}

function draw(a, b) {
    //draw the snake

    if (lives != 0) {
        borderDetection();
        updateBodylength();
        updateSpeed();
        foodDetection();
        
        bodyDetection();

        context.clearRect(0, 0, canvas.width, canvas.height)

        context.fillRect(x, y, 10, 10);
        context.fillStyle = "#147710";
        context.fill();


        var a;
        var b;
        x = x + a;
        y = y + b;
        //draw the food
        context.fillRect(foodX, foodY, 10, 10);
        context.fillStyle = "#7a22ad";
        context.fill();

    }
    else {
        context.clearRect(0, 0, canvas.width, canvas.height)

    }

    //drawTheBody
    for (i = 0; i < bodyElements.length; i++) {


        context.fillRect(bodyElements[i].bx, bodyElements[i].by, 10, 10);
        context.fillStyle = "#0095DD";
        context.fill();

    }
    
}


function moveUp() {
    if (snakeDirectionID != 2) {
        snakeDirectionID = 1;
        clearInterval(snakeInterval);
        snakeInterval = setInterval(draw, intervalRatio, 0, -5)
        document.getElementById("gameplayInfo").innerHTML = (" ");
    }
}

function moveDown() {
    if (snakeDirectionID != 1) {
        snakeDirectionID = 2;
        clearInterval(snakeInterval);
        snakeInterval = setInterval(draw, intervalRatio, 0, 5)
        document.getElementById("gameplayInfo").innerHTML = (" ");
    }
}


function moveLeft() {
    if (snakeDirectionID != 4) {
        snakeDirectionID = 3;
        clearInterval(snakeInterval);
        snakeInterval = setInterval(draw, intervalRatio, -5, 0)
        document.getElementById("gameplayInfo").innerHTML = (" ");
    }
}

function moveRight() {
    if (snakeDirectionID != 3) {
        snakeDirectionID = 4;
        clearInterval(snakeInterval);
        snakeInterval = setInterval(draw, intervalRatio, 5, 0)
        document.getElementById("gameplayInfo").innerHTML = (" ");
    }
}


function borderDetection() {
    console.log(x);
    if (x == 0|| (x == canvas.width - 5) || y == 0 || (y == canvas.height - 5)) {

        gameOver();
        gameInfo();
        
    }
}
//detect collision with snakes body
function bodyDetection() {

    //if(bodyElements.filter(function(BodyElement){
    //return BodyElement.bx===x&&BodyElement.by===y}))
    for (var i = 1; i < bodyElements.length; i++) {
        // console.log("Tablica = "+"x "+x+"y   "+y+"   "+bodyElements[i].bx+"   "+bodyElements[i].by);

        if (bodyElements[i].bx == x && bodyElements[i].by == y) {


            gameOver();
        }


    }
}



function foodDetection() {


    if ((Math.abs(x - foodX) <= 10) && (Math.abs(y - foodY) <= 10)) {
        score++;
        foodEaten = true;

        start();


    }

    else {
        foodEaten = false;
    }
    gameInfo();
}

function start() {
    
    //create random coordinates of food for snake
    //starts the game
    if (lives > 0) {
        foodX = Math.floor(Math.random() * (canvas.width - 10)) + 0;
        foodY = Math.floor(Math.random() * (canvas.height - 10)) + 0;
 
    }
    
}


//body
class BodyElement {
    constructor(bx, by) {
        this.bx = bx;
        this.by = by;
    }
}
function updateBodylength() {

    var b = new BodyElement(x, y);
    bodyElements.unshift(b);
    if (foodEaten == false && bodyElements.length > 15) {
        bodyElements.pop(b);

    }
}
function updateSpeed() {
    if (score % 5 == 0) {
        intervalRatio - 25;
    }
}
function gameOver() {

    clearInterval(snakeInterval)
    console.log("game over")
    //x = canvas.width/2;
    //y = canvas.height/2;
    context.clearRect(0, 0, canvas.width, canvas.height)
    lives--;
    score = 0;
    var txt;
    if (confirm("GAME OVER! Play again?")) {
        lives = 1;


        context.clearRect(0, 0, canvas.width, canvas.height)
        x = canvas.width / 2;
        y = canvas.height / 2;
        bodyElements = [];
        gameInfo();
        start();
        console.log("score" + score);
    }
}