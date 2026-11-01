/**
 * DialogueScene — Interface de diálogo legível (v1.5)
 * Alinhado ao World Design da Ilha do Despertar.
 */

import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';

const DIALOGUES = {
  merchant_greeting: {
    lines: [
      { speaker: '老板', hanzi: '你好！欢迎！', pinyin: 'Nǐ hǎo! Huānyíng!', pt: 'Olá! Bem-vindo!' },
      { speaker: '老板', hanzi: '我是老板。', pinyin: 'Wǒ shì lǎobǎn.', pt: 'Eu sou o dono da loja.' },
      { speaker: '老板', hanzi: '你想买东西吗？', pinyin: 'Nǐ xiǎng mǎi dōngxi ma?', pt: 'Você quer comprar algo?' },
      { speaker: '老板', hanzi: '这个苹果很好。', pinyin: 'Zhège píngguǒ hěn hǎo.', pt: 'Esta maçã é muito boa.' }
    ],
    onComplete: () => {
      quests.completeStep('quest_first_purchase', 'step_talk_laoban');
      quests.completeStep('quest_first_purchase', 'step_buy_apple');
      if (!inventory.hasItem('item_red_apple')) {
        inventory.addItem({ id: 'item_red_apple', name: 'Maçã Vermelha', nameZh: '红苹果', qty: 1 });
      }
    }
  },
  scholar_greeting: {
    lines: [
      { speaker: '先生', hanzi: '你好，学生。', pinyin: 'Nǐ hǎo, xuéshēng.', pt: 'Olá, estudante.' },
      { speaker: '先生', hanzi: '学习中文很重要。', pinyin: 'Xuéxí Zhōngwén hěn zhòngyào.', pt: 'Aprender chinês é muito importante.' },
      { speaker: '先生', hanzi: '慢慢来，加油！', pinyin: 'Màn man lái, jiāyóu!', pt: 'Vá com calma, força!' }
    ],
    onComplete: () => {
      quests.completeStep('quest_first_meeting', 'step_talk_villager');
    }
  },
  chen_greeting: {
    lines: [
      { speaker: '陈先生', hanzi: '欢迎来到茶馆。', pinyin: 'Huānyíng lái dào cháguǎn.', pt: 'Bem-vindo à casa de chá.' },
      { speaker: '陈先生', hanzi: '请坐，喝茶。', pinyin: 'Qǐng zuò, hē chá.', pt: 'Por favor, sente-se e beba chá.' },
      { speaker: '陈先生', hanzi: '我叫陈先生。你呢？', pinyin: 'Wǒ jiào Chén xiānsheng. Nǐ ne?', pt: 'Eu me chamo Sr. Chen. E você?' },
      { speaker: '陈先生', hanzi: '很好。这是欢迎茶。', pinyin: 'Hěn hǎo. Zhè shì huānyíng chá.', pt: 'Muito bem. Isto é o chá de boas-vindas.' }
    ],
    onComplete: () => {
      quests.completeStep('quest_first_meeting', 'step_talk_villager');
      quests.completeStep('quest_first_meeting', 'step_go_tea_house');
      quests.completeStep('quest_first_meeting', 'step_talk_chen');
      if (!inventory.hasItem('item_welcome_tea')) {
        inventory.addItem({ id: 'item_welcome_tea', name: 'Chá de Boas-Vindas', nameZh: '欢迎茶', qty: 1 });
      }
    }
  },
  default: {
    lines: [
      { speaker: 'NPC', hanzi: '你好。', pinyin: 'Nǐ hǎo.', pt: 'Olá.' }
    ]
  }
};

export class DialogueScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogueScene' });
    this.currentLine = 0;
    this.lines = [];
    this.onComplete = null;
  }

  init(data) {
    const key = data.dialogueKey || 'default';
    const def = DIALOGUES[key] || DIALOGUES.default;
    this.lines = def.lines;
    this.onComplete = def.onComplete || null;
    this.currentLine = 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.35)
      .setDepth(DEPTH.DIALOGUE).setScrollFactor(0);

    this.add.image(width / 2, height - 40, 'dialogue_box')
      .setDepth(DEPTH.DIALOGUE + 1).setScrollFactor(0);

    this.nameText = this.add.text(12, height - 74, '', {
      fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
      fontSize: '13px',
      color: '#f0d080',
      fontStyle: 'bold',
      stroke: '#1a1208',
      strokeThickness: 3
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.hanziText = this.add.text(12, height - 60, '', {
      fontFamily: 'Arial, "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4,
      wordWrap: { width: width - 28 }
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.pinyinText = this.add.text(12, height - 38, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: '#a8d4f0',
      stroke: '#0a1520',
      strokeThickness: 3
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.ptText = this.add.text(12, height - 20, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: '#c8c8c8',
      stroke: '#111111',
      strokeThickness: 2
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.add.text(width - 10, height - 8, 'E / Espaço ▶', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#e8b86d',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(1, 1).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.showLine(0);

    this.input.keyboard.on('keydown-E', this.advance, this);
    this.input.keyboard.on('keydown-SPACE', this.advance, this);
    this.input.keyboard.on('keydown-ENTER', this.advance, this);
  }

  showLine(index) {
    if (index >= this.lines.length) {
      this.finishDialogue();
      return;
    }
    const line = this.lines[index];
    this.nameText.setText(line.speaker);
    this.hanziText.setText(line.hanzi);
    this.pinyinText.setText(line.pinyin || '');
    this.ptText.setText(line.pt || '');
  }

  advance() {
    this.currentLine++;
    this.showLine(this.currentLine);
  }

  finishDialogue() {
    if (typeof this.onComplete === 'function') {
      this.onComplete();
    }
    this.closeDialogue();
  }

  closeDialogue() {
    this.input.keyboard.off('keydown-E', this.advance, this);
    this.input.keyboard.off('keydown-SPACE', this.advance, this);
    this.input.keyboard.off('keydown-ENTER', this.advance, this);

    this.scene.stop();
    this.scene.resume('WorldScene');
    const world = this.scene.get('WorldScene');
    if (world) world.events.emit('dialogue-closed');
  }
}
