const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Configuración del canvas en pantalla completa
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

// ANIMACION SQUID

const squidImage = new Image();
squidImage.src = "../Assets/Sprites_Enemigos/spritesheetSquid.png";
const spriteWidth = 123;
const spriteHeight = 102;

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

// Disparo de los enemigos
let bullets = [];

// Temporizadores de disparo de los enemigos
let lastShotSquid = 0, lastShotCrab = 0, lastShotOctopus = 0, lastShotUFO = 0;
const shootCooldownEnemi = 15000; // segundos entre disparos
const shootDelayRange = 30000; // Desfase aleatorio de disparos

// Desfase aleatorio para cada enemigo
let squidShootDelay = Math.random() * shootDelayRange;
let crabShootDelay = Math.random() * shootDelayRange;
let octopusShootDelay = Math.random() * shootDelayRange;
let UFOShootDelay = Math.random() * shootDelayRange;

// Función para disparar aleatoriamente
function shootEnemy(enemy, lastShotTime, delay) {
    let currentTime = Date.now();
    if (currentTime - lastShotTime > shootCooldownEnemi + delay) {
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

const UFO = new Image();
UFO.src = "../Assets/Sprites_Enemigos/UFO.png";
const UFOWidth = 188;
const UFOHeight = 102;

// Configuración de los enemigos
const enemyColumns = 11;
const enemyRows = 5;
const enemySpacing = 20;
let enemyX = 50;
let enemyY = 50;
let enemySpeed = 2;
let direction = 1;
let gameFrame = 0;
const staggerFrames = 20;
let frameX = 0;

// Variables para el movimiento del UFO
let ufoX = 0;
let ufoY = 40; // Altura inicial del UFO
let ufoSpeed = 3;
let ufoDirection = 1;

// Movimiento de enemigos
function moveEnemies() {
    enemyX += enemySpeed * direction;
    if (enemyX + (enemyColumns * (spriteWidth + enemySpacing)) > CANVAS_WIDTH || enemyX < 0) {
        direction *= -1;
        enemyY += 40;
    }

    // Movimiento del UFO
    ufoX += ufoSpeed * ufoDirection;
    if (ufoX + UFOWidth > CANVAS_WIDTH || ufoX < 0) {
        ufoDirection *= -1; // Cambia de dirección
    }

    // Control de frames de animación
    if (gameFrame % staggerFrames === 0) {
        frameX = (frameX + 1) % 2; // Alterna entre 0 y 1 para animación
    }
}

// Dibujar los enemigos en la cuadrícula con animación
function drawEnemyGrid() {
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyColumns; col++) {
            let x = enemyX + col * (spriteWidth + enemySpacing);
            let y = enemyY + row * (spriteHeight + enemySpacing);

            if (row === 0) {
                ctx.drawImage(squidImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
            } else if (row === 1 || row === 2) {
                ctx.drawImage(crabImage, frameX * crabWidth, 0, crabWidth, crabHeight, x, y, crabWidth, crabHeight);
            } else if (row === 3 || row === 4) {
                ctx.drawImage(octopus, frameX * octopusWidth, 0, octopusWidth, octopusHeight, x, y, octopusWidth, octopusHeight);
            }
        }
    }

    // Dibujar UFO en su nueva posición
    ctx.drawImage(UFO, 0, 0, UFOWidth, UFOHeight, ufoX, ufoY, UFOWidth, UFOHeight);
}

// Variables para jugadores y disparos
var player1, player2;
var bulletsPlayer1 = [];
var bulletsPlayer2 = [];
var lastShotPlayer1 = 0;
var lastShotPlayer2 = 0;
const shootCooldown = 500;

// Inicializar el juego
function startGame() {
    myGameArea.start();
    player1 = new component(30, 30, "red", 10, canvas.height - 100);
    player2 = new component(30, 30, "blue", 100, canvas.height - 100);
}

// Área de juego y controles
var myGameArea = {
    canvas: canvas,
    context: ctx,
    keys: {},

    start: function () {
        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        });

        requestAnimationFrame(updateGameArea);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

// Definir los jugadores
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speed = 3;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newPos = function (leftKey, rightKey) {
        if (myGameArea.keys[leftKey] && this.x > 0) {
            this.x -= this.speed;
        }
        if (myGameArea.keys[rightKey] && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
    };
}

// Crear balas
function Bullet(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.color = color;
    this.speed = 4;

    this.update = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newPos = function () {
        this.y -= this.speed;
    };
}

// Función principal de actualización
function updateGameArea() {
    myGameArea.clear();
    moveEnemies();
    drawEnemyGrid();
    gameFrame++;

    // Movimiento de los jugadores
    player1.newPos("ArrowLeft", "ArrowRight");
    player1.update();

    player2.newPos("a", "d");
    player2.update();

    // Movimiento y actualización de balas
    for (let i = 0; i < bulletsPlayer1.length; i++) {
        bulletsPlayer1[i].newPos();
        bulletsPlayer1[i].update();
    }

    for (let i = 0; i < bulletsPlayer2.length; i++) {
        bulletsPlayer2[i].newPos();
        bulletsPlayer2[i].update();
    }

    // Disparos de los jugadores
    let currentTime = Date.now();

    if (myGameArea.keys["ArrowUp"] && currentTime - lastShotPlayer1 > shootCooldown) {
        bulletsPlayer1.push(new Bullet(player1.x + player1.width / 2 - 2, player1.y, "yellow"));
        lastShotPlayer1 = currentTime;
    }

    if (myGameArea.keys["w"] && currentTime - lastShotPlayer2 > shootCooldown) {
        bulletsPlayer2.push(new Bullet(player2.x + player2.width / 2 - 2, player2.y, "green"));
        lastShotPlayer2 = currentTime;
    }

    requestAnimationFrame(updateGameArea);
}

// Iniciar el juego cuando cargue la página
window.onload = function () {
    startGame();
};
