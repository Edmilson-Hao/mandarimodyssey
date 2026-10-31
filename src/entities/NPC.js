/**
 * NPC — Personagem não-jogável interativo com animação idle.
 */

import { DEPTH } from '../config/gameConfig.js';

export class NPC {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {object} data - { id, name, texture, dialogueKey, facing }
   */
  constructor(scene, x, y, data) {
    this.scene = scene;
    this.id = data.id;
    this.name = data.name || 'NPC';
    this.dialogueKey = data.dialogueKey || 'default';
    this.facing = data.facing || 'down';

    const texture = data.texture || 'npc_merchant';
    this.sprite = scene.physics.add.sprite(x, y, texture, 0);
    this.sprite.setImmovable(true);
    this.sprite.setDepth(DEPTH.NPCS);
    this.sprite.setSize(12, 8);
    this.sprite.setOffset(10, 38);
    this.sprite.body.moves = false;

    // Animação idle
    const animKey = `${texture}_idle_${this.facing}`;
    if (scene.anims.exists(animKey)) {
      this.sprite.anims.play(animKey);
    }

    // Marker de interação
    this.marker = scene.add.image(x, y - 30, 'interact_marker')
      .setDepth(DEPTH.OVERHEAD)
      .setVisible(false)
      .setScale(0.8);

    // Zona de interação
    this.interactZone = scene.add.zone(x, y, 44, 44);
    scene.physics.world.enable(this.interactZone);
    this.interactZone.body.setAllowGravity(false);
    this.interactZone.body.moves = false;
  }

  setHighlight(active) {
    this.marker.setVisible(active);
    if (active) {
      this.marker.y = this.sprite.y - 30 + Math.sin(this.scene.time.now / 200) * 2;
    }
  }

  destroy() {
    this.sprite.destroy();
    this.marker.destroy();
    this.interactZone.destroy();
  }
}
