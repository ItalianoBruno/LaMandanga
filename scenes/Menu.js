export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  init(data) {
  }

  preload() {
  }

  create() {

    // Botón para volver a jugar
    const btnReintentar = this.add.text(855, 500, 'Jugar', { fontSize: '32px', fill: '#0f0' })
      .setInteractive({ useHandCursor: true }).setScale(2)
      .on('pointerdown', () => {
        this.scene.start('game');
      });

    // Botón para ir al menú
    const btnMenu = this.add.text(800, 600, 'Opciones', { fontSize: '32px', fill: '#0ff' })
      .setInteractive({ useHandCursor: true }).setScale(2)
      .on('pointerdown', () => {
        this.scene.start('opciones');
      });

  }}