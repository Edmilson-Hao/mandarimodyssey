/**
 * PreloadScene — Assets prioritários v1.4 (inspirados nas imagens-conceito)
 */

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    const { width, height } = this.cameras.main;
    this.add.rectangle(width/2, height/2, width, height, 0x1a1a2e);
    this.add.text(width/2, height/2 - 28, 'MANDARIN ODYSSEY', {
      fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#f0d080',
      fontStyle: 'bold', stroke: '#1a1208', strokeThickness: 3
    }).setOrigin(0.5);

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.9);
    progressBox.fillRect(width/2 - 80, height/2 - 4, 160, 12);
    const progressBar = this.add.graphics();
    const loadingText = this.add.text(width/2, height/2 + 18, 'Carregando ilha...', {
      fontFamily: 'Arial', fontSize: '10px', color: '#888', stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);

    this.load.on('progress', v => {
      progressBar.clear();
      progressBar.fillStyle(0xe8b86d, 1);
      progressBar.fillRect(width/2 - 78, height/2 - 2, 156 * v, 8);
      loadingText.setText(`Carregando... ${Math.floor(v*100)}%`);
    });
    this.load.on('complete', () => {
      progressBar.destroy(); progressBox.destroy(); loadingText.destroy();
    });

    // Sprites — prioritários
    this.load.spritesheet('player', 'assets/sprites/player.png', { frameWidth:32, frameHeight:48 });
    this.load.spritesheet('npc_merchant', 'assets/sprites/npc_merchant.png', { frameWidth:32, frameHeight:48 });
    this.load.spritesheet('npc_chen', 'assets/sprites/npc_chen.png', { frameWidth:32, frameHeight:48 });
    this.load.spritesheet('npc_scholar', 'assets/sprites/npc_scholar.png', { frameWidth:32, frameHeight:48 }); // alias

    // Tiles
    const tiles = [
      'tile_grass_01','tile_grass_02','tile_grass_03',
      'tile_path_01','tile_path_02','tile_water_01','tile_water_02',
      'tile_dirt','tile_sand','tile_stone',
      'tile_wall_wood','tile_wall_plaster','tile_roof','tile_roof_edge','tile_roof_thatch',
      'tile_door','tile_window',
      'tile_tree_top','tile_tree_trunk','tile_bush','tile_flower','tile_rock',
      'tile_dock','tile_wall'
    ];
    tiles.forEach(t => this.load.image(t, `assets/tiles/${t}.png`));

    // Props
    [
      'prop_lantern','prop_barrel','prop_crate','prop_table','prop_fence','prop_well',
      'prop_bush','prop_tree_top','prop_tree_trunk','prop_house_red','prop_house_thatch'
    ].forEach(p => {
      this.load.image(p, `assets/props/${p}.png`);
    });

    // UI
    this.load.image('dialogue_box', 'assets/ui/dialogue_box.png');
    this.load.image('interact_marker', 'assets/ui/interact_marker.png');
    this.load.image('button', 'assets/ui/button.png');
  }

  create() {
    this.createAnimations();
    this.scene.start('MenuScene');
  }

  createAnimations() {
    const dirs = ['down','left','right','up'];
    ['player','npc_merchant','npc_chen','npc_scholar'].forEach(char => {
      dirs.forEach((dir, row) => {
        this.anims.create({
          key: `${char}_idle_${dir}`,
          frames: [{ key: char, frame: row*3 }],
          frameRate: 1, repeat: -1
        });
        this.anims.create({
          key: `${char}_walk_${dir}`,
          frames: [
            { key: char, frame: row*3+1 },
            { key: char, frame: row*3 },
            { key: char, frame: row*3+2 },
            { key: char, frame: row*3 }
          ],
          frameRate: char === 'player' ? 8 : 6,
          repeat: -1
        });
      });
    });
  }
}
