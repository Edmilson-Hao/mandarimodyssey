/**
 * UIScene — HUD + Quest Log legível (v2.0)
 */

import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';
import { events } from '../systems/EventManager.js';

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
    this.questPanel = null;
    this.questTexts = [];
    this.invText = null;
  }

  create() {
    // Controles
    this.add.text(4, 3, 'WASD mover · E interagir', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#f0f0f0',
      stroke: '#000000',
      strokeThickness: 3,
      backgroundColor: '#000000aa',
      padding: { x: 5, y: 3 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    // Versão
    this.add.text(316, 3, 'v2.0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '9px',
      color: '#aaaaaa',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(1, 0).setDepth(DEPTH.UI).setScrollFactor(0);

    // Painel de missões (canto superior direito)
    this.questPanel = this.add.rectangle(250, 50, 130, 70, 0x1a1208, 0.85)
      .setStrokeStyle(1, 0xc4a35a)
      .setDepth(DEPTH.UI).setScrollFactor(0).setOrigin(0, 0);

    this.add.text(255, 53, 'MISSÕES', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#f0d080',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2
    }).setDepth(DEPTH.UI + 1).setScrollFactor(0);

    this.questTexts = [];
    for (let i = 0; i < 4; i++) {
      this.questTexts.push(
        this.add.text(255, 68 + i * 12, '', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '9px',
          color: '#e0e0e0',
          stroke: '#000',
          strokeThickness: 2,
          wordWrap: { width: 120 }
        }).setDepth(DEPTH.UI + 1).setScrollFactor(0)
      );
    }

    // Inventário resumido
    this.invText = this.add.text(4, 168, 'Itens: —', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '9px',
      color: '#c8e0a0',
      stroke: '#000',
      strokeThickness: 2,
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    this.refreshQuests();
    this.refreshInventory();

    events.on('quest-updated', () => this.refreshQuests());
    events.on('quest-completed', () => this.refreshQuests());
    events.on('quest-reward', () => this.refreshInventory());
    events.on('inventory-changed', () => this.refreshInventory());
  }

  refreshQuests() {
    const active = quests.getActiveQuests();
    this.questTexts.forEach((t, i) => {
      if (active[i]) {
        const q = active[i];
        const done = q.steps.filter(s => s.done).length;
        const total = q.steps.length;
        t.setText(`• ${q.title} (${done}/${total})`);
        t.setColor(done === total ? '#80e080' : '#e0e0e0');
      } else {
        t.setText('');
      }
    });
  }

  refreshInventory() {
    const items = inventory.getAll ? inventory.getAll() : [];
    if (!items || items.length === 0) {
      this.invText.setText('Itens: —');
      return;
    }
    const names = items.map(i => i.nameZh || i.name).join(', ');
    this.invText.setText(`Itens: ${names}`);
  }
}
