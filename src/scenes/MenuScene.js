/**
 * MenuScene — Menu principal do MVP.
 */

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Fundo
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);

    // Título
    this.add.text(width / 2, 40, 'MANDARIN ODYSSEY', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#e8b86d',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(width / 2, 60, '学中文 · RPG de Exploração', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#a0a0a0',
      align: 'center'
    }).setOrigin(0.5);

    // Botão Novo Jogo
    const btnNew = this.add.rectangle(width / 2, 100, 120, 24, 0x3d5a80)
      .setInteractive({ useHandCursor: true });

    const txtNew = this.add.text(width / 2, 100, 'NOVO JOGO', {
      fontFamily: 'Courier New',
      fontSize: '10px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btnNew.on('pointerover', () => btnNew.setFillStyle(0x4a90d9));
    btnNew.on('pointerout', () => btnNew.setFillStyle(0x3d5a80));
    btnNew.on('pointerdown', () => this.startGame());

    // Instrução
    this.add.text(width / 2, height - 20, 'WASD / Setas · E para interagir', {
      fontFamily: 'Courier New',
      fontSize: '7px',
      color: '#666666'
    }).setOrigin(0.5);

    // Tecla Enter também inicia
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
  }

  startGame() {
    this.scene.start('WorldScene');
    this.scene.launch('UIScene');
  }
}
