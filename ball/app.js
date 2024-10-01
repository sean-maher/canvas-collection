const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const colorInput = document.getElementById('colorInput');
const applyColorButton = document.getElementById('applyColor');

// Set the canvas size
canvas.width = 600;
canvas.height = 400;

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 2,
  dy: 2,
  color: 'blue'
};

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Update the ball's position
function updateBall() {
  // Bounce off the walls
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }

  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  updateBall();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Event listener for applying the new color
applyColorButton.addEventListener('click', () => {
  ball.color = colorInput.value; // Update the ball's color based on user input
});
