/**
 * DialogueScene — Interface de diálogo com asset real (versão 1.0).
 */

import { DEPTH } from '../config/gameConfig.js';

const DIALOGUES = {
  merchant_greeting: {
    lines: [
      {
        speaker: '老板',
        hanzi: '你好！欢迎来到我的商店。',
        pinyin: 'Nǐ hǎo! Huānyíng lái dào wǒ de shāngdiàn.',
        pt: 'Olá! Bem-vindo à minha loja.'
      },
      {
        speaker: '老板',
        hanzi: '你想买什么？',
        pinyin: 'Nǐ xiǎng mǎi shénme?',
        pt: 'O que você quer comprar?'
      },
      {
        speaker: '老板',
        hanzi: '我这里有很多好东西。',
        pinyin: 'Wǒ zhèlǐ yǒu hěn duō hǎo dōngxi.',
        pt: 'Aqui eu tenho muitas coisas boas.'
      },
      {
        speaker: '系统',
        hanzi: '（继续探索……）',
        pinyin: '',
        pt: '(Continue explorando o mundo...)'
      }
    ]
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
    this.npcName = '';
  }

  init(data) {
    this.npcName = data.npcName || 'NPC';
    const key = data.dialogueKey || 'default';
    this.lines = (DIALOGUES[key] || DIALOGUES.default).lines;
    this.currentLine = 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45)
      .setDepth(DEPTH.DIALOGUE)
      .setScrollFactor(0);

    // Caixa de diálogo (asset)
    const boxY = height - 36;
    this.add.image(width / 2, boxY, 'dialogue_box')
      .setDepth(DEPTH.DIALOGUE + 1)
      .setScrollFactor(0);

    // Nome
    this.nameText = this.add.text(14, height - 66, '', {
      fontFamily: 'Courier New',
      fontSize: '9px',
      color: '#e8b86d'
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    // Hanzi
    this.hanziText = this.add.text(14, height - 52, '', {
      fontFamily: 'Courier New',
      fontSize: '11px',
      color: '#ffffff',
      wordWrap: { width: width - 32 }
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    // Pinyin
    this.pinyinText = this.add.text(14, height - 36, '', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#a0c4e8'
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    // Tradução
    this.ptText = this.add.text(14, height - 22, '', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#999999'
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    // Instrução
    this.add.text(width - 14, height - 8, 'E / Espaço', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#666666'
    }).setOrigin(1, 1).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.showLine(0);

    this.input.keyboard.on('keydown-E', this.advance, this);
    this.input.keyboard.on('keydown-SPACE', this.advance, this);
    this.input.keyboard.on('keydown-ENTER', this.advance, this);
  }

  showLine(index) {
    if (index >= this.lines.length) {
      this.closeDialogue();
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
