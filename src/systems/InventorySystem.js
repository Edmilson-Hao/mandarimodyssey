/**
 * InventorySystem — Inventário mínimo do jogador.
 */

import { events } from './EventManager.js';

class InventorySystem {
  constructor() {
    this.items = []; // { id, name, nameZh, qty }
  }

  addItem(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      this.items.push({
        id: item.id,
        name: item.name,
        nameZh: item.nameZh || item.name,
        qty: item.qty || 1
      });
    }
    events.emit('inventory-updated', this.getItems());
    return true;
  }

  hasItem(id, qty = 1) {
    const item = this.items.find(i => i.id === id);
    return item && item.qty >= qty;
  }

  removeItem(id, qty = 1) {
    const item = this.items.find(i => i.id === id);
    if (!item || item.qty < qty) return false;
    item.qty -= qty;
    if (item.qty <= 0) {
      this.items = this.items.filter(i => i.id !== id);
    }
    events.emit('inventory-updated', this.getItems());
    return true;
  }

  getItems() {
    return [...this.items];
  }

  clear() {
    this.items = [];
  }
}

export const inventory = new InventorySystem();
