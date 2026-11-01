/**
 * DialogueScene — Interface de diálogo + integração com quests (v1.1).
 */

import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';
import { events } from '../systems/EventManager.js';

const DIALOGUES = {
  merchant_greeting: {
    lines: [
      { speaker: '老板', hanzi: '你好！欢迎！', pinyin: 'Nǐ hǎo! Huānyíng!', pt: 'Olá! Bem-vindo!' },
      { speaker: '老板', hanzi: '我是老板。', pinyin: 'Wǒ shì lǎobǎn.', pt: 'Eu sou o dono da loja.' },
      { speaker: '老板', hanzi: '你想买东西吗？', pinyin: 'Nǐ xiǎng mǎi dōngxi ma?', pt: 'Você quer comprar algo?' },
      { speaker: '老板', hanzi: '给你一个红苹果。', pinyin: 'Gěi nǐ yīgè hóng píngguǒ.', pt: 'Tome uma maçã vermelha.' }
    ],
    onComplete: (scene) => {
      quests.completeStep('first_meeting', 'talk_merchant');
      // presente do mercador
      if (!inventory.hasItem('red_apple')) {
        inventory.addItem({ id: 'red_apple', name: 'Maçã Vermelha', nameZh: '红苹果', qty: 1 });
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
      quests.completeStep('first_meeting', 'talk_scholar');
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
    this.dialogueKey = 'default';
    this.onComplete = null;
  }

  init(data) {
    this.dialogueKey = data.dialogueKey || 'default';
    const def = DIALOGUES[this.dialogueKey] || DIALOGUES.default;
    this.lines = def.lines;
    this.onComplete = def.onComplete || null;
    this.currentLine = 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45)
      .setDepth(DEPTH.DIALOGUE)
      .setScrollFactor(0);

    this.add.image(width / 2, height - 36, 'dialogue_box')
      .setDepth(DEPTH.DIALOGUE + 1)
      .setScrollFactor(0);

    this.nameText = this.add.text(14, height - 66, '', {
      fontFamily: 'Courier New', fontSize: '9px', color: '#e8b86d'
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.hanziText = this.add.text(14, height - 52, '', {
      fontFamily: 'Courier New', fontSize: '11px', color: '#ffffff',
      wordWrap: { width: width - 32 }
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.pinyinText = this.add.text(14, height - 36, '', {
      fontFamily: 'Courier New', fontSize: '8px', color: '#a0c4e8'
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.ptText = this.add.text(14, height - 22, '', {
      fontFamily: 'Courier New', fontSize: '8px', color: '#999999'
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.add.text(width - 14, height - 8, 'E / Espaço', {
      fontFamily: 'Courier New', fontSize: '7px', color: '#666666'
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
      this.onComplete(this);
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
