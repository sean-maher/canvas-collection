const canvas = document.getElementById('abstractCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full-screen size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Abstract shapes array
let shapes = [];

// Shape constructor
class Shape {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  // Draw the shape
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // Update position and bounce off walls
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }

    this.draw();
  }
}

// Generate random colors
function randomColor(brightness) {
// return random color scheme
  randomColorScheme = Math.floor(Math.random() * 3);
  if (randomColorScheme == 0) {
      return `hsl(${Math.random() * 30}, 50%, 10%)`;
  }
  if (randomColorScheme == 1) {
      return `hsl(${Math.random() * 30}, 75%, 25%)`;
  }
  if (randomColorScheme == 2) {
      return `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
}

// Generate random shapes
function generateShapes() {
  for (let i = 0; i < 100; i++) {
    let radius = Math.random() * 20 + 2;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let speedX = (Math.random() - 0.5) * .1;
    let speedY = (Math.random() - 0.5) * .5;
    let color = randomColor(false);

    shapes.push(new Shape(x, y, radius, color, speedX, speedY));
  }
}

// Interaction: change color on click
canvas.addEventListener('click', (event) => {
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  shapes.forEach(shape => {
    let dist = Math.hypot(mouseX - shape.x, mouseY - shape.y);
    shape.color = randomColor(true);
  });
});

// Interaction: apply a force on hover
canvas.addEventListener('mousemove', (event) => {
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  shapes.forEach(shape => {
    let dist = Math.hypot(mouseX - shape.x, mouseY - shape.y);
    if (dist < shape.radius + 50) {
      shape.speedX += (mouseX - shape.x) * 0.001;
      shape.speedY += (mouseY - shape.y) * 0.001;
    }
    //shape.color = randomColor(false);
  });
});

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  shapes.forEach(shape => {
    shape.update();
  });

  requestAnimationFrame(animate);
}

// Generate shapes and start animation
generateShapes();
animate();
