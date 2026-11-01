/**
 * QuestSystem — v1.3
 */

import { events } from './EventManager.js';

const QUESTS = {
  first_meeting: {
    id: 'first_meeting',
    title: 'Primeiro Encontro',
    titleZh: '第一次见面',
    description: 'Conheça os habitantes da Ilha do Despertar.',
    steps: [
      { id: 'talk_merchant', text: 'Falar com o 老板 (mercador)', done: false },
      { id: 'talk_scholar', text: 'Falar com o 先生 (sábio)', done: false },
      { id: 'talk_chen', text: 'Visitar a casa de chá (陈先生)', done: false }
    ],
    reward: { id: 'red_apple', name: 'Maçã Vermelha', nameZh: '红苹果', qty: 1 }
  }
};

class QuestSystem {
  constructor() {
    this.quests = {};
    this.activate('first_meeting');
  }

  activate(id) {
    if (!QUESTS[id]) return false;
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
    }
    events.emit('quest-updated', this.getActiveQuests());
    return true;
  }

  getActiveQuests() {
    return Object.values(this.quests).filter(q => q.status === 'active');
  }

  getQuest(id) {
    return this.quests[id] || null;
  }
}

export const quests = new QuestSystem();
