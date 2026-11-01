/**
 * WorldScene — Exploração (v1.1)
 * Usa MapManager, múltiplos NPCs, QuestSystem e InventorySystem.
 */

import { Player } from '../entities/Player.js';
import { NPC } from '../entities/NPC.js';
import { MapManager } from '../world/MapManager.js';
import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';
import { events } from '../systems/EventManager.js';

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

const NPC_DEFS = [
  {
    id: 'merchant_01',
    name: '老板 (Lǎo Bǎn)',
    texture: 'npc_merchant',
    x: 176, y: 112,
    facing: 'down',
    dialogueKey: 'merchant_greeting'
  },
  {
    id: 'scholar_01',
    name: '先生 (Xiān Sheng)',
    texture: 'npc_scholar',
    x: 288, y: 160,
    facing: 'left',
    dialogueKey: 'scholar_greeting'
  }
];

export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
    this.player = null;
    this.npcs = [];
    this.nearbyNPC = null;
    this.mapManager = null;
  }

  create() {
    // Mapa
    this.mapManager = new MapManager(this, MAP_DATA).build();
    const bounds = this.mapManager.getBounds();

    // Player
    this.player = new Player(this, 80, 100);

    // NPCs
    this.npcs = NPC_DEFS.map(def => new NPC(this, def.x, def.y, def));

    // Colisões
    this.physics.add.collider(this.player.sprite, this.mapManager.getWalls());
    this.npcs.forEach(npc => {
      this.physics.add.collider(this.player.sprite, npc.sprite);
    });

    // Câmera
    this.cameras.main.setBounds(0, 0, bounds.width, bounds.height);
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.cameras.main.setRoundPixels(true);

    // Eventos de quest/inventário (feedback visual simples via UIScene)
    events.on('quest-completed', (q) => {
      console.log('[Quest] Completa:', q.title);
    });
    events.on('quest-reward', (reward) => {
      inventory.addItem(reward);
      console.log('[Reward]', reward.nameZh || reward.name);
    });
    events.on('inventory-updated', (items) => {
      // UIScene pode escutar isso depois
    });
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
