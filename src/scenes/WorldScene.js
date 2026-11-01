/**
 * WorldScene — Ilha do Despertar (v1.3)
 * Mapa real com vila, caminhos, casa de chá e cais.
 */

import { Player } from '../entities/Player.js';
import { NPC } from '../entities/NPC.js';
import { MapManager } from '../world/MapManager.js';
import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';
import { events } from '../systems/EventManager.js';

const NPC_DEFS = [
  {
    id: 'merchant_01',
    name: '老板 (Lǎo Bǎn)',
    texture: 'npc_merchant',
    x: 11 * 16 + 8,
    y: 7 * 16 + 8,
    facing: 'down',
    dialogueKey: 'merchant_greeting'
  },
  {
    id: 'scholar_01',
    name: '先生 (Xiān Sheng)',
    texture: 'npc_scholar',
    x: 23 * 16 + 8,
    y: 8 * 16 + 8,
    facing: 'left',
    dialogueKey: 'scholar_greeting'
  },
  {
    id: 'chen_01',
    name: '陈先生 (Chén Xiānsheng)',
    texture: 'npc_scholar',
    x: 23 * 16 + 8,
    y: 22 * 16 + 8,
    facing: 'down',
    dialogueKey: 'chen_greeting'
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
    this.mapManager = new MapManager(this).build();
    const bounds = this.mapManager.getBounds();

    this.player = new Player(this, 8 * 16 + 8, 8 * 16 + 8);

    this.npcs = NPC_DEFS.map(def => new NPC(this, def.x, def.y, def));

    this.physics.add.collider(this.player.sprite, this.mapManager.getWalls());
    this.npcs.forEach(npc => {
      this.physics.add.collider(this.player.sprite, npc.sprite);
    });

    this.cameras.main.setBounds(0, 0, bounds.width, bounds.height);
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.cameras.main.setRoundPixels(true);

    events.on('quest-completed', q => console.log('[Quest]', q.title));
    events.on('quest-reward', reward => {
      inventory.addItem(reward);
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
      const near = dist < 40;
      npc.setHighlight(near);
      if (near) this.nearbyNPC = npc;
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
