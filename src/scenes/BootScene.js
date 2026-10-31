/**
 * BootScene — Inicialização mínima e verificação de ambiente.
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Nada a carregar ainda. Apenas configurações básicas.
  }

  create() {
    // Configurações de pixel art já definidas no gameConfig
    // Garantir que o canvas preserve pixelização
    this.scale.refresh();

    // Transição imediata para preload
    this.scene.start('PreloadScene');
  }
}
