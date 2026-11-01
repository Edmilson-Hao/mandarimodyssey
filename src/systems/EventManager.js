/**
 * EventManager — Barramento de eventos global (desacoplamento entre sistemas).
 * Singleton simples.
 */

class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback, context = null) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push({ callback, context });
  }

  off(event, callback) {
    if (!this.listeners.has(event)) return;
    const list = this.listeners.get(event).filter(l => l.callback !== callback);
    this.listeners.set(event, list);
  }

  emit(event, data = null) {
    if (!this.listeners.has(event)) return;
    this.listeners.get(event).forEach(({ callback, context }) => {
      callback.call(context, data);
    });
  }

  clear() {
    this.listeners.clear();
  }
}

export const events = new EventManager();
