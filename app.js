const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let leftHeight = 300;
let rightHeight = 300;

let ballX = 300;
let ballY = 300;
let ballSpeed = 1;
let ballXVelocity = -ballSpeed;
let ballYVelocity = ballSpeed;

let gameSpeed = 100;

let leftScore = 0;
let rightScore = 0;

const img = new Image();        
img.src = './techie-youth-logo-tiny.png';        

const awesomeSound = new Audio('Awesome.mp3');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function drawGame(){
    clearScreen();
    drawPlayers();
    drawScore();
    
    hitWall();
    checkCollision();
    drawBall();
    setTimeout(drawGame, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawPlayers(){
    ctx.fillStyle = "white";
    // Left Player
    ctx.fillRect(0, leftHeight, 20, 100);

    // Right Player
    ctx.fillRect(580, rightHeight, 20, 100);
} 

function drawBall(){
    ctx.drawImage(img, ballX, ballY, 20, 20);  
    ballX = ballX + ballXVelocity;
    ballY = ballY + ballYVelocity;
}
function hitWall(){
    if(ballY <= 0 || ballY >= 580){
        ballYVelocity *= -1;
        return true;
    }
}

function checkCollision(){
    // Hit Left Player
    if(ballX <= 20){
        if((-100 < leftHeight - ballY) &&  (leftHeight - ballY < 20)){
            ballX = 21;
            ballXVelocity = +ballSpeed;
            ballSpeed += 0.5;
            return;
            // Increase speed possibly
        }
    }
    // Hit Right Player
    if(560 <= ballX && ballX < 580){
        if((-100 < rightHeight - ballY) && (rightHeight - ballY < 20)){
            ballX = 559;
            ballXVelocity = -ballSpeed;
            ballSpeed += 0.5;
            return;
            // Increase speed possibly
        }
    }
    // Right Scores Point
    else if(ballX <= 0){
        rightScore++;
        newRound();
        ballXVelocity = -ballSpeed;
        return;
    }
    // Left Scores Point
    if(ballX >= 580){
        leftScore++;
        newRound();
        ballXVelocity = +ballSpeed;
        return;
    }
}

function newRound(){
    ballX = 300;
    ballY = 300;
    ballSpeed = 1;
    awesomeSound.play();
    sleep(2000);
}

// Make Keys Work
window.addEventListener("keydown", keyDown);

function keyDown(event){
    // Right Up
    if(event.keyCode == 38){
        if(rightHeight > 0){
            rightHeight = rightHeight - 10;
            return;
        }
    }
    // Right Down
    if(event.keyCode == 40){
        if(rightHeight < 500){
            rightHeight = rightHeight + 10;
            return;
        }
    }
    // Left Up
    if(event.keyCode == 87){
        if(leftHeight > 0){
            leftHeight = leftHeight - 10;
            return;
        }
    }
    // left Down
    if(event.keyCode == 83){
        if(leftHeight < 500){
            leftHeight = leftHeight + 10;
            return;
        }
    }
}

function drawScore(){
    document.getElementById('left-score').innerHTML = leftScore;
    document.getElementById('right-score').innerHTML = rightScore;
}

drawGame();


