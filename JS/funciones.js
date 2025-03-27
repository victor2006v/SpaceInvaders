// Obtener el canvas y su contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Configurar tamaño dinámico
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Movimiento de los jugadores
var player1, player2;

// Iniciar el juego
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
    this.speed = 3; // Velocidad constante
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

// Función principal de actualización
function updateGameArea() {
    myGameArea.clear();

    // Movimiento de los jugadores
    player1.newPos("ArrowLeft", "ArrowRight");
    player1.update();
    
    player2.newPos("a", "d");
    player2.update();

    requestAnimationFrame(updateGameArea); // Mantener animación fluida
}

// Iniciar el juego cuando cargue la página
window.onload = function () {
    startGame();
};