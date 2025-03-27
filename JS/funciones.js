const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/*Gracias a windows.innerWidth o windows.innerHeigth podemos poner el canvas en pantalla completa sin importar la resolucion de nuestra pantalla*/
const CANVAS_WIDTH = canvas.width = window.innerWidth
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
//ANIMACION SQUID
const squidImage = new Image();
squidImage.src = "../Assets/Sprites_Enemigos/spritesheetSquid.png";
const spriteWidth = 123; // Ancho 245px/2columnas = 123 redondeado
const spriteHeight = 102; //Alto 102px/1 columna = 102
const staggerFrames = 35; // Para la velocidad entre animaciones
let frameX = 0;
let frameY = 0;
let gameFrame = 0;

//ANIMACION CRAB
const crabImage = new Image();
crabImage.src = "../Assets/Sprites_Enemigos/spritesheetCrab.png";
const crabWidth = 116.5;
const crabHeight = 102;
//ANIMACION OCTOPUS
const octopus = new Image();
octopus.src = "../Assets/Sprites_Enemigos/spritesheetOctopus.png";
const octopusWidth = 131;
const octopusHeight = 102;
//ANIMACION UFO
const UFO = new Image();
UFO.src = "../Assets/Sprites_Enemigos/UFO.png"
const UFOWidth = 188; 
const UFOHeight = 102;
function squidAnimate(){
    //Limpiar el canvas desde el centro hasta todo el ancho y alto del canvas, es decir que limpia todo el canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if(gameFrame % staggerFrames == 0){
        if (frameX < 1) {
            frameX++;
        } else {
            frameX = 0;
        }
    }   
           
    gameFrame++;
    requestAnimationFrame(squidAnimate);
};
squidAnimate();


var player1, player2;
var bulletsPlayer1 = [];
var bulletsPlayer2 = [];
var lastShotPlayer1 = 0; // Para controlar el tiempo entre disparos 
var lastShotPlayer2 = 0; 
const shootCooldown = 3000; 

function startGame() {
    myGameArea.start();
    player1 = new component(30, 30, "red", 10, canvas.height - 100); // Jugador 1
    player2 = new component(30, 30, "blue", 100, canvas.height - 100); // Jugador 2
}

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

// Definir el componente de los jugadores
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
        // Movimiento solo en X y con límites
        if (myGameArea.keys[leftKey] && this.x > 0) {
            this.x -= this.speed; // Mueve a la izquierda
        }
        if (myGameArea.keys[rightKey] && this.x < canvas.width - this.width) {
            this.x += this.speed; // Mueve a la derecha
        }
    };
}

// Crear la clase para las balas
function Bullet(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.color = color;
    this.speed = 4;

    this.update = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newPos = function() {
        this.y -= this.speed; // Mueve la bala hacia arriba
    };
}

// Función principal de actualización
function updateGameArea() {
    myGameArea.clear();
    ctx.drawImage(squidImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    ctx.drawImage(crabImage, frameX * crabWidth, frameY * crabHeight, crabWidth, crabHeight, 0, 100, crabWidth, crabHeight);
    ctx.drawImage(octopus,  frameX * octopusWidth, frameY * octopusHeight, octopusWidth, octopusHeight, 0, 200, octopusWidth, octopusHeight);
    ctx.drawImage(UFO, 0*UFOWidth, 0*UFOHeight, UFOWidth, UFOHeight, 0, 300,UFOWidth, UFOHeight); 
    // Movimiento de los jugadores
    player1.newPos("ArrowLeft", "ArrowRight");
    player1.update();
    
    player2.newPos("a", "d");
    player2.update();

    // Movimiento y actualización de las balas de los jugadores
    for (let i = 0; i < bulletsPlayer1.length; i++) {
        bulletsPlayer1[i].newPos();
        bulletsPlayer1[i].update();
    }

    for (let i = 0; i < bulletsPlayer2.length; i++) {
        bulletsPlayer2[i].newPos();
        bulletsPlayer2[i].update();
    }

    // Verificar si los jugadores presionan la tecla de disparo y agregar una nueva bala
    let currentTime = Date.now(); 

    // Jugador 1 dispara con "Flecha Arriba" 
    if (myGameArea.keys["ArrowUp"] && currentTime - lastShotPlayer1 > shootCooldown) {
        bulletsPlayer1.push(new Bullet(player1.x + player1.width / 2 - 2, player1.y, "yellow"));
        lastShotPlayer1 = currentTime; // Actualizar el tiempo del último disparo
    }

    // Jugador 2 dispara con "W" 
    if (myGameArea.keys["w"] && currentTime - lastShotPlayer2 > shootCooldown) {
        bulletsPlayer2.push(new Bullet(player2.x + player2.width / 2 - 2, player2.y, "green"));
        lastShotPlayer2 = currentTime; // Actualizar el tiempo del último disparo
    }

    requestAnimationFrame(updateGameArea); 
}

// Iniciar el juego cuando cargue la página
window.onload = function () {
    startGame();
};

