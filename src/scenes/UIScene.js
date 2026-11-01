/**
 * UIScene — HUD com missão ativa e inventário (v1.1).
 */

import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';
import { events } from '../systems/EventManager.js';

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Controles
    this.add.text(4, 4, 'WASD · E interagir', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#cccccc',
      backgroundColor: '#00000099',
      padding: { x: 4, y: 2 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    // Versão
    this.add.text(316, 4, 'v1.1', {
      fontFamily: 'Courier New',
      fontSize: '6px',
      color: '#555555'
    }).setOrigin(1, 0).setDepth(DEPTH.UI).setScrollFactor(0);

    // Painel de missão
    this.questTitle = this.add.text(4, 20, '', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#e8b86d',
      backgroundColor: '#000000aa',
      padding: { x: 4, y: 2 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    this.questSteps = this.add.text(4, 34, '', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#aaaaaa',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 },
      lineSpacing: 2
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    // Inventário resumido
    this.invText = this.add.text(4, 160, '', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#88cc88',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    this.refreshQuest();
    this.refreshInventory();

    events.on('quest-updated', () => this.refreshQuest(), this);
    events.on('quest-step-completed', () => this.refreshQuest(), this);
    events.on('quest-completed', () => this.refreshQuest(), this);
    events.on('inventory-updated', () => this.refreshInventory(), this);
  }

  refreshQuest() {
    const active = quests.getActiveQuests();
    if (active.length === 0) {
      const completed = quests.getQuest('first_meeting');
      if (completed && completed.status === 'completed') {
        this.questTitle.setText('✓ Missão concluída!');
        this.questSteps.setText('Fale com todos os habitantes.');
      } else {
        this.questTitle.setText('');
        this.questSteps.setText('');
      }
      return;
    }

    const q = active[0];
    this.questTitle.setText(`任务 ${q.titleZh || q.title}`);
    const lines = q.steps.map(s => (s.done ? '✓ ' : '○ ') + s.text);
    this.questSteps.setText(lines.join('\n'));
  }

  refreshInventory() {
    const items = inventory.getItems();
    if (items.length === 0) {
      this.invText.setText('');
      return;
    }
    const str = items.map(i => `${i.nameZh || i.name} x${i.qty}`).join(' · ');
    this.invText.setText('背包: ' + str);
  }
}
