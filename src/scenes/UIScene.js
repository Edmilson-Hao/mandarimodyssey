/**
 * UIScene — HUD permanente (versão 1.0).
 */

import { DEPTH } from '../config/gameConfig.js';

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.hint = this.add.text(4, 4, 'WASD · E interagir', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#cccccc',
      backgroundColor: '#00000099',
      padding: { x: 4, y: 2 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    this.add.text(316, 4, 'v1.0', {
      fontFamily: 'Courier New',
      fontSize: '6px',
      color: '#555555'
    }).setOrigin(1, 0).setDepth(DEPTH.UI).setScrollFactor(0);
  }
}
