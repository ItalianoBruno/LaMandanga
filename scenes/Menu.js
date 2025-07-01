export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  init(data) {
  }


  create() {
    // Imagen de fondo
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);

    this.add.image(260, 640, "jugar")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true }).setScale(5)
      .on('pointerdown', () => {
        this.scene.start("tuto");
      });

      this.add.image(1780, 210, "contrl")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('tuto');
      });

    this.add.image(1780, 100, "ops")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('opciones');
      });

  }
}