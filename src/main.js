// ============================================================================
// 42 DNF - Bootstrapper
// Cria canvas, gerencia game loop e troca de cenas.
// ============================================================================
import {
  CANVAS_LARGURA_REAL, CANVAS_ALTURA_REAL,
} from './config.js';

export const Estado = {
  nomeJogador: '',
  genero: 'menino',
  inimigo: 'homem',
  nivelEscolhido: 1,

  diaAtual: 1,
  dinheiro: 0,
  horaJogo: 6,
  tempoNoCicloMs: 0,
  itemNaMao: null,
};

const cenas = {};
let cenaAtual = null;
let cenaAtualNome = null;

export function registrarCena(nome, cena) {
  cenas[nome] = cena;
}

export function trocarCena(nome, params) {
  if (cenaAtual && cenaAtual.finalizar) cenaAtual.finalizar();
  cenaAtualNome = nome;
  cenaAtual = cenas[nome];
  if (!cenaAtual) throw new Error('Cena nao encontrada: ' + nome);
  if (cenaAtual.iniciar) cenaAtual.iniciar(params || {});
}

export function getCenaAtual() { return cenaAtualNome; }

let canvas, ctx;
let ultimoTempo = 0;

export function getCanvas() { return canvas; }
export function getCtx() { return ctx; }

export function iniciarJogo() {
  canvas = document.getElementById('game');
  if (!canvas) throw new Error('Canvas #game nao encontrado');

  canvas.width = CANVAS_LARGURA_REAL;
  canvas.height = CANVAS_ALTURA_REAL;

  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  ajustarTamanho();
  window.addEventListener('resize', ajustarTamanho);

  registrarCenaPlaceholder();
  trocarCena('placeholder');

  ultimoTempo = performance.now();
  requestAnimationFrame(loop);
}

function ajustarTamanho() {
  const jw = window.innerWidth;
  const jh = window.innerHeight;
  const aspect = CANVAS_LARGURA_REAL / CANVAS_ALTURA_REAL;

  let w = jw;
  let h = w / aspect;
  if (h > jh) {
    h = jh;
    w = h * aspect;
  }

  canvas.style.width = Math.floor(w) + 'px';
  canvas.style.height = Math.floor(h) + 'px';
}

function loop(tempo) {
  const delta = Math.min(tempo - ultimoTempo, 50);
  ultimoTempo = tempo;

  if (cenaAtual) {
    if (cenaAtual.atualizar) cenaAtual.atualizar(delta);
    if (cenaAtual.desenhar) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cenaAtual.desenhar(ctx);
    }
  }

  requestAnimationFrame(loop);
}

function registrarCenaPlaceholder() {
  let t = 0;
  registrarCena('placeholder', {
    iniciar() { t = 0; },
    atualizar(delta) { t += delta; },
    desenhar(ctx) {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, CANVAS_LARGURA_REAL, CANVAS_ALTURA_REAL);

      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.font = 'bold 56px monospace';
      ctx.fillText('42 DNF', CANVAS_LARGURA_REAL / 2, CANVAS_ALTURA_REAL / 2 - 40);

      ctx.font = 'bold 28px monospace';
      ctx.fillText('ZIP 1 - Engine carregada', CANVAS_LARGURA_REAL / 2, CANVAS_ALTURA_REAL / 2 + 20);

      ctx.font = 'bold 20px monospace';
      ctx.fillText('t = ' + (t / 1000).toFixed(1) + 's', CANVAS_LARGURA_REAL / 2, CANVAS_ALTURA_REAL / 2 + 70);
    },
  });
}
