const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/*Gracias a windows.innerWidth o windows.innerHeigth podemos poner el canvas en pantalla completa sin importar la resolucion de nuestra pantalla*/
const CANVAS_WIDTH = canvas.width = window.innerWidth
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

const squidImage = new Image();
squidImage.src = "../Assets/Sprites_Enemigos/spritesheetSquid.png";
const spriteWidth = 123; // Ancho 245px/2columnas = 123 redondeado
const spriteHeight = 102; //Alto 102px/1 columna = 102
const staggerFrames = 35; // Para la velocidad entre animaciones
let frameX = 0;
let frameY = 0;
let gameFrame = 0;

function squidAnimate(){
    //Limpiar el canvas desde el centro hasta todo el ancho y alto del canvas, es decir que limpia todo el canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(squidImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
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
