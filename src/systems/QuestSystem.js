/**
 * QuestSystem — v1.6 (Ilha do Despertar completa)
 */
import { events } from './EventManager.js';

const QUESTS = {
  quest_first_meeting: {
    id: 'quest_first_meeting', title: 'Primeiro Encontro', titleZh: '第一次见面',
    description: 'Conheça o Sr. Chen na Casa de Chá.',
    steps: [
      { id: 'step_talk_villager', text: 'Falar com um morador', done: false },
      { id: 'step_go_tea_house', text: 'Ir à Casa de Chá', done: false },
      { id: 'step_talk_chen', text: 'Conversar com 陈先生', done: false }
    ],
    reward: { id: 'item_welcome_tea', name: 'Chá de Boas-Vindas', nameZh: '欢迎茶', qty: 1 }
  },
  quest_first_purchase: {
    id: 'quest_first_purchase', title: 'Primeira Compra', titleZh: '第一次买东西',
    description: 'Compre uma maçã no mercado.',
    steps: [
      { id: 'step_enter_market', text: 'Entrar no Mercado', done: false },
      { id: 'step_talk_laoban', text: 'Falar com 老板', done: false },
      { id: 'step_buy_apple', text: 'Comprar 红苹果', done: false }
    ],
    reward: { id: 'item_red_apple', name: 'Maçã Vermelha', nameZh: '红苹果', qty: 1 }
  },
  quest_first_lesson: {
    id: 'quest_first_lesson', title: 'Primeira Lição', titleZh: '第一课',
    description: 'Estude com Mestre Wen.',
    steps: [
      { id: 'step_enter_academy', text: 'Entrar na Academia', done: false },
      { id: 'step_talk_wen', text: 'Falar com 文老师', done: false },
      { id: 'step_study', text: 'Participar da lição', done: false }
    ],
    reward: { id: 'item_student_notebook', name: 'Caderno do Estudante', nameZh: '学生笔记本', qty: 1 }
  },
  quest_make_friend: {
    id: 'quest_make_friend', title: 'Fazer um Amigo', titleZh: '交个朋友',
    description: 'Torne-se amigo de Xiao Yu.',
    steps: [
      { id: 'step_talk1', text: 'Primeira conversa', done: false },
      { id: 'step_talk2', text: 'Segunda conversa', done: false },
      { id: 'step_talk3', text: 'Terceira conversa', done: false }
    ],
    reward: null
  }
};

class QuestSystem {
  constructor() {
    this.quests = {};
    this.activate('quest_first_meeting');
  }

  activate(id) {
    if (!QUESTS[id] || this.quests[id]) return false;
    const q = JSON.parse(JSON.stringify(QUESTS[id]));
    q.status = 'active';
    this.quests[id] = q;
    events.emit('quest-updated', this.getActiveQuests());
    return true;
  }

  completeStep(questId, stepId) {
    const q = this.quests[questId];
    if (!q || q.status !== 'active') return false;
    const step = q.steps.find(s => s.id === stepId);
    if (!step || step.done) return false;
    step.done = true;
    events.emit('quest-step-completed', { questId, stepId });
    if (q.steps.every(s => s.done)) {
      q.status = 'completed';
      events.emit('quest-completed', q);
      if (q.reward) events.emit('quest-reward', q.reward);
      if (questId === 'quest_first_meeting') this.activate('quest_first_purchase');
      if (questId === 'quest_first_purchase') this.activate('quest_first_lesson');
    }
    events.emit('quest-updated', this.getActiveQuests());
    return true;
  }

  getActiveQuests() { return Object.values(this.quests).filter(q => q.status === 'active'); }
  getQuest(id) { return this.quests[id] || null; }
}

export const quests = new QuestSystem();
