// TEXT FOCUS IN
window.addEventListener("load", function() {
  const text = document.querySelector(".focus-text");
  if(text){
    setTimeout(() => {
      text.classList.add("active");
    }, 300);
  }
});

// ESTRELLAS ANIMADAS
const canvas = document.getElementById("particles");
if(canvas){
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.opacity = Math.random();
      this.speed = Math.random() * 0.2 + 0.05;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    }

    update() {
      this.y -= this.speed;
      this.opacity += this.twinkleSpeed;

      if (this.opacity > 1 || this.opacity < 0.2) {
        this.twinkleSpeed *= -1;
      }

      if (this.y < 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
      ctx.fill();
    }
  }

  function initStars() {
    for (let i = 0; i < 150; i++) {
      stars.push(new Star());
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animateStars);
  }

  initStars();
  animateStars();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
document.addEventListener("DOMContentLoaded", () => {

  const target = document.querySelector("#target");
  const infoButton = document.querySelector("#infoButton");
  const infoBox = document.querySelector("#infoBox");
  const scanCounter = document.querySelector("#scanCounter");

  // Obtener valor guardado o iniciar en 0
  let scanCount = localStorage.getItem("scanCount");
  scanCount = scanCount ? parseInt(scanCount) : 0;

  // Mostrar contador al iniciar
  scanCounter.textContent = "Escaneos: " + scanCount;

  target.addEventListener("targetFound", () => {

    scanCount++;

    // Si llega a 10, reiniciar
    if (scanCount >= 10) {
      scanCount = 0;
      alert("Se alcanzaron 10 escaneos. Contador reiniciado 🔄");
    }

    localStorage.setItem("scanCount", scanCount);
    scanCounter.textContent = "Escaneos: " + scanCount;

    infoButton.style.display = "block";
  });

  target.addEventListener("targetLost", () => {
    infoButton.style.display = "none";
    infoBox.classList.remove("show");
  });

  infoButton.addEventListener("click", () => {
    infoBox.classList.toggle("show");
  });

});
