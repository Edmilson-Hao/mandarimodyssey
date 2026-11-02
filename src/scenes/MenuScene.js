/**
 * MenuScene — Menu principal legível (v2.0)
 */

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);

    // Título principal
    this.add.text(width / 2, 32, 'MANDARIN ODYSSEY', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#f0d080',
      fontStyle: 'bold',
      stroke: '#1a1208',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(width / 2, 52, '学中文  ·  RPG de Exploração', {
      fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
      fontSize: '11px',
      color: '#c0c0c0',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Botão
    const btn = this.add.image(width / 2, 100, 'button')
      .setInteractive({ useHandCursor: true })
      .setScale(1.1);

    const txt = this.add.text(width / 2, 100, 'NOVO JOGO', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    btn.on('pointerover', () => {
      btn.setTint(0xaaddff);
      txt.setColor('#ffffaa');
    });
    btn.on('pointerout', () => {
      btn.clearTint();
      txt.setColor('#ffffff');
    });
    btn.on('pointerdown', () => this.startGame());

    this.add.text(width / 2, height - 30, 'WASD / Setas   ·   E para interagir', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#888888',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    this.add.text(width / 2, height - 14, 'v2.0  ·  Ilha do Despertar · Mapa Real', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '9px',
      color: '#666666',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
  }

  startGame() {
    this.scene.start('WorldScene');
    this.scene.launch('UIScene');
  }
}
