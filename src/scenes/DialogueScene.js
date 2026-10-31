/**
 * DialogueScene — Interface de diálogo (MVP com texto fixo).
 * Na versão final: comunicação com backend → IA → validação lexical.
 */

import { DEPTH } from '../config/gameConfig.js';

// Diálogos placeholder (substituídos por IA + backend)
const DIALOGUES = {
  merchant_greeting: {
    lines: [
      { speaker: '老板', hanzi: '你好！欢迎来到我的商店。', pinyin: 'Nǐ hǎo! Huānyíng lái dào wǒ de shāngdiàn.', pt: 'Olá! Bem-vindo à minha loja.' },
      { speaker: '老板', hanzi: '你想买什么？', pinyin: 'Nǐ xiǎng mǎi shénme?', pt: 'O que você quer comprar?' },
      { speaker: '系统', hanzi: '（继续探索……）', pinyin: '', pt: '(Continue explorando...)' }
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

    // Overlay semi-transparente
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.4)
      .setDepth(DEPTH.DIALOGUE);

    // Caixa de diálogo
    this.box = this.add.rectangle(width / 2, height - 40, width - 16, 68, 0x1a1a2e)
      .setStrokeStyle(2, 0xe8b86d)
      .setDepth(DEPTH.DIALOGUE + 1);

    // Nome do falante
    this.nameText = this.add.text(12, height - 70, '', {
      fontFamily: 'Courier New',
      fontSize: '9px',
      color: '#e8b86d'
    }).setDepth(DEPTH.DIALOGUE + 2);

    // Hanzi
    this.hanziText = this.add.text(12, height - 56, '', {
      fontFamily: 'Courier New',
      fontSize: '11px',
      color: '#ffffff',
      wordWrap: { width: width - 30 }
    }).setDepth(DEPTH.DIALOGUE + 2);

    // Pinyin
    this.pinyinText = this.add.text(12, height - 40, '', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#a0c4e8'
    }).setDepth(DEPTH.DIALOGUE + 2);

    // Tradução PT
    this.ptText = this.add.text(12, height - 26, '', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#888888'
    }).setDepth(DEPTH.DIALOGUE + 2);

    // Instrução
    this.add.text(width - 12, height - 10, 'E / Espaço →', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#666666'
    }).setOrigin(1, 1).setDepth(DEPTH.DIALOGUE + 2);

    this.showLine(0);

    // Input
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
    this.pinyinText.setText(line.pinyin);
    this.ptText.setText(line.pt);
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
    this.scene.get('WorldScene').events.emit('dialogue-closed');
  }
}
