const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false; //controlar esquemas de ação de pulo
let isGameOver = false;
let position = 0;

//função que identifica o pulo usando o espaço
function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true; //identifica que ele esta no ar e evita ações contínuas

  let upInterval = setInterval(() => { //identifica o intervalo de subida e descida do dino
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => { //intervalo de descida
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false; //identifica que não está no ar e libera o salto
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20; //define a "subida"
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000; //cria os cactus aleatóriamente

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      
      clearInterval(leftTimer); //identifica que o cactus saiu da tela

      background.removeChild(cactus);
    
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //calculo de impacto do cactus e o dinossauro
      
      clearInterval(leftTimer);

      isGameOver = true;

      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';

    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime); //invoca a criação de cactus com a função math
}

createCactus();
document.addEventListener('keyup', handleKeyUp);