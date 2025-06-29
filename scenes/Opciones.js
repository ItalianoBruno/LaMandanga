export default class Opciones extends Phaser.Scene {
  constructor() {
    super("opciones");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
  }

  preload() {
    this.load.image("piso4", "./public/Background/piso4,0.png");
  }

  create() {

    const btnMenu = this.add.text(105, 70, 'Volver', { fontSize: '32px', fill: '#0ff' })
      .setInteractive({ useHandCursor: true }).setScale(2)
      .on('pointerdown', () => {
        this.scene.start('menu');
      });


  }}