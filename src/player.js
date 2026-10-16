import { TILE, ESCALA, VEL_PLAYER_TILES_S } from './config.js';
import { PALETA } from './paleta.js';
import { PLAYER_M_BAIXO } from './player_m_baixo.js';
import { PLAYER_M_CIMA } from './player_m_cima.js';
import { PLAYER_M_LADO } from './player_m_lado.js';
import { PLAYER_F_BAIXO } from './player_f_baixo.js';
import { PLAYER_F_CIMA } from './player_f_cima.js';
import { PLAYER_F_LADO } from './player_f_lado.js';

const SPRITES = {
  menino: { baixo: PLAYER_M_BAIXO, cima: PLAYER_M_CIMA, lado: PLAYER_M_LADO },
  menina: { baixo: PLAYER_F_BAIXO, cima: PLAYER_F_CIMA, lado: PLAYER_F_LADO },
};

const LARGURA_FRAME = 16;
const ALTURA_FRAME = 22;
const TEMPO_FRAME_MS = 150;

export class Player {
  constructor(genero = 'menino', x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.genero = genero;
    this.direcao = 'baixo';
    this.espelhado = false;
    this.frame = 0;
    this.tempoAnim = 0;
  }

  atualizar(delta, input) {
    const vel = (VEL_PLAYER_TILES_S * TILE) / 1000;
    let moveu = false;

    if (input.esq)  { this.x -= vel * delta; this.direcao = 'lado'; this.espelhado = true;  moveu = true; }
    if (input.dir)  { this.x += vel * delta; this.direcao = 'lado'; this.espelhado = false; moveu = true; }
    if (input.cima) { this.y -= vel * delta; this.direcao = 'cima'; this.espelhado = false; moveu = true; }
    if (input.baixo){ this.y += vel * delta; this.direcao = 'baixo'; this.espelhado = false; moveu = true; }

    if (moveu) {
      this.tempoAnim += delta;
      if (this.tempoAnim >= TEMPO_FRAME_MS) {
        this.tempoAnim -= TEMPO_FRAME_MS;
        this.frame = (this.frame + 1) % 4;
      }
    } else {
      this.frame = 0;
      this.tempoAnim = 0;
    }
  }

  desenhar(ctx) {
    const matriz = SPRITES[this.genero][this.direcao];
    if (!matriz) return;

    const offsetColuna = this.frame * LARGURA_FRAME;
    const px = Math.floor(this.x);
    const py = Math.floor(this.y);

    for (let ly = 0; ly < ALTURA_FRAME; ly++) {
      const linha = matriz[ly];
      if (!linha) continue;
      for (let lx = 0; lx < LARGURA_FRAME; lx++) {
        const v = linha[lx + offsetColuna];
        if (!v) continue;
        const cor = PALETA[v];
        if (!cor) continue;

        ctx.fillStyle = cor;
        const drawX = this.espelhado ? (px + (LARGURA_FRAME - 1 - lx)) : (px + lx);
        ctx.fillRect(drawX * ESCALA, (py + ly) * ESCALA, ESCALA, ESCALA);
      }
    }
  }
}