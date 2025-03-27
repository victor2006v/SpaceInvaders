const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

// ANIMACION SQUID
const squidImage = new Image();
squidImage.src = "../Assets/Sprites_Enemigos/spritesheetSquid.png";
const spriteWidth = 123;
const spriteHeight = 102;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;

// ANIMACION CRAB
const crabImage = new Image();
crabImage.src = "../Assets/Sprites_Enemigos/spritesheetCrab.png";
const crabWidth = 116.5;
const crabHeight = 102;

// ANIMACION OCTOPUS
const octopus = new Image();
octopus.src = "../Assets/Sprites_Enemigos/spritesheetOctopus.png";
const octopusWidth = 131;
const octopusHeight = 102;

// ANIMACION UFO
const UFO = new Image();
UFO.src = "../Assets/Sprites_Enemigos/UFO.png"
const UFOWidth = 188; 
const UFOHeight = 102;

// Disparo de los enemigos
let bullets = [];

// Clase Bullet
class Bullet {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.color = color;
        this.speed = 4; // Velocidad del disparo
    }

    update() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos() {
        this.y += this.speed; // Mover las balas hacia abajo
    }
}

// Temporizadores de disparo de los enemigos
let lastShotSquid = 0, lastShotCrab = 0, lastShotOctopus = 0, lastShotUFO = 0;
const shootCooldown = 15000; // segundos entre disparos
const shootDelayRange = 30000; // Desfase aleatorio de disparos

// Desfase aleatorio para cada enemigo
let squidShootDelay = Math.random() * shootDelayRange;
let crabShootDelay = Math.random() * shootDelayRange;
let octopusShootDelay = Math.random() * shootDelayRange;
let UFOShootDelay = Math.random() * shootDelayRange;

// Función para disparar aleatoriamente
function shootEnemy(enemy, lastShotTime, delay) {
    let currentTime = Date.now();
    if (currentTime - lastShotTime > shootCooldown + delay) {
        // Disparo de color blanco
        bullets.push(new Bullet(enemy.x + enemy.width / 2 - 2, enemy.y + enemy.height, "white"));
        lastShotTime = currentTime;
    }
    return lastShotTime;
}

// Animación de los enemigos
function squidAnimate() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Dibujar los enemigos
    ctx.drawImage(squidImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    ctx.drawImage(crabImage, frameX * crabWidth, frameY * crabHeight, crabWidth, crabHeight, 0, 100, crabWidth, crabHeight);
    ctx.drawImage(octopus, frameX * octopusWidth, frameY * octopusHeight, octopusWidth, octopusHeight, 0, 200, octopusWidth, octopusHeight);
    ctx.drawImage(UFO, 0 * UFOWidth, 0 * UFOHeight, UFOWidth, UFOHeight, 0, 300, UFOWidth, UFOHeight);

    // Animación de los enemigos
    if (gameFrame % 35 == 0) {
        if (frameX < 1) {
            frameX++;
        } else {
            frameX = 0;
        }
    }

    // Disparo aleatorio para cada enemigo con desfase
    lastShotSquid = shootEnemy({x: 0, y: 0, width: spriteWidth, height: spriteHeight}, lastShotSquid, squidShootDelay);
    lastShotCrab = shootEnemy({x: 0, y: 100, width: crabWidth, height: crabHeight}, lastShotCrab, crabShootDelay);
    lastShotOctopus = shootEnemy({x: 0, y: 200, width: octopusWidth, height: octopusHeight}, lastShotOctopus, octopusShootDelay);
    lastShotUFO = shootEnemy({x: 0, y: 300, width: UFOWidth, height: UFOHeight}, lastShotUFO, UFOShootDelay);

    // Actualizar las balas
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].newPos();
        bullets[i].update();
    }

    gameFrame++;
    requestAnimationFrame(squidAnimate);
};

// Iniciar la animación
squidAnimate();