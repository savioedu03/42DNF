// ============================================================================
// 42 DNF - Bootstrapper com tratamento de erro visivel
// ============================================================================
import {
  CANVAS_LARGURA, CANVAS_ALTURA,
  CANVAS_LARGURA_REAL, CANVAS_ALTURA_REAL,
  ESCALA, CORES,
} from './config.js';
import { Player } from './player.js';
import { Input } from './input.js';

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

let canvas, ctx;
let ultimoTempo = 0;
let player, input;

function mostrarErro(msg) {
  if (!ctx) return;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f00';
  ctx.font = 'bold 28px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const linhas = String(msg).split('\n');
  for (let i = 0; i < linhas.length; i++) {
    ctx.fillText(linhas[i], 20, 40 + i * 32);
  }
}

export function iniciarJogo() {
  try {
    canvas = document.getElementById('game');
    if (!canvas) throw new Error('Canvas #game nao encontrado');

    canvas.width = CANVAS_LARGURA_REAL;
    canvas.height = CANVAS_ALTURA_REAL;

    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    ajustarTamanho();
    window.addEventListener('resize', ajustarTamanho);

    player = new Player('menino', Math.floor(CANVAS_LARGURA / 2) - 8, Math.floor(CANVAS_ALTURA / 2) - 11);
    input = new Input();

    ultimoTempo = performance.now();
    requestAnimationFrame(loop);
  } catch (e) {
    mostrarErro('ERRO:\n' + e.message + '\n\n' + (e.stack || ''));
  }
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
  try {
    const delta = Math.min(tempo - ultimoTempo, 50);
    ultimoTempo = tempo;

    player.atualizar(delta, input);

    ctx.fillStyle = CORES.GRAMA;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.desenhar(ctx);
    input.desenhar(ctx);
  } catch (e) {
    mostrarErro('ERRO NO LOOP:\n' + e.message + '\n\n' + (e.stack || ''));
    return;
  }

  requestAnimationFrame(loop);
}

window.addEventListener('error', (e) => {
  mostrarErro('ERRO GLOBAL:\n' + e.message + '\n\n' + (e.filename || '') + ':' + (e.lineno || ''));
});
