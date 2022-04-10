const BACKGROUND = document.getElementById('background');
const CONTROLS = document.getElementById('controls');
const STARTBTN = document.getElementById('startBtn');
const STARTSCREEN = document.getElementById('startScreen');

const CLOCK = document.getElementById('clock')
const HORA = document.getElementById('hr');
const MINUTO = document.getElementById('mn');
const SEGUNDO = document.getElementById('sg');
const DATA = document.getElementById('dt');

const MENU = document.getElementById('menu');
  if (window.screen.width < window.screen.height){
    MENU.classList.remove('vert')
    MENU.classList.add('hor')
    MENU.classList.add('fullW')
  }

let gameOn = false;
let points = 0;

function nightRun(){
  BACKGROUND.classList.toggle("night");
}

function reload(){
  document.location.reload();
}

function Clock(){
  let clockInterval = setInterval(() =>{
    let agora = new Date();

    let hora = agora.getHours();
    let minuto = agora.getMinutes();
    let segundo = agora.getSeconds();
  
    let strHora = new String(hora);
    let strMinuto = new String(minuto);
    let strSegundo = new String(segundo);
  
    if (strHora.length == 1) {
      hora = "0" + hora;
    }
    if (strMinuto.length == 1) {
      minuto = "0" + minuto;
    }
    if (strSegundo.length == 1) {
      segundo = "0" + segundo;
    }
  
    HORA.innerHTML = hora;
    MINUTO.innerHTML = minuto;
    SEGUNDO.innerHTML = segundo;

  let diaDaSemana = agora.getDay();
  let dia = agora.getDate();
  let mes = agora.getMonth();
  let ano = agora.getFullYear();

  let strDia = new String(dia);
  
  if (strDia.length == 1) {
    dia = "0" + dia;
  }
  
  switch(mes){
    case 0: mes = 'janeiro'
    break;
    case 1: mes = 'fevereiro'
    break;
    case 2: mes = 'março'
    break;
    case 3: mes = 'abril'
    break;
    case 4: mes = 'maio'
    break;
    case 5: mes = 'junho'
    break;
    case 6: mes = 'julho'
    break;
    case 7: mes = 'agosto'
    break;
    case 8: mes = 'setembro'
    break;
    case 9: mes = 'outubro'
    break;
    case 10: mes = 'novembro'
    break;
    case 11: mes = 'dezembro'
    break;
  }

  switch(diaDaSemana){
    case 0: diaDaSemana = 'Domingo'
    break;
    case 1: diaDaSemana = 'Segunda-Feira'
    break;
    case 2: diaDaSemana = 'Terça-Feira'
    break;
    case 3: diaDaSemana = 'Quarta-Feira'
    break;
    case 4: diaDaSemana = 'Quinta-Feira'
    break;
    case 5: diaDaSemana = 'Sexta-Feira'
    break;
    case 6: diaDaSemana = 'Sábado'
    break;
  }

  let dataAtual = `${diaDaSemana}, ${dia} de ${mes} de ${ano}`

  DATA.innerHTML = dataAtual

  },1000)
}



function game(){
  !gameOn;
  BACKGROUND.removeChild(STARTSCREEN);
  CONTROLS.removeChild(STARTBTN);
  BACKGROUND.classList.add("backgroundAnimation");

  const PUG = document.createElement('div');
  PUG.classList.add('pug');
  PUG.classList.add('margG');
  PUG.classList.add('paddG');
  BACKGROUND.appendChild(PUG);

  const RELOAD = document.createElement('button');
  RELOAD.innerHTML = 'Restart';
  RELOAD.classList.add('margG');
  RELOAD.classList.add('paddP');
  RELOAD.classList.add('flex');
  RELOAD.classList.add('center');
  CONTROLS.appendChild(RELOAD);
  CONTROLS.classList.add('fullW');

  const SCORE = document.createElement('h1');
  SCORE.innerHTML = "Score " + points;
  SCORE.classList.add('margG');
  SCORE.classList.add('paddP');
  SCORE.classList.add('flex');
  SCORE.classList.add('center');
  CONTROLS.appendChild(SCORE);
  
  
  if (window.screen.width < window.screen.height){
    CONTROLS.classList.remove('hor')
    CONTROLS.classList.add('vert')
  }
  
  
  let isJumping = false;
  let positionU = 0;
  let positionF = 0;
  
  function handleKeyUp (event){
    if (event.keyCode === 32 || BACKGROUND.click) {
      if (!isJumping && !gameOn){
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
          PUG.style.bottom = positionU + 'px';
          PUG.style.left = positionF + 'px';  
          if (positionU <= 3 ){
            clearInterval(downInterval);
          }
        });
      } 
  
      positionU += 20;
      positionF += 20;  
      PUG.style.bottom = positionU + 'px';
      PUG.style.left = positionF + 'px';
        
      let PUGLeftInterval = setInterval(() => {
        if(positionF <= 3){
          clearInterval(PUGLeftInterval)
        }
        if(!isJumping){
          positionF -= 0.6;
          PUG.style.left = positionF + 'px';
        }
      }, 20)            
    }, 20)
  }

  document.addEventListener('keydown', handleKeyUp);
  BACKGROUND.addEventListener('click', jump);
  RELOAD.addEventListener('click', reload)
}
  



/*




let SCORE = document.querySelector('.score');
let points = 0;


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
        

        PUG.style.bottom = positionU + 'px';
        PUG.style.left = positionF + 'px';

        if (positionU <= 0 ){
          clearInterval(downInterval);
        }
      });
    } 

    positionU += 20;
    positionF += 20;

    PUG.style.bottom = positionU + 'px';
    PUG.style.left = positionF + 'px';
      
    let PUGLeftInterval = setInterval(() => {
      if(positionF <= 0){
        clearInterval(PUGLeftInterval)
      }
      if(!isJumping){
      positionF -= 0.6;
      PUG.style.left = positionF + 'px';}
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
