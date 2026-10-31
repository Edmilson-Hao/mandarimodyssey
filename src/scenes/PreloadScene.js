/**
 * PreloadScene — Carrega / gera assets do MVP.
 * No MVP usamos texturas geradas proceduralmente (sem arquivos PNG externos).
 * Na versão final, substituir por load.image / load.spritesheet reais.
 */

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Barra de progresso simples
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 80, height / 2 - 12, 160, 24);

    const progressBar = this.add.graphics();

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xe8b86d, 1);
      progressBar.fillRect(width / 2 - 76, height / 2 - 8, 152 * value, 16);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    // Gera texturas placeholder (não precisa de arquivos externos)
    this.generatePlaceholderTextures();
  }

  /**
   * Gera texturas simples com Graphics + generateTexture.
   * Substitui assets reais até a produção artística estar pronta.
   */
  generatePlaceholderTextures() {
    // --- Player (32x48) ---
    const playerGfx = this.make.graphics({ x: 0, y: 0, add: false });
    // corpo
    playerGfx.fillStyle(0x4a90d9, 1);
    playerGfx.fillRect(8, 16, 16, 24);
    // cabeça
    playerGfx.fillStyle(0xf5d0a9, 1);
    playerGfx.fillRect(10, 4, 12, 14);
    // cabelo
    playerGfx.fillStyle(0x2c1810, 1);
    playerGfx.fillRect(10, 2, 12, 6);
    // olhos
    playerGfx.fillStyle(0x1a1a1a, 1);
    playerGfx.fillRect(12, 8, 2, 2);
    playerGfx.fillRect(18, 8, 2, 2);
    playerGfx.generateTexture('player', 32, 48);
    playerGfx.destroy();

    // --- NPC (32x48) ---
    const npcGfx = this.make.graphics({ x: 0, y: 0, add: false });
    npcGfx.fillStyle(0xc45c26, 1); // roupa laranja tradicional
    npcGfx.fillRect(8, 16, 16, 24);
    npcGfx.fillStyle(0xf5d0a9, 1);
    npcGfx.fillRect(10, 4, 12, 14);
    npcGfx.fillStyle(0x1a1a1a, 1);
    npcGfx.fillRect(10, 2, 12, 6);
    npcGfx.fillStyle(0x1a1a1a, 1);
    npcGfx.fillRect(12, 8, 2, 2);
    npcGfx.fillRect(18, 8, 2, 2);
    // chapéu simples
    npcGfx.fillStyle(0x8b0000, 1);
    npcGfx.fillRect(8, 0, 16, 4);
    npcGfx.generateTexture('npc_merchant', 32, 48);
    npcGfx.destroy();

    // --- Tiles 16x16 ---
    // Grama
    const grass = this.make.graphics({ x: 0, y: 0, add: false });
    grass.fillStyle(0x3d8b37, 1);
    grass.fillRect(0, 0, 16, 16);
    grass.fillStyle(0x4caf50, 1);
    grass.fillRect(2, 2, 4, 4);
    grass.fillRect(10, 8, 3, 3);
    grass.generateTexture('tile_grass', 16, 16);
    grass.destroy();

    // Caminho de terra
    const path = this.make.graphics({ x: 0, y: 0, add: false });
    path.fillStyle(0xa67c52, 1);
    path.fillRect(0, 0, 16, 16);
    path.fillStyle(0x8b6914, 1);
    path.fillRect(3, 3, 2, 2);
    path.fillRect(11, 10, 2, 2);
    path.generateTexture('tile_path', 16, 16);
    path.destroy();

    // Água
    const water = this.make.graphics({ x: 0, y: 0, add: false });
    water.fillStyle(0x2e86ab, 1);
    water.fillRect(0, 0, 16, 16);
    water.fillStyle(0x4fc3f7, 0.6);
    water.fillRect(2, 4, 6, 2);
    water.generateTexture('tile_water', 16, 16);
    water.destroy();

    // Parede / obstáculo
    const wall = this.make.graphics({ x: 0, y: 0, add: false });
    wall.fillStyle(0x5d4e37, 1);
    wall.fillRect(0, 0, 16, 16);
    wall.fillStyle(0x3e2723, 1);
    wall.fillRect(0, 0, 16, 2);
    wall.fillRect(0, 14, 16, 2);
    wall.generateTexture('tile_wall', 16, 16);
    wall.destroy();

    // Indicador de interação (exclamação)
    const excl = this.make.graphics({ x: 0, y: 0, add: false });
    excl.fillStyle(0xffd700, 1);
    excl.fillRect(6, 0, 4, 10);
    excl.fillRect(6, 12, 4, 4);
    excl.generateTexture('interact_marker', 16, 16);
    excl.destroy();
  }

  create() {
    this.scene.start('MenuScene');
  }
}
