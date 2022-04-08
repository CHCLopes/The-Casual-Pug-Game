const BACKGROUND = document.getElementById('background');
const MENU = document.getElementById('menu');
const STARTSCREEN = document.getElementById('startScreen')

let screenWidth = window.screen.width

if(screenWidth < 700){
  MENU.classList.toggle("vert");
  MENU.classList.toggle("hor");
  MENU.classList.toggle("fullH");
  MENU.classList.toggle("fullW");
  BACKGROUND.classList.toggle("columnReverse");
  STARTSCREEN.classList.toggle("absolute")

}

function nightRun(){
  BACKGROUND.classList.toggle("night");
}

function reload(){
  document.location.reload();
}

/*
const DINO = document.querySelector('.dino');



let SCORE = document.querySelector('.score');
let points = 0;

let gameOn = false;
let isJumping = false;
let positionU = 0;
let positionF = 0;

function gameStart(){
  
}


function score(){  
  points += 1;
  SCORE.innerHTML = "Score: " + points;
}

function handleKeyUp (event){
  if (event.keyCode === 32) {
    if (!isJumping){
      jump();
    }
  }
}

function jump() {
  let upInterval = setInterval(() => {
  
    if (positionU >= 130) {
      clearInterval(upInterval);
      
      let downInterval = setInterval(() => {
        positionU -= 20;
        

        DINO.style.bottom = positionU + 'px';
        DINO.style.left = positionF + 'px';

        if (positionU <= 0 ){
          clearInterval(downInterval);
        }
      });
    } 

    positionU += 20;
    positionF += 20;

    DINO.style.bottom = positionU + 'px';
    DINO.style.left = positionF + 'px';
      
    let dinoLeftInterval = setInterval(() => {
      if(positionF <= 0){
        clearInterval(dinoLeftInterval)
      }
      if(!isJumping){
      positionF -= 0.6;
      DINO.style.left = positionF + 'px';}
    }, 20)
          
    }, 20)}
/*
    function createCactus () {
      
      const CACTUS = document.createElement('div');
      let cactusPosition = 1500;
      let randomTime = Math.random() * 4000;
    

      CACTUS.classList.add('cactus');
      CACTUS.style.left = 1000 + 'px';
      BACKGROUND.appendChild(CACTUS);

      let leftInterval = setInterval(() => {

        if (cactusPosition < -20){
          clearInterval(leftInterval);
          BACKGROUND.removeChild(CACTUS);
          score();
        } else if (
          cactusPosition > 0 && 
          cactusPosition < 60 &&
          positionF <= 20) {
          clearInterval(leftInterval);
          document.body.innerHTML = `
          <h1 class="lastScore gameOver">Game Over!<br><br><br>Score: ${points} points<br><br></h1>
          <div class="restart button" onclick="reload()">RESTART</div>
          `;
          clearInterval(leftInterval);
          BACKGROUND.removeChild(CACTUS);
        }
        if (screenWidth > 900){
          cactusPosition -= 5;
        } else {
          cactusPosition -= 10;
        };
        CACTUS.style.left = cactusPosition + 'px';
      }, 20)
      

      setTimeout(createCactus, randomTime)
      
    }

createCactus(); 



document.addEventListener('keydown', handleKeyUp);
*/
