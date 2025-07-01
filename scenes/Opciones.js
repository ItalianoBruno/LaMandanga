export default class Opciones extends Phaser.Scene {
  constructor() {
    super("opciones");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
  }

  preload() {
    this.load.image("volver", "./public/assets/Play4.png");
    this.load.image("contrl", "./public/assets/Play5.png");
    this.load.image("ops", "./public/assets/Play3.png");
    this.load.image("piso4", "./public/Background/piso4,0.png");
  }

  create() {

    const btnMenu = this.add.image(260, 140, "volver")
      .setInteractive({ useHandCursor: true }).setScale(3.3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('menu');
      });
    const btnCtrl = this.add.image(260, 260, "contrl")
      .setInteractive({ useHandCursor: true }).setScale(3.3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('tuto');
      });


  }}