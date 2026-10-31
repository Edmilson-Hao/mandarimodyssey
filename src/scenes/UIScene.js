/**
 * UIScene — HUD permanente (MVP mínimo).
 */

import { DEPTH } from '../config/gameConfig.js';

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Indicador de controles (canto superior esquerdo)
    this.hint = this.add.text(4, 4, 'WASD · E interagir', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#aaaaaa',
      backgroundColor: '#00000088',
      padding: { x: 3, y: 2 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    // Versão / build
    this.add.text(316, 4, 'MVP 0.1', {
      fontFamily: 'Courier New',
      fontSize: '6px',
      color: '#555555'
    }).setOrigin(1, 0).setDepth(DEPTH.UI).setScrollFactor(0);
  }
}
