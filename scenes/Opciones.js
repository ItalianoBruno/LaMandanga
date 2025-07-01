export default class Opciones extends Phaser.Scene {
  constructor() {
    super("opciones");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
  }

  create() {
    // Fondo
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);
    this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.7).setDepth(1);

    this.add.text(960, 200, `Opciones`, 
    { fontSize: '32px', fill: '#ffffff', fontFamily: '"Press Start 2P", monospace' })
    .setScale(1.5).setOrigin(0.5, 0.5).setDepth(2);

    // Botón volver
    this.add.image(260, 140, "volver")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(3)
      .on('pointerdown', () => {
        this.scene.start('menu');
      });

    // Tecla Escape para volver
    this.input.keyboard.on('keydown-ESC', () => {
    this.scene.start('menu');
    });
    
    this.add.image(460, 140, "contrl")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(3)
      .on('pointerdown', () => {
        this.scene.start('tuto');
      });
  }}