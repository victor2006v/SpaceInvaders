
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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