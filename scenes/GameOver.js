export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
  }

  preload() {
    this.load.image("piso4", "./public/Background/piso4,0.png");
  }

  create() {
    // Muestra el puntaje en pantalla
    if (this.score <= 10) {
      this.scorepos = 745;
    } else if(this.score<=100) {
      this.scorepos = 735;
    } else if (this.score<=1000) {
      this.scorepos = 725;
    } else if (this.score<=10000) {   
      this.scorepos = 705;
    } else if (this.score<=100000) {
      this.scorepos = 685; 
    }
    this.add.text(this.scorepos, 400, `Puntaje: ${this.score}`, { fontSize: '32px', fill: '#fff' }).setScale(2);

    // Botón para volver a jugar
    const btnReintentar = this.add.text(755, 500, 'Reintentar', { fontSize: '32px', fill: '#0f0' })
      .setInteractive({ useHandCursor: true }).setScale(2)
      .on('pointerdown', () => {
        this.scene.start('game');
      });

    // Botón para ir al menú
    const btnMenu = this.add.text(875, 600, 'Menú', { fontSize: '32px', fill: '#0ff' })
      .setInteractive({ useHandCursor: true }).setScale(2)
      .on('pointerdown', () => {
        this.scene.start('menu');
      });
  }
}