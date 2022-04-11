//TELA INICIAL

const BACKGROUND = document.getElementById('background');
const CONTROLS = document.getElementById('controls');
const STARTBTN = document.getElementById('startBtn');
const STARTSCREEN = document.getElementById('startScreen');
const CLOCK = document.getElementById('clock');


//RESPONSIVIDADE DO MENU (só funciona se o jogo estiver parado)
const MENU = document.getElementById('menu');
  if (window.screen.width < window.screen.height){
    MENU.classList.remove('vert')
    MENU.classList.add('hor')
    MENU.classList.add('fullW')
    CONTROLS.classList.remove('hor')
    CONTROLS.classList.add('vert')
  }


let points = 0;

//MODO ESCURO
let night = false

function nightRun(){
  BACKGROUND.classList.toggle("night");
}

//RECARREGAR A PÁGINA
function reload(){
  document.location.reload();
}


//RELÓGIO E DATA
function Clock(){

  const HORA = document.getElementById('hr');
  const MINUTO = document.getElementById('mn');
  const SEGUNDO = document.getElementById('sg');
  const DATA = document.getElementById('dt');

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

//JOGO
function game(){
  //RETIRANDO ITENS MOMENTANEAMENTE DESNECESSÁRIOS
  BACKGROUND.removeChild(STARTSCREEN);
  CONTROLS.removeChild(STARTBTN);

  //ANIMAÇÃO DO CENÁRIO
  BACKGROUND.classList.add("backgroundAnimation");

  //CRIAÇÃO DA PERSONAGEM
  const PUG = document.createElement('div');
  PUG.classList.add('pug');
  PUG.classList.add('margG');
  PUG.classList.add('paddG');
  BACKGROUND.appendChild(PUG);
  
  //CRIAÇÃO DO BOTÃO DE RECARREGAR A PÁGINA
  const RELOAD = document.createElement('button');
  RELOAD.innerHTML = 'Restart';
  RELOAD.classList.add('margG');
  RELOAD.classList.add('paddP');
  RELOAD.classList.add('flex');
  RELOAD.classList.add('center');
  CONTROLS.appendChild(RELOAD);
  CONTROLS.classList.add('fullW');

  //CRIAÇÃO DO PLACAR
  const SCORE = document.createElement('h3');
  SCORE.innerHTML = 'Score ' + points;
  SCORE.classList.add('margG');
  SCORE.classList.add('paddP');
  SCORE.classList.add('flex');
  SCORE.classList.add('center');
  CONTROLS.appendChild(SCORE);

  function score(){  
    points += 1;
    SCORE.innerHTML = "Score: " + points;
  }

  //CONTROLE DO PULO
  let isJumping = false;
  //POSIÇÃO VERTICAL NA TELA DA PERSONAGEM
  let positionU = 0;
  //POSIÇÃO HORIZONTAL NA TELA DA PERSONAGEM
  let positionF = 0;

  //CAPTURA E CONFIGURAÇÃO DA TECLA BARRA DE ESPAÇO E DO CLICK NO CENARIO PARA MOVIMENTAR A PERSONAGEM 
  function handleKeyUp (event){
    if (event.keyCode === 32 || BACKGROUND.click) {
      if (!isJumping){
        jump();
      }
    }
  }

  //FUNÇÃO DA MOVIMENTAÇÃO DA PERSONAGEM. NESTE CASO, SOMENTE PULO.
  function jump() {    

    //FUNÇÃO setInterval PARA MONITORAR E/OU REPETIR O COMANDO A PERSONAGEM
    let upInterval = setInterval(() => {    
      if (positionU >= 130) {
        //FUNÇÃO clearInterval PARA TRAZER A PERSONAGEM DE VOLTA AO ESTADO INICIAL
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

      //PERSONAGEM SUBINDO SE O COMANDO FOR DADO
      positionU += 20;
      //PERSONAGEM INDO PARA A ESQUERDA SE O COMANDO FOR DADO
      positionF += 20;  
      PUG.style.bottom = positionU + 'px';
      PUG.style.left = positionF + 'px';
        
      let PUGLeftInterval = setInterval(() => {
        if(positionF <= 3){
          clearInterval(PUGLeftInterval)
        }
        //PERSONAGEM VOLTANDO AO ESTADO INICIAL
        if(!isJumping){
          positionF -= 0.6;
          PUG.style.left = positionF + 'px';
        }
      }, 20)            
    }, 20)
  }


  createTumble();

  //CRIANDO UM OBSTÁCULO
  function createTumble () {

    //QUANTIDADE ALEATÓRIA DE TEMPO
    let randomTime = Math.random() * 4000;  
    
    //OBSTÁCULO
    const TUMBLE = document.createElement('div');
    let tumblePosition = 1500;
    TUMBLE.classList.add('tumble');
    TUMBLE.style.left = 1000 + 'px';
    BACKGROUND.appendChild(TUMBLE);

    //CRIAÇÃO REPETITIVA E ALEATÓRIA DE OBSTÁCULO
    let leftInterval = setInterval(() => {

      //PONTUAÇÃO CASO SE CONSIGA DESVIAR DO OBSTÁCULO
      if (tumblePosition < -20){
        clearInterval(leftInterval);
        BACKGROUND.removeChild(TUMBLE);
        score();
      } 
      //FIM DE JOGO EM CASO DE COLISÃO DA PERSONAGEM COM O OBSTÁCULO
      else if (

        //DEFININDO A COLISÃO
        tumblePosition > 0 && 
        tumblePosition < 60 &&
        positionF <= 20) {

          //RETIRANDO OS ELEMENTOS DA TELA E ACRESCENTANDO A TELA DE FIM DE JOGO
          clearInterval(leftInterval);
          BACKGROUND.classList.remove("backgroundAnimation")
          
          //CRIANDO O BOTÃO DE REINICIAR O JOGO E MOSTRANDO A PONTUAÇÃO FINAL
          document.body.innerHTML = `
          <div id="gameOver" class="margG paddG flex centerSelf center vert">
            <h1>Game Over!</h1>
            <h3">Score: ${points} points</h3>
            <button id="reload" class="margG paddG flex centerSelf center " onclick="reload()">RESTART</button>
          </div>
          `;
      }
      //MOVIMENTANDO O OBSTÁCULO
      tumblePosition -= 5;
      TUMBLE.style.left = tumblePosition + 'px';
    }, 20)   

    //REPETINDO A CRIAÇÃO DO OBSTÁCULO EM INTERVALOS DE TEMPO ALEATÓRIOS
    setTimeout(createTumble, randomTime)
    
  }

  //MONITORANDO O EVENTO DE USAR A BARRA DE ESPAÇO PARA MOVIMENTAR A PERSONAGEM
  document.addEventListener('keydown', handleKeyUp);

  //MONITORANDO O EVENTO DE CLIQUE NO CENÁRIO PARA MOVIMENTAR A PERSONAGEM
  BACKGROUND.addEventListener('click', jump);

  //MONITORANDO O EVENTO DE CLIQUE BOTÃO RELOAD PARA MOVIMENTAR A PERSONAGEM
  RELOAD.addEventListener('click', reload)
}
