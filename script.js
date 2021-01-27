let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

const velocidadeInicial = 200;

let box = 32;
let velocidadeAtual = velocidadeInicial;
let direcao = "right";

let cobrinha = [];
cobrinha[0] = {
  x: 8 * box,
  y: 8 * box
}

function geraNumeroAleatorio() {
  return Math.floor(Math.random() * 15 + 1) * box;
}

let frutinha = {
  x: geraNumeroAleatorio(),
  y: geraNumeroAleatorio()
}

function mantemLoopDaCobrinha() {
  if (cobrinha[0].x > 15 * box && direcao == "right") {
    cobrinha[0].x = 0;
  }

  if (cobrinha[0].x < 0 && direcao == "left") {
    cobrinha[0].x = 16 * box;
  }

  if (cobrinha[0].y < 0 && direcao == "up") {
    cobrinha[0].y = 16 * box;
  }

  if (cobrinha[0].y > 15 * box && direcao == "down") {
    cobrinha[0].y = 0;
  }
}

function verificaSeCobrinhaSeChoca() {
  for (i = 1; i < cobrinha.length; i++) {
    if (cobrinha[0].x === cobrinha[i].x
      && cobrinha[0].y === cobrinha[i].y) {
      clearInterval(jogo);
      alert("Fim do jogo");
    }
  }
}

function criarBG() {
  context.fillStyle = "#fffffe";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (i = 0; i < cobrinha.length; i++) {
    context.fillStyle = "#ff8906";
    context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
  }
}

function desenharFrutinha() {
  context.fillStyle = "#f25f4c";
  context.lineWidth = 2;
  context.strokeStyle = "#FF0000";
  context.fillRect(frutinha.x, frutinha.y, box, box);
}

function comportamentoDaCobrinha() {
  let cobrinhaPosicaoX = cobrinha[0].x;
  let cobrinhaPosicaoY = cobrinha[0].y;

  if (direcao == "right") cobrinhaPosicaoX += box;
  if (direcao == "left") cobrinhaPosicaoX -= box;
  if (direcao == "up") cobrinhaPosicaoY -= box;
  if (direcao == "down") cobrinhaPosicaoY += box;

  if (cobrinhaPosicaoX == frutinha.x && cobrinhaPosicaoY == frutinha.y) {
    frutinha.x = geraNumeroAleatorio();
    frutinha.y = geraNumeroAleatorio();
    velocidadeAtual += 10;
    console.log(velocidadeAtual);
  } else {
    cobrinha.pop();
  }

  let newHead = {
    x: cobrinhaPosicaoX,
    y: cobrinhaPosicaoY
  }
  cobrinha.unshift(newHead);
}

document.addEventListener('keydown', atualizarEventoSetas);
function atualizarEventoSetas(event) {
  if (event.keyCode == 37 && direcao !== "right") direcao = "left";
  if (event.keyCode == 38 && direcao !== "down") direcao = "up";
  if (event.keyCode == 39 && direcao !== "left") direcao = "right";
  if (event.keyCode == 40 && direcao !== "up") direcao = "down";
}

function iniciarJogo() {
  verificaSeCobrinhaSeChoca();
  mantemLoopDaCobrinha();
  criarBG();
  criarCobrinha();
  desenharFrutinha();
  comportamentoDaCobrinha();
}

let jogo = setInterval(iniciarJogo, velocidadeAtual);

(function () {

  var width, height, largeContainer, canvas, ctx, circles, target, animateHeader = true;

  initHeader();
  addListeners();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: 0, y: height };

    largeContainer = document.getElementById('co');
    largeContainer.style.height = height + 'px';

    canvas = document.getElementById('c');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    circles = [];
    for (var x = 0; x < width * 1.5; x++) {
      var c = new Square();
      circles.push(c);
    }
    animate();
  }

  function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeContainer.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in circles) {
        circles[i].draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function Square() {
    var _this = this;

    (function () {
      _this.pos = {};
      init();
      console.log(_this);
    })();

    function init() {
      _this.pos.x = Math.random() * width;
      _this.pos.y = height + Math.random() * 100;
      _this.alpha = 0.1 + Math.random() * 0.3;
      _this.scale = 0.1 + Math.random() * 0.3;
      _this.velocity = Math.random();
    }

    this.draw = function () {
      if (_this.alpha <= 0) {
        init();
      }
      _this.pos.y -= _this.velocity;
      _this.alpha -= 0.0005;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, 1, 0, 3, false);
      ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
      ctx.fill();
    };
  }

})();