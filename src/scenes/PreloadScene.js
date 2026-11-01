/**
 * PreloadScene — Carrega todos os assets PNG reais (v1.1).
 */

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);

    this.add.text(width / 2, height / 2 - 30, 'MANDARIN ODYSSEY', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      color: '#e8b86d'
    }).setOrigin(0.5);

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.9);
    progressBox.fillRect(width / 2 - 80, height / 2 - 6, 160, 14);

    const progressBar = this.add.graphics();

    const loadingText = this.add.text(width / 2, height / 2 + 20, 'Carregando...', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#888888'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xe8b86d, 1);
      progressBar.fillRect(width / 2 - 78, height / 2 - 4, 156 * value, 10);
      loadingText.setText(`Carregando... ${Math.floor(value * 100)}%`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // ===== SPRITES =====
    this.load.spritesheet('player', 'assets/sprites/player.png', {
      frameWidth: 32, frameHeight: 48
    });
    this.load.spritesheet('npc_merchant', 'assets/sprites/npc_merchant.png', {
      frameWidth: 32, frameHeight: 48
    });
    this.load.spritesheet('npc_scholar', 'assets/sprites/npc_scholar.png', {
      frameWidth: 32, frameHeight: 48
    });

    // ===== TILES =====
    this.load.image('tile_grass_01', 'assets/tiles/tile_grass_01.png');
    this.load.image('tile_grass_02', 'assets/tiles/tile_grass_02.png');
    this.load.image('tile_grass_03', 'assets/tiles/tile_grass_03.png');
    this.load.image('tile_path_01', 'assets/tiles/tile_path_01.png');
    this.load.image('tile_path_02', 'assets/tiles/tile_path_02.png');
    this.load.image('tile_water_01', 'assets/tiles/tile_water_01.png');
    this.load.image('tile_water_02', 'assets/tiles/tile_water_02.png');
    this.load.image('tile_wall', 'assets/tiles/tile_wall.png');
    this.load.image('tile_tree', 'assets/tiles/tile_tree.png');
    this.load.image('tile_flower', 'assets/tiles/tile_flower.png');
    this.load.image('tile_rock', 'assets/tiles/tile_rock.png');

    // ===== UI =====
    this.load.image('dialogue_box', 'assets/ui/dialogue_box.png');
    this.load.image('interact_marker', 'assets/ui/interact_marker.png');
    this.load.image('button', 'assets/ui/button.png');
  }

  create() {
    this.createAnimations();
    this.scene.start('MenuScene');
  }

  createAnimations() {
    const dirs = ['down', 'left', 'right', 'up'];
    const characters = ['player', 'npc_merchant', 'npc_scholar'];

    characters.forEach(char => {
      dirs.forEach((dir, row) => {
        this.anims.create({
          key: `${char}_idle_${dir}`,
          frames: [{ key: char, frame: row * 3 + 0 }],
          frameRate: 1,
          repeat: -1
        });
        this.anims.create({
          key: `${char}_walk_${dir}`,
          frames: [
            { key: char, frame: row * 3 + 1 },
            { key: char, frame: row * 3 + 0 },
            { key: char, frame: row * 3 + 2 },
            { key: char, frame: row * 3 + 0 }
          ],
          frameRate: char === 'player' ? 8 : 6,
          repeat: -1
        });
      });
    });
  }
}
