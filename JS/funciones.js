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
    ctx.drawImage(squidImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    ctx.drawImage(crabImage, frameX * crabWidth, frameY * crabHeight, crabWidth, crabHeight, 0, 100, crabWidth, crabHeight);
    ctx.drawImage(octopus,  frameX * octopusWidth, frameY * octopusHeight, octopusWidth, octopusHeight, 0, 200, octopusWidth, octopusHeight);
    ctx.drawImage(UFO, 0*UFOWidth, 0*UFOHeight, UFOWidth, UFOHeight, 0, 300,UFOWidth, UFOHeight); 
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

