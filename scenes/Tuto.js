export default class Tuto extends Phaser.Scene {
  constructor() {
    super("tuto");
  }

  init(data) {
  }

  preload() {
    this.load.image("jugar", "./public/assets/Play1.png");
    this.load.image("ops", "./public/assets/Play3.png");
  }

  create() {

    // Botón para volver a jugar
    const btnReintentar = this.add.image(960, 840, "jugar")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true }).setScale(3)
      .on('pointerdown', () => {
        this.scene.start('game');
      });

    // Botón para ir al menú
    const btnMenu = this.add.image(1780, 100, "ops")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('opciones');
      });

  }}