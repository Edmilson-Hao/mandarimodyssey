/**
 * WorldScene — Ilha do Despertar v2.0
 * 3 zonas + 7 NPCs + progressão
 */
import { Player } from '../entities/Player.js';
import { NPC } from '../entities/NPC.js';
import { MapManager } from '../world/MapManager.js';
import { events } from '../systems/EventManager.js';
import { inventory } from '../systems/InventorySystem.js';

const NPC_DEFS = [
  // Vila
  { id: 'chen_01', name: '陈先生', texture: 'npc_chen', x: 17*16+8, y: 16*16+8, facing: 'down', dialogueKey: 'chen_greeting' },
  { id: 'mei_01', name: '美', texture: 'npc_merchant', x: 10*16+8, y: 14*16+8, facing: 'down', dialogueKey: 'mei_greeting' },
  // Mercado
  { id: 'merchant_01', name: '老板', texture: 'npc_merchant', x: 26*16+8, y: 14*16+8, facing: 'down', dialogueKey: 'merchant_greeting' },
  { id: 'hua_01', name: '花', texture: 'npc_merchant', x: 29*16+8, y: 16*16+8, facing: 'left', dialogueKey: 'hua_greeting' },
  // Academia
  { id: 'wen_01', name: '文老师', texture: 'npc_chen', x: 12*16+8, y: 6*16+8, facing: 'down', dialogueKey: 'scholar_greeting' },
  { id: 'xiaoyu_01', name: '小雨', texture: 'npc_merchant', x: 14*16+8, y: 8*16+8, facing: 'left', dialogueKey: 'xiaoyu_greeting' },
  // Cais
  { id: 'hai_01', name: '海叔', texture: 'npc_merchant', x: 33*16+8, y: 24*16+8, facing: 'up', dialogueKey: 'fisherman_greeting' }
];

export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
    this.player = null;
    this.npcs = [];
    this.nearbyNPC = null;
    this.currentZone = null;
    this.zoneText = null;
  }

  create() {
    this.mapManager = new MapManager(this).build();
    const bounds = this.mapManager.getBounds();

    this.player = new Player(this, 12*16+8, 14*16+8);
    this.npcs = NPC_DEFS.map(d => new NPC(this, d.x, d.y, d));

    this.physics.add.collider(this.player.sprite, this.mapManager.getWalls());
    this.npcs.forEach(n => this.physics.add.collider(this.player.sprite, n.sprite));

    this.cameras.main.setBounds(0, 0, bounds.width, bounds.height);
    this.cameras.main.startFollow(this.player.sprite, true, 0.12, 0.12);
    this.cameras.main.setRoundPixels(true);

    // Indicador de zona
    this.zoneText = this.add.text(160, 4, '', {
      fontFamily: 'Arial', fontSize: '11px', color: '#f0d080',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100);

    events.on('quest-reward', r => inventory.addItem(r));
  }

  update() {
    if (!this.player) return;
    this.player.update();

    // Zona atual
    const z = this.mapManager.getZoneAt(this.player.sprite.x, this.player.sprite.y);
    if (z && z !== this.currentZone) {
      this.currentZone = z;
      this.zoneText.setText(z.name);
    }

    this.nearbyNPC = null;
    this.npcs.forEach(npc => {
      const dist = Phaser.Math.Distance.Between(
        this.player.sprite.x, this.player.sprite.y, npc.sprite.x, npc.sprite.y);
      const near = dist < 40;
      npc.setHighlight(near);
      if (near) this.nearbyNPC = npc;
    });

    if (this.player.justPressedInteract() && this.nearbyNPC) {
      this.scene.pause();
      this.scene.launch('DialogueScene', {
        npcId: this.nearbyNPC.id,
        npcName: this.nearbyNPC.name,
        dialogueKey: this.nearbyNPC.dialogueKey
      });
    }
  }
}
