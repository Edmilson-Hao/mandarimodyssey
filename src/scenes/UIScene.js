/**
 * UIScene — HUD legível (v1.2)
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
    this.add.text(4, 3, 'WASD · E interagir', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#e0e0e0',
      stroke: '#000000',
      strokeThickness: 3,
      backgroundColor: '#000000cc',
      padding: { x: 5, y: 3 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    // Versão
    this.add.text(316, 3, 'v1.2', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '9px',
      color: '#888888',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(1, 0).setDepth(DEPTH.UI).setScrollFactor(0);

    // Painel de missão
    this.questTitle = this.add.text(4, 22, '', {
      fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
      fontSize: '11px',
      color: '#f0d080',
      fontStyle: 'bold',
      stroke: '#1a1208',
      strokeThickness: 3,
      backgroundColor: '#000000dd',
      padding: { x: 5, y: 3 }
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    this.questSteps = this.add.text(4, 40, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#dddddd',
      stroke: '#000000',
      strokeThickness: 2,
      backgroundColor: '#000000bb',
      padding: { x: 5, y: 3 },
      lineSpacing: 3
    }).setDepth(DEPTH.UI).setScrollFactor(0);

    // Inventário
    this.invText = this.add.text(4, 158, '', {
      fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
      fontSize: '10px',
      color: '#90ee90',
      stroke: '#003300',
      strokeThickness: 2,
      backgroundColor: '#000000bb',
      padding: { x: 5, y: 3 }
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
        this.questTitle.setText('✓ 任务完成！ Missão concluída');
        this.questSteps.setText('Fale com todos os habitantes da ilha.');
      } else {
        this.questTitle.setText('');
        this.questSteps.setText('');
      }
      return;
    }

    const q = active[0];
    this.questTitle.setText(`任务  ${q.titleZh || q.title}`);
    const lines = q.steps.map(s => (s.done ? '✓ ' : '○ ') + s.text);
    this.questSteps.setText(lines.join('\n'));
  }

  refreshInventory() {
    const items = inventory.getItems();
    if (items.length === 0) {
      this.invText.setText('');
      return;
    }
    const str = items.map(i => `${i.nameZh || i.name} ×${i.qty}`).join('  ·  ');
    this.invText.setText('背包  ' + str);
  }
}
