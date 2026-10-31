/**
 * Player — Personagem jogável com animações de 4 direções.
 */

import { DEPTH } from '../config/gameConfig.js';

export class Player {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y) {
    this.scene = scene;
    this.speed = 70;
    this.facing = 'down';
    this.moving = false;

    this.sprite = scene.physics.add.sprite(x, y, 'player', 0);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDepth(DEPTH.PLAYER);
    this.sprite.setSize(12, 8);
    this.sprite.setOffset(10, 38);
    this.sprite.anims.play('player_idle_down');

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      E: Phaser.Input.Keyboard.KeyCodes.E
    });
  }

  update() {
    const body = this.sprite.body;
    body.setVelocity(0);

    let vx = 0;
    let vy = 0;
    let newFacing = this.facing;

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      vx = -this.speed;
      newFacing = 'left';
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      vx = this.speed;
      newFacing = 'right';
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      vy = -this.speed;
      newFacing = 'up';
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      vy = this.speed;
      newFacing = 'down';
    }

    // Normalizar diagonal
    if (vx !== 0 && vy !== 0) {
      const n = Math.SQRT1_2;
      vx *= n;
      vy *= n;
    }

    body.setVelocity(vx, vy);
    this.moving = (vx !== 0 || vy !== 0);
    this.facing = newFacing;

    this.updateAnimation();
  }

  updateAnimation() {
    const key = this.moving
      ? `player_walk_${this.facing}`
      : `player_idle_${this.facing}`;

    if (this.sprite.anims.currentAnim?.key !== key) {
      this.sprite.anims.play(key, true);
    }
  }

  getPosition() {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  justPressedInteract() {
    return Phaser.Input.Keyboard.JustDown(this.keys.E) ||
           Phaser.Input.Keyboard.JustDown(this.cursors.space);
  }
}
