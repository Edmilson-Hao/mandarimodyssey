/**
 * MenuScene — Menu principal (versão 1.0).
 */

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);

    // Título
    this.add.text(width / 2, 36, 'MANDARIN ODYSSEY', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#e8b86d',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(width / 2, 54, '学中文 · RPG de Exploração', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#a0a0a0',
      align: 'center'
    }).setOrigin(0.5);

    // Botão usando asset
    const btn = this.add.image(width / 2, 100, 'button')
      .setInteractive({ useHandCursor: true });

    const txt = this.add.text(width / 2, 100, 'NOVO JOGO', {
      fontFamily: 'Courier New',
      fontSize: '10px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btn.on('pointerover', () => {
      btn.setTint(0x88bbff);
      txt.setColor('#ffffaa');
    });
    btn.on('pointerout', () => {
      btn.clearTint();
      txt.setColor('#ffffff');
    });
    btn.on('pointerdown', () => this.startGame());

    this.add.text(width / 2, height - 28, 'WASD / Setas  ·  E para interagir', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#666666'
    }).setOrigin(0.5);

    this.add.text(width / 2, height - 14, 'v1.1', {
      fontFamily: 'Courier New',
      fontSize: '6px',
      color: '#444444'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
  }

  startGame() {
    this.scene.start('WorldScene');
    this.scene.launch('UIScene');
  }
}
