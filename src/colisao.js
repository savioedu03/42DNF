import { TILE } from './config.js';

export function distancia(a, b) {
  const dx = (a.x - b.x) / TILE;
  const dy = (a.y - b.y) / TILE;
  return Math.sqrt(dx * dx + dy * dy);
}

export function verificarColisao(player, mapa) {
  return false;
}