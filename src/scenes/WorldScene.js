/**
 * WorldScene — Exploração do mundo (MVP).
 * Mapa procedural simples + player + 1 NPC + colisões.
 */

import { Player } from '../entities/Player.js';
import { NPC } from '../entities/NPC.js';
import { DEPTH, GAME_WIDTH, GAME_HEIGHT } from '../config/gameConfig.js';

// Mapa 20×12 tiles (320×192 → cortamos para 180 de altura lógica)
// 0 = grama, 1 = caminho, 2 = água, 3 = parede
const MAP_DATA = [
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,1,0,0,0,1,0,0,0,0,0,0,2,2,2,0,0,3],
  [3,0,0,1,0,0,0,1,1,1,1,0,0,0,2,2,2,0,0,3],
  [3,0,0,1,0,0,0,0,0,0,1,0,0,0,2,2,2,0,0,3],
  [3,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
];

const TILE_SIZE = 16;
const MAP_W = MAP_DATA[0].length * TILE_SIZE;
const MAP_H = MAP_DATA.length * TILE_SIZE;

export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
    this.player = null;
    this.npcs = [];
    this.nearbyNPC = null;
  }

  create() {
    // Mundo físico
    this.physics.world.setBounds(0, 0, MAP_W, MAP_H);

    // Desenha o mapa
    this.createMap();

    // Player
    this.player = new Player(this, 48, 80);

    // NPC mercador
    const merchant = new NPC(this, 160, 96, {
      id: 'merchant_01',
      name: '老老板 (Lǎo Bǎn)',
      texture: 'npc_merchant',
      dialogueKey: 'merchant_greeting'
    });
    this.npcs.push(merchant);

    // Colisões player × paredes
    this.physics.add.collider(this.player.sprite, this.walls);

    // Colisões player × NPCs
    this.npcs.forEach(npc => {
      this.physics.add.collider(this.player.sprite, npc.sprite);
    });

    // Câmera
    this.cameras.main.setBounds(0, 0, MAP_W, MAP_H);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    // Evento de diálogo (escuta retorno da DialogueScene)
    this.events.on('dialogue-closed', () => {
      // Pode reativar input se necessário
    });
  }

  createMap() {
    this.walls = this.physics.add.staticGroup();

    const tileKey = {
      0: 'tile_grass',
      1: 'tile_path',
      2: 'tile_water',
      3: 'tile_wall'
    };

    for (let row = 0; row < MAP_DATA.length; row++) {
      for (let col = 0; col < MAP_DATA[row].length; col++) {
        const tileType = MAP_DATA[row][col];
        const x = col * TILE_SIZE + TILE_SIZE / 2;
        const y = row * TILE_SIZE + TILE_SIZE / 2;

        // Visual
        const img = this.add.image(x, y, tileKey[tileType]);
        img.setDepth(DEPTH.GROUND);

        // Colisão para parede e água
        if (tileType === 3 || tileType === 2) {
          const wall = this.walls.create(x, y, tileKey[tileType]);
          wall.setVisible(false); // já desenhamos o visual acima
          wall.refreshBody();
        }
      }
    }
  }

  update() {
    if (!this.player) return;

    this.player.update();

    // Detecção de NPC próximo
    this.nearbyNPC = null;
    this.npcs.forEach(npc => {
      const dist = Phaser.Math.Distance.Between(
        this.player.sprite.x, this.player.sprite.y,
        npc.sprite.x, npc.sprite.y
      );
      const isNear = dist < 36;
      npc.setHighlight(isNear);
      if (isNear) this.nearbyNPC = npc;
    });

    // Interação
    if (this.player.justPressedInteract() && this.nearbyNPC) {
      this.openDialogue(this.nearbyNPC);
    }
  }

  openDialogue(npc) {
    // Pausa a WorldScene e abre DialogueScene
    this.scene.pause();
    this.scene.launch('DialogueScene', {
      npcId: npc.id,
      npcName: npc.name,
      dialogueKey: npc.dialogueKey
    });
  }
}
