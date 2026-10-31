/**
 * Player — Entidade do personagem jogável.
 * Movimentação Arcade Physics + 4 direções.
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
    this.speed = 80;

    // Sprite
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDepth(DEPTH.PLAYER);
    this.sprite.setSize(14, 10); // hitbox menor (pés)
    this.sprite.setOffset(9, 34);

    // Direção atual (para futuro sistema de animação)
    this.facing = 'down';

    // Input
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

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      vx = -this.speed;
      this.facing = 'left';
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      vx = this.speed;
      this.facing = 'right';
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      vy = -this.speed;
      this.facing = 'up';
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      vy = this.speed;
      this.facing = 'down';
    }

    // Normalizar diagonal
    if (vx !== 0 && vy !== 0) {
      const norm = Math.SQRT1_2;
      vx *= norm;
      vy *= norm;
    }

    body.setVelocity(vx, vy);
  }

  getPosition() {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  /**
   * Verifica se a tecla de interação acabou de ser pressionada.
   */
  justPressedInteract() {
    return Phaser.Input.Keyboard.JustDown(this.keys.E) ||
           Phaser.Input.Keyboard.JustDown(this.cursors.space);
  }
}
