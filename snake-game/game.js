const myCanvas = document.getElementById("mCanvas");
const context = myCanvas.getContext("2d");

//Creating each box unit
const boxSize = 50;

//Loading all images involved in the game
const background = new Image();
background.src = "img/bg2.png";

const frogImg = new Image();
frogImg.src = "img/food.png";

//creating the snake
//Background: The snake is an array of (x,y) co-ordinates on the backround
let snake = [];

//Initializing the snake at some random position on the background
snake[0] = {
    x : 10*boxSize,
    y : 10*boxSize
}

//creating the frog
let frog = {
    x : getRandomX(),
    y : getRandomY()
}

//creating the score board
let score = 0;

//controlling the snake movement
//Use event listener
let direction;
document.addEventListener("keydown", getDirection);
function getDirection(event){
    
    if(event.keyCode == 37 && direction != "RIGHT"){ //Means left
        direction = "LEFT";
    }
    else if(event.keyCode == 38 && direction != "DOWN"){
        direction = "UP";
    }
    else if(event.keyCode == 39 && direction != "LEFT"){
        direction = "RIGHT";
    }
    else if(event.keyCode == 40 && direction != "UP"){
        direction = "DOWN";
    }

}

//A function to draw everything to the canavas
function drawToCanvas(){
    //console.log("Inside drawTo Canavas");
    context.drawImage(background,0,100);
    for(let i = 0; i < snake.length ; i++){
        //specifying the snake body fill color and then creating a square out of it
        context.fillStyle = (i == 0) ? "blue" : "white";
        context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);

        //specifying the snake body outline color and draw the outline
        context.strokeStyle = "red";
        context.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }
    /*frog = {
        x : getRandomX(),
        y : getRandomY()
    }*/
    //drawing the frog
    //console.log("Frog.x:"+frog.x+"Frog.y:"+frog.y);
    context.drawImage(frogImg, frog.x,frog.y);

    //save the old head position 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //check the direction the player pressed
    if(direction == "RIGHT") snakeX+=boxSize;
    if(direction == "LEFT") snakeX-=boxSize;
    if(direction == "UP") snakeY-=boxSize;
    if(direction == "DOWN") snakeY+=boxSize;

    //If the snake eats the food, then generate new food
    if(snakeX == frog.x && snakeY == frog.y){
        score++;
        frog = {
            x: getRandomX(),
            y: getRandomY()
        }
    }else{
        //remove the tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //Setting the game over rules
    if(snakeX < 0 || snakeX >= 20*boxSize ||
         snakeY < 100 || snakeY >= 22*boxSize || checkCollision(newHead,snake)){
             //Stop the game by stopping screen refresh
             clearInterval(game);
         }

    

    snake.unshift(newHead);
    //console.log(snake);

    //Clear old score if overlapping occurs
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 1000, 90);
    //show the score on top
    context.fillStyle = "green";//set text color
    context.font = "45px Arial";
    context.fillText("Score: "+score,boxSize,boxSize);
}

function getRandomX() {
    let rndX =  Math.random()*10+1;
    let floorX = Math.floor(rndX);
    let posX = floorX * boxSize;
    /*console.log("RandomX:"+rndX);
    console.log("FloorX:"+floorX);
    console.log("posX:"+posX);*/
    return posX;
}

function getRandomY(){
    let rndY = Math.random()*15+2;
    let floorY = Math.floor(rndY);
    let posY = floorY * boxSize;
    /*console.log("RandomY:"+rndY);
    console.log("FloorY:"+floorY);
    console.log("posX:"+posY);*/
    return posY;
}

function checkCollision(head, array){
    //loop the array and check if the head has hit any item in the array
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y)
        return true;
    }
    return false;
}


//Calling the drawToCanavas function every 100ms 
let game = setInterval(drawToCanvas,100);