const canvas_color = 'black';
const canvas_bgc = "white";
const snake_color = "yellow";
const snake_bgc = "darkyellow";
const food_color = "red";
const food_bgc = "orange";
const game_speed = 100;

let score = 0;
let canvas = document.getElementById("snake");
let ctx = canvas.getContext("2d");

let foodX;
let foodY;

let drawSnakeRect = (SnakeRect) => {
    ctx.fillStyle = snake_color;
    ctx.strokestyle = snake_bgc;
    ctx.fillRect(SnakeRect.x, SnakeRect.y, 10, 10);
    ctx.strokeRect(SnakeRect.x, SnakeRect.y, 10, 10);
};

let changeDirection = false;

let snake = [
    {x:300, y:300},
    {x:290, y:300},
    {x:280, y:300},
    {x:270, y:300},
    {x:260, y:300}
];

let mx = 10;
let my = 0;

main();

createFood();

document.addEventListener("keydown", direction)

function main() {
    if (checkGame()) return;
        setTimeout(function onTick() {
        changeDirection = false;
        resetCanvas();
        displayFood();
        moveSnake();
        drawSnake();
        main();
    }, game_speed)
};

function direction(event) {
    const left_key = 37;
    const right_key = 39;
    const up_key = 38;
    const down_key = 40;

    if (changeDirection) return;
    changeDirection = true;

    const keyPressed = event.keyCode;
    const Up = my === -10;
    const Down = my === 10;
    const Right = mx === 10;
    const Left = mx === -10;  
    if (keyPressed === left_key && !Right) {
     mx = -10;
     my = 0;
    }  if (keyPressed === up_key && !Down) {
     mx = 0;
     my = -10;
    }  if (keyPressed === right_key && !Left) {
     mx = 10;
     my = 0;
    }  if (keyPressed === down_key && !Up) {
     mx = 0;
     my = 10;
    }
};

function resetCanvas() {
    ctx.fillStyle = canvas_bgc;
    ctx.strokestyle = canvas_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
};

//충돌 체크
function checkGame() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 10;
    const hitRightWall = snake[0].x > canvas.width -20;
    const hitToptWall = snake[0].y < 10;
    const hitBottomWall = snake[0].y > canvas.height - 20;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
};

function moveSnake() {
    const head= {x: snake[0].x + mx, y: snake[0].y + my};
    snake.unshift(head);
    const check = snake[0].x === foodX && snake[0].y === foodY;
    if (check) {
        score += 10;
        document.getElementById("score").innerHTML = score;
        createFood();
    } else {
        snake.pop();
    };
};

function drawSnake() { 
    snake.forEach(drawSnakeRect)
};

function ran10(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
};

function createFood() {
    foodX = ran10(0, canvas.width - 10);
    foodY = ran10(0, canvas.height - 10);
    snake.forEach(function checkFood(part) {
      const foodOnSnake = part.x == foodX && part.y == foodY;
      if (foodOnSnake) createFood();
    });
};

function displayFood() {
    console.log("food");
    ctx.fillStyle = food_color;
    ctx.strokestyle = food_bgc;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
};




