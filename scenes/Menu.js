export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  init(data) {
  }


  create() {
    // Imagen de fondo
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);

    const btnJugar = this.add.image(260, 640, "jugar")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true }).setScale(5)
      .on('pointerdown', () => {
        this.scene.start("tuto");
      })
      .on('pointerover', () => {
        btnJugar.setScale(5.3);
      })
      .on('pointerout', () => {
        btnJugar.setScale(5);
      });

      const btnCtrl = this.add.image(1780, 210, "contrl")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('tuto');
      })
      .on('pointerover', () => {
        btnCtrl.setScale(2.7);
      })
      .on('pointerout', () => {
        btnCtrl.setScale(3);
      });

    const btnOps = this.add.image(1780, 100, "ops")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.start('opciones');
      })
      .on('pointerover', () => {
        btnOps.setScale(2.7);
      })
      .on('pointerout', () => {
        btnOps.setScale(3);
      });

  }
}