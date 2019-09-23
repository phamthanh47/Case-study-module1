var canvas = document.getElementById('gameFrame');
var context = canvas.getContext('2d');
function Paddle(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.drawPaddle = function () {
        context.beginPath();
        context.fillStyle = 'blue';
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();
        context.closePath();
    };
        this.control = function () {
            window.addEventListener('keydown', e => {
                if (e.keyCode == '37') {
                    this.isMovingLeft = true;
                }
                if (e.keyCode == '39') {
                    this.isMovingRight = true;
                }
                if (e.keyCode == '16') {
                    this.speed = 25;
                }
                if (e.keyCode != '37' && e.keyCode != '39' && e.keyCode != '16') return;
            });
            window.addEventListener('keyup', e => {
                if (e.keyCode == '37') {
                    this.isMovingLeft = false;
                }
                if (e.keyCode == '39') {
                    this.isMovingRight = false;
                }
                if (e.keyCode == '16') {
                    this.speed = 10;
                }
                if (e.keyCode != '37' && e.keyCode != '39' && e.keyCode != '16') return;
            });
        };
        this.move = function () {
            if (this.isMovingLeft) {
                this.x = this.x - this.speed
            };
            if (this.isMovingRight) {
                this.x = this.x + this.speed
            };
            // Stop paddle
            if (this.x < 0) {
                this.x = 0
            };
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width
            };
        };
    };
    function Goal(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.randomPosition = function () {
            goalInterval = setInterval(() => {
                this.x = parseInt(Math.random() * 500);
                this.y = parseInt(Math.random() * 10) * 10;
            }, 500);
        };
        this.drawGoal = function () {
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'green';
            context.fill();
            context.closePath();
        };
    };
    function Ball(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.drawBall = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = 'red';
            context.fill();
            context.closePath();
        };
        this.move = function () {
            this.x += this.dx;
            this.y += this.dy;
            // When ball hits walls
            if (this.x <= this.radius || this.x >= (canvas.width - this.radius)) {
                this.dx = -this.dx;
            }
            // When ball hits with ceiling
            if ((this.y - this.radius) < this.radius) {
                this.dy = -this.dy;
            }
            // When ball hits paddle
            if ((this.y + this.radius) == paddle.y) {
                if (this.x >= (paddle.x - this.radius) && this.x <= (paddle.x + paddle.width + this.radius)) {
                    this.dy = -this.dy;
                }
                if (paddle.isMovingLeft) {
                    this.dx -= 2;
                } else if (paddle.isMovingRight) {
                    this.dx += 2;
                }
            }
            // When ball hits goal = Win
            if ((this.y - this.radius) == (goal.y + goal.height) || (this.y + this.radius == goal.y)) {
                if (this.x >= (goal.x - this.radius) && this.x <= (goal.x + goal.width + this.radius)) {
                    clearInterval(myInterval);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                   // context.drawImage(img1, 0, 0);
                    context.font = "50px Georgia";
                    context.fillText("You Won!", 140, 240);
                }
            }
            // Game over
            if (this.y > canvas.height) {
                clearInterval(myInterval);
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.font = "50px Georgia";
                context.fillText("Game Over!", 135, 240);
            }
        //    this.updateScore();
        // };
        // this.updateScore=()=>{
        //     ctx.font="18px Georgia";
        //     ctx.fillText("Score : " + score,gameFrame.width / 2,20);
        };
        this.startGame = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ball.drawBall();
            paddle.drawPaddle();
            goal.randomPosition();
            goal.drawGoal();
            paddle.control();
            paddle.move();
            ball.move();
        };
    };
    var ball = new Ball(10, 10, 10, 5, 10);
    var paddle = new Paddle(200, 450, 100, 10, 10);
    var goal = new Goal(300, 100, 10, 10);
    var myInterval;
    var goalInterval;
    // const img1 = document.getElementById('img');
    const playBtn = document.getElementById('play');
    playBtn.addEventListener('click', () => {
        ball = new Ball(10, 10, 10, 5, 10);
        myInterval = window.setInterval(ball.startGame, 30);
    });

