export default class Tuto extends Phaser.Scene {
  constructor() {
    super("tuto");
  }


  create() {
    // Fondo
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);
    this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.7).setDepth(1);

    this.add.text(960, 200, `Controles`, 
    { fontSize: '32px', fill: '#ffffff', fontFamily: '"Press Start 2P", monospace' })
    .setScale(1.5).setOrigin(0.5, 0.5).setDepth(2);

    // Solo crea la animación si no existe
    if (!this.anims.exists('controles_anim')) {
      this.anims.create({
        key: 'controles_anim',
        frames: this.anims.generateFrameNumbers('controlesAnim', { start: 0, end: 10  }),
        frameRate: 3,
        repeat: -1
      });
    }
    if (!this.anims.exists('saltar_anim')) {
      this.anims.create({
        key: 'saltar_anim',
        frames: this.anims.generateFrameNumbers('saltarAnim', { start: 0, end: 13  }),
        frameRate: 3,
        repeat: -1
      });
    }

    const controles = this.add.sprite(550, 540, 'controlesAnim')
      .setOrigin(0.5, 0.5)
      .setScale(3)
      .setDepth(2);

      const saltarContrl = this.add.sprite(1370, 540, 'saltarAnim')
      .setOrigin(0.5, 0.5)
      .setScale(3)
      .setDepth(2);

    controles.play('controles_anim');
    saltarContrl.play('saltar_anim');

    // Botón volver
    const btnVolver = this.add.image(260, 100, "volver")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(3)
      .on('pointerdown', () => {
        this.scene.start('menu');
      })
      .on('pointerover', () => {
        btnVolver.setScale(2.7);
      })
      .on('pointerout', () => {
        btnVolver.setScale(3);
      });

    // Tecla Escape para volver
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('menu');
    });

    // Botón para volver a jugar
    const btnJugar = this.add.image(960, 840, "jugar")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true }).setScale(3.5)
      .setDepth(3)
      .on('pointerdown', () => {
        this.scene.start('game');
      })
      .on('pointerover', () => {
        btnJugar.setScale(3.8);
      })
      .on('pointerout', () => {
        btnJugar.setScale(3.5);
      });

    // Botón para ir al menú de opciones
    const btnOps = this.add.image(1780, 100, "ops")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5)
      .setDepth(3)
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