/**
 * DialogueScene — Diálogos legíveis + resposta digitada pelo jogador
 */

import { DEPTH } from '../config/gameConfig.js';
import { quests } from '../systems/QuestSystem.js';
import { inventory } from '../systems/InventorySystem.js';

/**
 * Formato de linha:
 * - speaker, hanzi, pinyin, pt
 * - input?: { prompt, accepted: string[], hint?, successHanzi?, successPinyin?, successPt? }
 */
const DIALOGUES = {
  chen_greeting: {
    lines: [
      { speaker: '陈先生', hanzi: '欢迎来到茶馆。', pinyin: 'Huānyíng lái dào cháguǎn.', pt: 'Bem-vindo à casa de chá.' },
      { speaker: '陈先生', hanzi: '请坐，喝茶。', pinyin: 'Qǐng zuò, hē chá.', pt: 'Por favor, sente-se e beba chá.' },
      {
        speaker: '陈先生',
        hanzi: '我叫陈先生。你呢？',
        pinyin: 'Wǒ jiào Chén xiānsheng. Nǐ ne?',
        pt: 'Eu me chamo Sr. Chen. E você?',
        input: {
          prompt: 'Digite seu nome ou: 你好 / ni hao',
          accepted: ['你好', 'ni hao', 'nǐ hǎo', 'nihão', 'ola', 'olá', 'oi', 'hello'],
          hint: 'Tente: ni hao',
          successHanzi: '很好！欢迎！',
          successPinyin: 'Hěn hǎo! Huānyíng!',
          successPt: 'Muito bem! Bem-vindo!'
        }
      },
      { speaker: '陈先生', hanzi: '这是欢迎茶。请喝。', pinyin: 'Zhè shì huānyíng chá. Qǐng hē.', pt: 'Isto é o chá de boas-vindas. Por favor, beba.' }
    ],
    onComplete: () => {
      ['step_talk_villager', 'step_go_tea_house', 'step_talk_chen'].forEach(s =>
        quests.completeStep('quest_first_meeting', s));
      if (!inventory.hasItem('item_welcome_tea')) {
        inventory.addItem({ id: 'item_welcome_tea', name: 'Chá de Boas-Vindas', nameZh: '欢迎茶', qty: 1 });
      }
    }
  },
  merchant_greeting: {
    lines: [
      { speaker: '老板', hanzi: '你好！欢迎！', pinyin: 'Nǐ hǎo! Huānyíng!', pt: 'Olá! Bem-vindo!' },
      { speaker: '老板', hanzi: '我是老板。', pinyin: 'Wǒ shì lǎobǎn.', pt: 'Eu sou o dono.' },
      { speaker: '老板', hanzi: '这个苹果三块钱。', pinyin: 'Zhège píngguǒ sān kuài qián.', pt: 'Esta maçã custa três yuan.' },
      {
        speaker: '老板',
        hanzi: '要吗？',
        pinyin: 'Yào ma?',
        pt: 'Quer?',
        input: {
          prompt: 'Responda: 要 / yao  ou  不要 / bu yao',
          accepted: ['要', 'yao', 'yào', 'sim', 'quero', 'yes', '不要', 'bu yao', 'bù yào', 'nao', 'não'],
          hint: 'yao = quero · bu yao = não quero',
          successHanzi: '好！给你。',
          successPinyin: 'Hǎo! Gěi nǐ.',
          successPt: 'Ótimo! Tome.'
        }
      }
    ],
    onComplete: () => {
      ['step_enter_market', 'step_talk_laoban', 'step_buy_apple'].forEach(s =>
        quests.completeStep('quest_first_purchase', s));
      if (!inventory.hasItem('item_red_apple')) {
        inventory.addItem({ id: 'item_red_apple', name: 'Maçã Vermelha', nameZh: '红苹果', qty: 1 });
      }
    }
  },
  scholar_greeting: {
    lines: [
      { speaker: '文老师', hanzi: '你好，学生。', pinyin: 'Nǐ hǎo, xuéshēng.', pt: 'Olá, estudante.' },
      { speaker: '文老师', hanzi: '请坐。我们学习。', pinyin: 'Qǐng zuò. Wǒmen xuéxí.', pt: 'Por favor, sente-se. Vamos estudar.' },
      {
        speaker: '文老师',
        hanzi: '这是什么？……书。请说：书',
        pinyin: 'Zhè shì shénme? … Shū. Qǐng shuō: shū',
        pt: 'O que é isto? … Livro. Por favor diga: shu',
        input: {
          prompt: 'Digite: 书  ou  shu',
          accepted: ['书', 'shu', 'shū'],
          hint: 'shu = livro',
          successHanzi: '很好。你是好学生。',
          successPinyin: 'Hěn hǎo. Nǐ shì hǎo xuéshēng.',
          successPt: 'Muito bem. Você é um bom estudante.'
        }
      }
    ],
    onComplete: () => {
      ['step_enter_academy', 'step_talk_wen', 'step_study'].forEach(s =>
        quests.completeStep('quest_first_lesson', s));
      if (!inventory.hasItem('item_student_notebook')) {
        inventory.addItem({ id: 'item_student_notebook', name: 'Caderno do Estudante', nameZh: '学生笔记本', qty: 1 });
      }
    }
  },
  mei_greeting: {
    lines: [
      { speaker: '美', hanzi: '你好！', pinyin: 'Nǐ hǎo!', pt: 'Olá!' },
      {
        speaker: '美',
        hanzi: '我叫美。你呢？',
        pinyin: 'Wǒ jiào Měi. Nǐ ne?',
        pt: 'Eu me chamo Mei. E você?',
        input: {
          prompt: 'Responda: 你好  ou  ni hao',
          accepted: ['你好', 'ni hao', 'nǐ hǎo', 'ola', 'olá', 'oi'],
          hint: 'ni hao',
          successHanzi: '很高兴认识你。',
          successPinyin: 'Hěn gāoxìng rènshí nǐ.',
          successPt: 'Prazer em conhecê-lo.'
        }
      }
    ],
    onComplete: () => quests.completeStep('quest_first_meeting', 'step_talk_villager')
  },
  xiaoyu_greeting: {
    lines: [
      { speaker: '小雨', hanzi: '嗨！我是小雨。', pinyin: 'Hāi! Wǒ shì Xiǎo Yǔ.', pt: 'Oi! Eu sou Xiao Yu.' },
      {
        speaker: '小雨',
        hanzi: '我们做朋友吧！好吗？',
        pinyin: 'Wǒmen zuò péngyou ba! Hǎo ma?',
        pt: 'Vamos ser amigos! Pode ser?',
        input: {
          prompt: 'Responda: 好  ou  hao',
          accepted: ['好', 'hao', 'hǎo', 'sim', 'ok', 'vamos'],
          hint: 'hao = ok / bom',
          successHanzi: '太好了！一起玩！',
          successPinyin: 'Tài hǎo le! Yīqǐ wán!',
          successPt: 'Que ótimo! Vamos brincar juntos!'
        }
      }
    ],
    onComplete: () => quests.completeStep('quest_make_friend', 'step_talk1')
  },
  fisherman_greeting: {
    lines: [
      { speaker: '海叔', hanzi: '你好。', pinyin: 'Nǐ hǎo.', pt: 'Olá.' },
      { speaker: '海叔', hanzi: '我是海叔。', pinyin: 'Wǒ shì Hǎi shū.', pt: 'Eu sou Tio Hai.' },
      {
        speaker: '海叔',
        hanzi: '这是鱼。很大。看见了吗？',
        pinyin: 'Zhè shì yú. Hěn dà. Kànjiàn le ma?',
        pt: 'Isto é peixe. Bem grande. Viu?',
        input: {
          prompt: 'Responda: 看见了  ou  kanjian le',
          accepted: ['看见了', 'kanjian le', 'kànjiàn le', 'sim', 'vi', 'kan jian'],
          hint: 'kanjian le = vi',
          successHanzi: '好。给你一条。',
          successPinyin: 'Hǎo. Gěi nǐ yī tiáo.',
          successPt: 'Bom. Te dou um.'
        }
      }
    ],
    onComplete: () => {
      if (!inventory.hasItem('item_fish')) {
        inventory.addItem({ id: 'item_fish', name: 'Peixe', nameZh: '鱼', qty: 1 });
      }
    }
  },
  hua_greeting: {
    lines: [
      { speaker: '花', hanzi: '你好！吃饺子吗？', pinyin: 'Nǐ hǎo! Chī jiǎozi ma?', pt: 'Olá! Quer comer pastel?' },
      {
        speaker: '花',
        hanzi: '很好吃！要吗？',
        pinyin: 'Hěn hǎochī! Yào ma?',
        pt: 'É delicioso! Quer?',
        input: {
          prompt: 'Responda: 要  ou  yao',
          accepted: ['要', 'yao', 'yào', 'sim', 'quero'],
          hint: 'yao = quero',
          successHanzi: '给你一个。',
          successPinyin: 'Gěi nǐ yīgè.',
          successPt: 'Tome um.'
        }
      }
    ],
    onComplete: () => {
      if (!inventory.hasItem('item_dumpling')) {
        inventory.addItem({ id: 'item_dumpling', name: 'Pastel', nameZh: '饺子', qty: 1 });
      }
    }
  },
  default: {
    lines: [{ speaker: 'NPC', hanzi: '你好。', pinyin: 'Nǐ hǎo.', pt: 'Olá.' }]
  }
};

function normalizeAnswer(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents for pinyin match
    .replace(/\s+/g, ' ');
}

export class DialogueScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogueScene' });
    this.currentLine = 0;
    this.lines = [];
    this.onComplete = null;
    this.awaitingInput = false;
    this.domInput = null;
    this.feedbackText = null;
  }

  init(data) {
    const key = data.dialogueKey || 'default';
    const def = DIALOGUES[key] || DIALOGUES.default;
    this.lines = def.lines;
    this.onComplete = def.onComplete || null;
    this.currentLine = 0;
    this.awaitingInput = false;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.4)
      .setDepth(DEPTH.DIALOGUE).setScrollFactor(0);

    this.add.image(width / 2, height - 40, 'dialogue_box')
      .setDepth(DEPTH.DIALOGUE + 1).setScrollFactor(0);

    this.nameText = this.add.text(12, height - 74, '', {
      fontFamily: 'Arial, "Microsoft YaHei", sans-serif', fontSize: '13px', color: '#f0d080',
      fontStyle: 'bold', stroke: '#1a1208', strokeThickness: 3
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.hanziText = this.add.text(12, height - 58, '', {
      fontFamily: 'Arial, "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: '16px', color: '#ffffff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 4, wordWrap: { width: width - 28 }
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.pinyinText = this.add.text(12, height - 36, '', {
      fontFamily: 'Arial', fontSize: '12px', color: '#a8d4f0',
      stroke: '#0a1520', strokeThickness: 3
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.ptText = this.add.text(12, height - 18, '', {
      fontFamily: 'Arial', fontSize: '11px', color: '#c8c8c8',
      stroke: '#111', strokeThickness: 2
    }).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.hintText = this.add.text(width / 2, height - 88, '', {
      fontFamily: 'Arial', fontSize: '10px', color: '#e8b86d',
      stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5, 1).setDepth(DEPTH.DIALOGUE + 3).setScrollFactor(0);

    this.feedbackText = this.add.text(width / 2, height / 2 - 10, '', {
      fontFamily: 'Arial', fontSize: '14px', color: '#7dffa0',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(DEPTH.DIALOGUE + 4).setScrollFactor(0);

    this.advanceHint = this.add.text(width - 8, height - 6, 'E / Espaço ▶', {
      fontFamily: 'Arial', fontSize: '10px', color: '#e8b86d',
      stroke: '#000', strokeThickness: 2
    }).setOrigin(1, 1).setDepth(DEPTH.DIALOGUE + 2).setScrollFactor(0);

    this.showLine(0);

    this.input.keyboard.on('keydown-E', this.onAdvanceKey, this);
    this.input.keyboard.on('keydown-SPACE', this.onAdvanceKey, this);
    this.input.keyboard.on('keydown-ENTER', this.onEnterKey, this);
  }

  onAdvanceKey() {
    if (this.awaitingInput) return;
    this.advance();
  }

  onEnterKey() {
    if (this.awaitingInput) {
      this.submitInput();
    } else {
      this.advance();
    }
  }

  showLine(i) {
    if (i >= this.lines.length) {
      this.finishDialogue();
      return;
    }
    const L = this.lines[i];
    this.nameText.setText(L.speaker);
    this.hanziText.setText(L.hanzi);
    this.pinyinText.setText(L.pinyin || '');
    this.ptText.setText(L.pt || '');
    this.feedbackText.setText('');
    this.hintText.setText('');

    if (L.input) {
      this.awaitingInput = true;
      this.advanceHint.setText('Digite e Enter ↵');
      this.hintText.setText(L.input.prompt || 'Digite sua resposta');
      this.openDomInput(L.input);
    } else {
      this.awaitingInput = false;
      this.advanceHint.setText('E / Espaço ▶');
      this.closeDomInput();
    }
  }

  openDomInput(inputDef) {
    this.closeDomInput();
    const canvas = this.game.canvas;
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / this.cameras.main.width;

    const el = document.createElement('input');
    el.type = 'text';
    el.placeholder = inputDef.hint || 'sua resposta...';
    el.autocomplete = 'off';
    el.spellcheck = false;
    Object.assign(el.style, {
      position: 'fixed',
      left: `${rect.left + rect.width * 0.15}px`,
      top: `${rect.top + rect.height * 0.42}px`,
      width: `${rect.width * 0.7}px`,
      height: `${Math.max(28, 22 * scale)}px`,
      fontSize: `${Math.max(14, 12 * scale)}px`,
      fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
      padding: '4px 8px',
      border: '2px solid #c4a574',
      borderRadius: '4px',
      background: '#1a1520',
      color: '#f5f0e6',
      outline: 'none',
      zIndex: '9999',
      textAlign: 'center'
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.submitInput();
      }
      e.stopPropagation();
    });
    document.body.appendChild(el);
    el.focus();
    this.domInput = el;
    this.currentInputDef = inputDef;
  }

  closeDomInput() {
    if (this.domInput && this.domInput.parentNode) {
      this.domInput.parentNode.removeChild(this.domInput);
    }
    this.domInput = null;
  }

  submitInput() {
    if (!this.awaitingInput || !this.currentInputDef) return;
    const raw = this.domInput ? this.domInput.value : '';
    const answer = normalizeAnswer(raw);
    const accepted = (this.currentInputDef.accepted || []).map(normalizeAnswer);
    const ok = accepted.some(a => a === answer || answer.includes(a) || a.includes(answer));

    if (!ok && answer.length > 0) {
      // aceita qualquer tentativa com 2+ chars como "esforço" pedagógico, mas mostra dica
      this.feedbackText.setColor('#ffb0b0');
      this.feedbackText.setText(`Tente de novo · ${this.currentInputDef.hint || ''}`);
      if (this.domInput) {
        this.domInput.value = '';
        this.domInput.focus();
      }
      // se tentou 3+ vezes, deixa passar
      this._failCount = (this._failCount || 0) + 1;
      if (this._failCount < 3) return;
    }

    this._failCount = 0;
    this.awaitingInput = false;
    this.closeDomInput();

    const def = this.currentInputDef;
    this.feedbackText.setColor('#7dffa0');
    this.feedbackText.setText(def.successPt || '好！');

    // Mostra resposta de sucesso do NPC
    if (def.successHanzi) {
      this.hanziText.setText(def.successHanzi);
      this.pinyinText.setText(def.successPinyin || '');
      this.ptText.setText(def.successPt || '');
      this.hintText.setText('');
      this.advanceHint.setText('E / Espaço ▶');
      // próxima linha ao avançar
      this._afterSuccess = true;
    } else {
      this.time.delayedCall(400, () => this.advance());
    }
  }

  advance() {
    if (this.awaitingInput) return;
    if (this._afterSuccess) {
      this._afterSuccess = false;
      this.feedbackText.setText('');
    }
    this.currentLine++;
    this.showLine(this.currentLine);
  }

  finishDialogue() {
    this.closeDomInput();
    if (typeof this.onComplete === 'function') this.onComplete();
    this.closeDialogue();
  }

  closeDialogue() {
    this.closeDomInput();
    this.input.keyboard.off('keydown-E', this.onAdvanceKey, this);
    this.input.keyboard.off('keydown-SPACE', this.onAdvanceKey, this);
    this.input.keyboard.off('keydown-ENTER', this.onEnterKey, this);
    this.scene.stop();
    this.scene.resume('WorldScene');
  }
}
