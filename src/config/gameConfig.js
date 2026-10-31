/**
 * Configuração central do Phaser 3 — Mandarin Odyssey
 * Resolução lógica: 320×180 (16:9) com pixelArt obrigatório.
 */

export const GAME_WIDTH = 320;
export const GAME_HEIGHT = 180;

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#1a1a2e',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [], // cenas registradas em main.js
  audio: {
    disableWebAudio: false
  },
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true
  }
};

/** Teclas de controle padrão */
export const CONTROLS = {
  UP: ['W', 'UP'],
  DOWN: ['S', 'DOWN'],
  LEFT: ['A', 'LEFT'],
  RIGHT: ['D', 'RIGHT'],
  INTERACT: ['E', 'SPACE'],
  MENU: ['ESC']
};

/** Camadas de profundidade (depth) */
export const DEPTH = {
  GROUND: 0,
  OBJECTS: 10,
  NPCS: 20,
  PLAYER: 30,
  OVERHEAD: 40,
  UI: 100,
  DIALOGUE: 200
};
