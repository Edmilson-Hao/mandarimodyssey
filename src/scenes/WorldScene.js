/**
 * WorldScene — Exploração do mundo (versão 1.0).
 * Mapa com tiles reais, decorações, animações e colisões.
 */

import { Player } from '../entities/Player.js';
import { NPC } from '../entities/NPC.js';
import { DEPTH, GAME_WIDTH, GAME_HEIGHT } from '../config/gameConfig.js';

/**
 * Mapa 24×14 tiles (384×224)
 * 0 = grama, 1 = caminho, 2 = água, 3 = parede
 * 4 = árvore, 5 = flor, 6 = pedra
 */
const MAP_DATA = [
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,4,0,0,1,1,1,1,1,0,0,0,0,0,0,4,0,0,0,0,4,0,3],
  [3,0,0,0,0,1,0,0,0,1,0,0,5,0,0,0,0,0,0,5,0,0,0,3],
  [3,0,0,0,0,1,0,0,0,1,1,1,1,0,0,2,2,2,0,0,0,0,0,3],
  [3,0,5,0,0,1,0,0,0,0,0,0,1,0,0,2,2,2,0,0,0,6,0,3],
  [3,0,0,0,0,1,1,1,1,1,1,1,1,0,0,2,2,2,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
];

const TILE_SIZE = 16;
const MAP_W = MAP_DATA[0].length * TILE_SIZE;
const MAP_H = MAP_DATA.length * TILE_SIZE;

const GRASS_KEYS = ['tile_grass_01', 'tile_grass_02', 'tile_grass_03'];
const PATH_KEYS = ['tile_path_01', 'tile_path_02'];
const WATER_KEYS = ['tile_water_01', 'tile_water_02'];

export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
    this.player = null;
    this.npcs = [];
    this.nearbyNPC = null;
  }

  create() {
    this.physics.world.setBounds(0, 0, MAP_W, MAP_H);

    this.createMap();

    // Player
    this.player = new Player(this, 80, 100);

    // NPC mercador
    const merchant = new NPC(this, 176, 112, {
      id: 'merchant_01',
      name: '老板 (Lǎo Bǎn)',
      texture: 'npc_merchant',
      dialogueKey: 'merchant_greeting',
      facing: 'down'
    });
    this.npcs.push(merchant);

    // Colisões
    this.physics.add.collider(this.player.sprite, this.walls);
    this.npcs.forEach(npc => {
      this.physics.add.collider(this.player.sprite, npc.sprite);
    });

    // Câmera
    this.cameras.main.setBounds(0, 0, MAP_W, MAP_H);
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.cameras.main.setRoundPixels(true);

    this.events.on('dialogue-closed', () => {});
  }

  createMap() {
    this.walls = this.physics.add.staticGroup();

    for (let row = 0; row < MAP_DATA.length; row++) {
      for (let col = 0; col < MAP_DATA[row].length; col++) {
        const tileType = MAP_DATA[row][col];
        const x = col * TILE_SIZE + TILE_SIZE / 2;
        const y = row * TILE_SIZE + TILE_SIZE / 2;
        const seed = (row * 17 + col * 31) % 3;

        let key = GRASS_KEYS[seed % 3];
        let depth = DEPTH.GROUND;
        let collide = false;

        if (tileType === 1) {
          key = PATH_KEYS[seed % 2];
        } else if (tileType === 2) {
          key = WATER_KEYS[seed % 2];
          collide = true;
        } else if (tileType === 3) {
          key = 'tile_wall';
          collide = true;
        } else if (tileType === 4) {
          // grama + árvore por cima
          this.add.image(x, y, GRASS_KEYS[seed % 3]).setDepth(DEPTH.GROUND);
          key = 'tile_tree';
          depth = DEPTH.OBJECTS;
          collide = true;
        } else if (tileType === 5) {
          this.add.image(x, y, GRASS_KEYS[seed % 3]).setDepth(DEPTH.GROUND);
          key = 'tile_flower';
          depth = DEPTH.OBJECTS;
        } else if (tileType === 6) {
          this.add.image(x, y, GRASS_KEYS[seed % 3]).setDepth(DEPTH.GROUND);
          key = 'tile_rock';
          depth = DEPTH.OBJECTS;
          collide = true;
        }

        const img = this.add.image(x, y, key).setDepth(depth);

        if (collide) {
          const body = this.walls.create(x, y, key);
          body.setVisible(false);
          body.refreshBody();
          // hitbox um pouco menor para árvores/pedras
          if (tileType === 4 || tileType === 6) {
            body.setSize(12, 12);
            body.setOffset(2, 2);
          }
        }
      }
    }
  }

  update() {
    if (!this.player) return;

    this.player.update();

    this.nearbyNPC = null;
    this.npcs.forEach(npc => {
      const dist = Phaser.Math.Distance.Between(
        this.player.sprite.x, this.player.sprite.y,
        npc.sprite.x, npc.sprite.y
      );
      const isNear = dist < 38;
      npc.setHighlight(isNear);
      if (isNear) this.nearbyNPC = npc;
    });

    if (this.player.justPressedInteract() && this.nearbyNPC) {
      this.openDialogue(this.nearbyNPC);
    }
  }

  openDialogue(npc) {
    this.scene.pause();
    this.scene.launch('DialogueScene', {
      npcId: npc.id,
      npcName: npc.name,
      dialogueKey: npc.dialogueKey
    });
  }
}
