export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
  }

  preload() {
    this.load.image("piso4", "./public/Background/piso4,0.png");
    this.load.image("reintentar", "./public/assets/Play2.png");
    this.load.image("menu", "./public/assets/Play4.png");
    this.load.image("fondoMenu", "./public/Background/FondoMenu.png");
  }

  create() {
    
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);

    this.add.text(960, 400, `Puntaje:${this.score}`, { fontSize: '32px', fill: '#000000', fontFamily: '"Press Start 2P", monospace' }).setScale(1.5).setOrigin(0.5, 0.5);

    // Botón para volver a jugar
    const btnReintentar = this.add.image(960, 540, "reintentar")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('game');
      });

    // Botón para ir al menú
    const btnMenu = this.add.image(960, 640, "menu")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('menu');
      });
  }
}