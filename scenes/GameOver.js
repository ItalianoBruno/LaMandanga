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
      })
      .on('pointerover', () => {
        btnReintentar.setScale(2.7);
      })
      .on('pointerout', () => {
        btnReintentar.setScale(3);
      });

    // Botón para ir al menú
    const btnVolver = this.add.image(960, 660, "menu")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(2)
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

    const gameScene = this.scene.get('game');
    if (gameScene && gameScene.music && gameScene.music.isPlaying) {
      gameScene.music.stop();
    }
  }

  update() {
    // Antes de cambiar de escena
    if (this.music && this.music.isPlaying) {
      this.music.stop();
    }
  }
}