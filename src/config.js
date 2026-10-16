// ============================================================================
// 42 DNF - Constantes globais
// Unica fonte de verdade. NUNCA hardcode valores em outros modulos.
// ============================================================================

// --- Render ---
export const TILE = 16;
export const ESCALA = 4;
export const CANVAS_LARGURA = 320;
export const CANVAS_ALTURA = 180;
export const CANVAS_LARGURA_REAL = CANVAS_LARGURA * ESCALA;
export const CANVAS_ALTURA_REAL = CANVAS_ALTURA * ESCALA;
export const TILES_VISIVEIS_X = CANVAS_LARGURA / TILE;
export const TILES_VISIVEIS_Y = CANVAS_ALTURA / TILE;

// --- Tempo ---
export const DURACAO_CICLO_MS = 15 * 60 * 1000;
export const HORA_INICIO = 6;
export const HORAS_DIA = 12;
export const HORAS_NOITE = 12;
export const HORA_AMANHECER = 6;
export const TEMPO_AGUAR_MS = DURACAO_CICLO_MS / 8;
export const TEMPO_COLHER_MS = DURACAO_CICLO_MS / 8;

// --- Escurecimento e clareamento (horas de jogo) ---
export const HORA_INICIO_ESCURECER = 18;
export const HORA_ESCURO_TOTAL = 20;
export const HORA_INICIO_CLAREAR = 3;

// --- Economia ---
export const PRECO_SEMENTE = 1;
export const PRECO_OVO = 2;
export const PRECO_LEITE = 8;
export const PRECO_BACON = 40;
export const PRODUCAO_MULT = 10;
export const OVOS_POR_GALINHA_DIA = 5 * PRODUCAO_MULT;
export const LEITE_POR_VACA_DIA = 2 * PRODUCAO_MULT;
export const BACON_POR_PORCO_DIA = 1 * PRODUCAO_MULT;

export const RECEITA_DIARIA_POR_CONJUNTO =
  OVOS_POR_GALINHA_DIA * PRECO_OVO +
  LEITE_POR_VACA_DIA * PRECO_LEITE +
  BACON_POR_PORCO_DIA * PRECO_BACON;

export const FATOR_PRECO_CASA = 0.6;

export function precoCasaNivel(nivel) {
  return Math.round(FATOR_PRECO_CASA * RECEITA_DIARIA_POR_CONJUNTO * nivel * nivel);
}

export function racaoInicial(nivel) {
  return nivel;
}

// --- Velocidades (tiles por segundo) ---
export const VEL_PLAYER_TILES_S = 5;
export const VEL_MONSTRO_INICIAL_TILES_S = 1;
export const VEL_MONSTRO_FINAL_TILES_S = 6;

// --- Fome dos animais ---
export const FOME_MAX = 1.0;
export const FOME_PERDA_POR_12H = 0.5;
export const FOME_POR_RACAO = 0.5;

// --- Limites ---
export const NIVEIS_MAX = 42;
export const TAMANHO_NOME_MAX = 7;

// --- Paleta GBA (Fire Red simplificada) ---
export const CORES = {
  PRETO:        '#000000',
  BRANCO:       '#ffffff',
  GRAMA:        '#78c850',
  GRAMA_ESCURA: '#4a8a30',
  TERRA:        '#a06838',
  TERRA_ESCURA: '#6a4420',
  CASA_PAREDE:  '#e8d0a0',
  CASA_TELHADO: '#c03028',
  CASA_PORTA:   '#6a4420',
  CERCA:        '#8a5a2a',
  AGUA:         '#3898e0',
  PELE:         '#f8c898',
  CABELO:       '#402010',
  ROUPA_M:      '#2050c0',
  ROUPA_F:      '#e050a0',
  MONSTRO:      '#301818',
  VERMELHO:     '#e03030',
  LARANJA:      '#f08020',
  VERDE_UI:     '#40c040',
  CINZA_ESCURO: '#222222',
};

// --- App ---
export const VERSAO = '1.0.0';
export const APP_NOME = '42 DNF';