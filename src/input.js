import { CANVAS_LARGURA, CANVAS_ALTURA, ESCALA } from './config.js';

const TAM = 22;
const MARGEM = 12;

export class Input {
  constructor() {
    this.cima = false;
    this.baixo = false;
    this.esq = false;
    this.dir = false;
    this.acao = false;

    const cx = MARGEM + 30;
    const cy = CANVAS_ALTURA - MARGEM - 30;

    this.botoes = {
      cima:  { x: cx - TAM / 2, y: cy - 30, w: TAM, h: TAM },
      baixo: { x: cx - TAM / 2, y: cy + 8,  w: TAM, h: TAM },
      esq:   { x: cx - 30,      y: cy - TAM / 2, w: TAM, h: TAM },
      dir:   { x: cx + 8,       y: cy - TAM / 2, w: TAM, h: TAM },
      acao:  { x: CANVAS_LARGURA - MARGEM - 40, y: CANVAS_ALTURA - MARGEM - 40, w: 40, h: 40 },
    };

    window.addEventListener('touchstart', (e) => this._processar(e), { passive: false });
    window.addEventListener('touchmove',  (e) => this._processar(e), { passive: false });
    window.addEventListener('touchend',   (e) => this._processar(e), { passive: false });
    window.addEventListener('touchcancel',(e) => this._processar(e), { passive: false });
    window.addEventListener('mousedown',  (e) => this._processarMouse(e));
    window.addEventListener('mousemove',  (e) => this._processarMouse(e));
    window.addEventListener('mouseup',    () => this._limpar());
  }

  _limpar() {
    this.cima = this.baixo = this.esq = this.dir = this.acao = false;
  }

  _processar(e) {
    e.preventDefault();
    this._limpar();
    const canvas = document.getElementById('game');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    for (const t of e.touches) {
      const x = (t.clientX - rect.left) / rect.width  * CANVAS_LARGURA;
      const y = (t.clientY - rect.top)  / rect.height * CANVAS_ALTURA;
      this._checarBotao(x, y);
    }
  }

  _processarMouse(e) {
    if (e.buttons <= 0) return;
    const canvas = document.getElementById('game');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  * CANVAS_LARGURA;
    const y = (e.clientY - rect.top)  / rect.height * CANVAS_ALTURA;
    this._checarBotao(x, y);
  }

  _checarBotao(x, y) {
    for (const nome of ['cima', 'baixo', 'esq', 'dir', 'acao']) {
      const b = this.botoes[nome];
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
        this[nome] = true;
      }
    }
  }

  desenhar(ctx) {
    for (const nome of ['cima', 'baixo', 'esq', 'dir', 'acao']) {
      const b = this.botoes[nome];
      const ativo = this[nome];
      ctx.fillStyle = ativo ? 'rgba(255,255,255,0.55)' : 'rgba(30,30,30,0.55)';
      ctx.fillRect(b.x * ESCALA, b.y * ESCALA, b.w * ESCALA, b.h * ESCALA);
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x * ESCALA, b.y * ESCALA, b.w * ESCALA, b.h * ESCALA);
    }

    ctx.fillStyle = '#ffffff';
    const seta = (b, dir) => {
      const cx = (b.x + b.w / 2) * ESCALA;
      const cy = (b.y + b.h / 2) * ESCALA;
      const r = 8 * ESCALA / 2;
      ctx.beginPath();
      if (dir === 'cima')  { ctx.moveTo(cx, cy - r); ctx.lineTo(cx - r, cy + r); ctx.lineTo(cx + r, cy + r); }
      if (dir === 'baixo') { ctx.moveTo(cx, cy + r); ctx.lineTo(cx - r, cy - r); ctx.lineTo(cx + r, cy - r); }
      if (dir === 'esq')   { ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy - r); ctx.lineTo(cx + r, cy + r); }
      if (dir === 'dir')   { ctx.moveTo(cx + r, cy); ctx.lineTo(cx - r, cy - r); ctx.lineTo(cx - r, cy + r); }
      ctx.closePath();
      ctx.fill();
    };
    seta(this.botoes.cima, 'cima');
    seta(this.botoes.baixo, 'baixo');
    seta(this.botoes.esq, 'esq');
    seta(this.botoes.dir, 'dir');

    const a = this.botoes.acao;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold ' + (20 * ESCALA) + 'px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', (a.x + a.w / 2) * ESCALA, (a.y + a.h / 2) * ESCALA);
  }
}