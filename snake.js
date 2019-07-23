const canvas_color = 'black';
const canvas_bgc = "white";
const snake_color = "yellow";
const snake_bgc = "darkyellow"
const GAME_SPEED = 100;

let canvas = document.getElementById("snake");
let ctx = canvas.getContext("2d");

let drawSnakeRect = SnakeRect => {
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

document.addEventListener("keydown", direction)

function direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changeDirection) return;
    changeDirection = true;
    const keyPressed = event.keyCode;
    const Up = my === -10;
    const Down = my === 10;
    const Right = mx === 10;
    const Left = mx === -10;  
    if (keyPressed === LEFT_KEY && !Right) {
     mx = -10;
     my = 0;
     console.log("UP");
    }  if (keyPressed === UP_KEY && !Down) {
     mx = 0;
     my = -10;
    }  if (keyPressed === RIGHT_KEY && !Left) {
     mx = 10;
     my = 0;
    }  if (keyPressed === DOWN_KEY && !Up) {
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

function moveSnake() {
    const head= {x: snake[0].x + mx, y: snake[0].y + my};
    snake.unshift(head);
    snake.pop();
};

function drawSnake(){ 
    snake.forEach(drawSnakeRect)
}

function main() {
    setTimeout(function onTick() {
      changeDirection = false;
      resetCanvas();
      moveSnake();
      drawSnake();
      main();
    }, GAME_SPEED)
};

