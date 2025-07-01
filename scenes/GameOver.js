export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
  }


  create() {
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);
    this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.7).setDepth(1);

    // Obtener y actualizar highscore
    let highscore = localStorage.getItem('highscore') || 0;
    if (this.score > highscore) {
      highscore = this.score;
      localStorage.setItem('highscore', highscore);
    }

    this.add.text(960, 350, `Puntaje:${this.score}`, 
      { fontSize: '32px', fill: '#ffff', fontFamily: '"Press Start 2P", monospace' })
      .setScale(1.5).setOrigin(0.5, 0.5).setDepth(2);

    this.add.text(960, 420, `HighestScore:${highscore}`,
      { fontSize: '28px', fill: '#ffd700', fontFamily: '"Press Start 2P", monospace' })
      .setScale(1.2).setOrigin(0.5, 0.5).setDepth(2);

    // Botón para volver a jugar
    const btnReintentar = this.add.image(960, 540, "reintentar")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(2)
      .on('pointerdown', () => {
        this.scene.start('game');
      });

    // Botón para ir al menú
    const btnMenu = this.add.image(960, 660, "menu")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(2)
      .on('pointerdown', () => {
        this.scene.start('menu');
      });
  }
}