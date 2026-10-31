/**
 * NPC — Personagem não-jogável interativo.
 */

import { DEPTH } from '../config/gameConfig.js';

export class NPC {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {object} data - { id, name, texture, dialogueKey }
   */
  constructor(scene, x, y, data) {
    this.scene = scene;
    this.id = data.id;
    this.name = data.name || 'NPC';
    this.dialogueKey = data.dialogueKey || 'default';

    this.sprite = scene.physics.add.sprite(x, y, data.texture || 'npc_merchant');
    this.sprite.setImmovable(true);
    this.sprite.setDepth(DEPTH.NPCS);
    this.sprite.setSize(14, 10);
    this.sprite.setOffset(9, 34);
    this.sprite.body.moves = false;

    // Marker de interação (visível quando próximo)
    this.marker = scene.add.image(x, y - 28, 'interact_marker')
      .setDepth(DEPTH.OVERHEAD)
      .setVisible(false)
      .setScale(0.7);

    // Zona de interação
    this.interactZone = scene.add.zone(x, y, 40, 40);
    scene.physics.world.enable(this.interactZone);
    this.interactZone.body.setAllowGravity(false);
    this.interactZone.body.moves = false;
  }

  /**
   * Mostra/esconde o marcador de interação.
   */
  setHighlight(active) {
    this.marker.setVisible(active);
  }

  destroy() {
    this.sprite.destroy();
    this.marker.destroy();
    this.interactZone.destroy();
  }
}
