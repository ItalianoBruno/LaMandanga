export default class Opciones extends Phaser.Scene {
  constructor() {
    super("opciones");
  }

  init(data) {
    this.fromGame = data && data.fromGame;
    this.musicVolume = data && data.music;
    this.idioma = data && data.idioma || 'es';
  }

  create() {
    // Fondo
    this.add.image(960, 540, "fondoMenu").setOrigin(0.5, 0.5).setScale(2.995);
    this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.7).setDepth(1);

    this.add.text(960, 200, `Opciones`, 
    { fontSize: '32px', fill: '#ffffff', fontFamily: '"Press Start 2P", monospace' })
    .setScale(1.5).setOrigin(0.5, 0.5).setDepth(2);

    // Botón Menú
    if (this.fromGame) {
      const btnMenu = this.add.image(1800, 100, "menu")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(3)
      .on('pointerdown', () => {
        // Detener la música si existe
        const gameScene = this.scene.get('game');
        if (gameScene && gameScene.music && gameScene.music.isPlaying) {
          gameScene.music.stop();
        }
        this.scene.stop('game');    
        this.scene.stop();          
        this.scene.start('menu');   
      })
      .on('pointerover', () => {
        btnMenu.setScale(2.7);
      })
      .on('pointerout', () => {
        btnMenu.setScale(3);
      });
      } 
    // Botón volver
    const btnMenu = this.add.image(260, 140, "volver")
      .setInteractive({ useHandCursor: true }).setScale(3).setOrigin(0.5, 0.5).setDepth(3)
      .on('pointerdown', () => {
        if (this.fromGame) {
          this.scene.stop();
          // No necesitas resume si nunca pausaste la escena de juego
        } else {
          this.scene.start('menu');
        }
      }).on('pointerover', () => {
        btnMenu.setScale(2.7);
      })
      .on('pointerout', () => {
        btnMenu.setScale(3);
      });

    // Escape también vuelve
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.fromGame) {
        this.scene.stop();
        // No necesitas resume si nunca pausaste la escena de juego
      } else {
        this.scene.start('menu');
      }
    });

    // Volumen
    let volumen = this.musicVolume !== undefined ? this.musicVolume : 0.5;
    const volText = this.add.text(960, 350, `Volumen: ${(volumen * 100).toFixed(0)}%`, { fontSize: '28px', fill: '#fff', fontFamily: '"Press Start 2P", monospace' }).setOrigin(0.5).setDepth(5);

    const menos = this.add.text(860, 390, '-', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5).setInteractive().setDepth(5);
    const mas = this.add.text(1060, 390, '+', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5).setInteractive().setDepth(5);

    menos.on('pointerdown', () => {
      volumen = Math.max(0, volumen - 0.1);
      volText.setText(`Volumen: ${(volumen * 100).toFixed(0)}%`);
      this.registry.set('musicVolume', volumen);
      // Si vienes del juego, ajusta el volumen en vivo
      if (this.fromGame) {
        this.scene.get('game').music.setVolume(volumen);
      }
    });
    mas.on('pointerdown', () => {
      volumen = Math.min(1, volumen + 0.1);
      volText.setText(`Volumen: ${(volumen * 100).toFixed(0)}%`);
      this.registry.set('musicVolume', volumen);
      if (this.fromGame) {
        this.scene.get('game').music.setVolume(volumen);
      }
    });

    // Idioma (ejemplo simple con dos idiomas)
    let idioma = this.idioma;
    const idiomas = ['es', 'en'];
    const idiomaText = this.add.text(960, 450, `Idioma: ${idioma.toUpperCase()}`, { fontSize: '28px', fill: '#fff', fontFamily: '"Press Start 2P", monospace' }).setOrigin(0.5).setDepth(5);
    const idiomaBtn = this.add.text(960, 480, 'Cambiar', { fontSize: '28px', fill: '#ffd700' }).setOrigin(0.5).setInteractive().setDepth(5);

    idiomaBtn.on('pointerdown', () => {
      idioma = idioma === 'es' ? 'en' : 'es';
      idiomaText.setText(`Idioma: ${idioma.toUpperCase()}`);
      this.registry.set('idioma', idioma);
      // Aquí podrías actualizar textos dinámicamente si lo deseas
      if (this.fromGame) {
        this.scene.get('game').idioma = idioma;
      }
    });
  }
}