/**
 * Ponto de entrada — Mandarin Odyssey v1.2
 * Inicializa Phaser e registra todas as cenas.
 */

import { gameConfig } from './config/gameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { WorldScene } from './scenes/WorldScene.js';
import { DialogueScene } from './scenes/DialogueScene.js';
import { UIScene } from './scenes/UIScene.js';

// Registro de cenas na ordem de inicialização
gameConfig.scene = [
  BootScene,
  PreloadScene,
  MenuScene,
  WorldScene,
  DialogueScene,
  UIScene
];

// Inicialização do jogo
const game = new Phaser.Game(gameConfig);

// Expor para debug em desenvolvimento
if (typeof window !== 'undefined') {
  window.__MANDARIN_ODYSSEY__ = game;
}

export default game;
