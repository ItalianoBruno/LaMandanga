export default class Cargar extends Phaser.Scene {
  constructor() {
    super("cargar");
  }

  preload() {
    // Fondo opcional
    this.add.rectangle(960, 540, 1920, 1080, 0x222244);

    // Texto de carga
    const loadingText = this.add.text(960, 400, "Cargando...", {
      fontSize: "32px",
      fill: "#fff",
      fontFamily: '"Press Start 2P", monospace'
    }).setOrigin(0.5);

    // Barra de progreso
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(660, 500, 600, 50);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(670, 510, 580 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.setText("¡Listo!");
    });

    // --------- ASSETS DE TODO EL JUEGO ---------

    // Personaje principal y enemigos
    this.load.spritesheet("dude", "./public/assets/GarlyCharsia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("saltoG", "./public/assets/saltoGC.png");
    this.load.spritesheet("bomb", "./public/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Fondos y pisos
    this.load.image("fondoMenu", "./public/Background/FondoMenu.png");
    this.load.image("fondo", "./public/Background/fondo.png"); // Si tienes un fondo de juego
    this.load.image("piso", "./public/Background/piso1,0.png");
    this.load.image("piso2", "./public/Background/piso2,0.png");
    this.load.image("piso3", "./public/Background/piso3,0.png");
    this.load.image("piso4", "./public/Background/piso4,0.png");

    // Nuevos fondos añadidos
    this.load.image("Cielo", "./public/Background/Cielo.png");
    this.load.image("Montañas", "./public/Background/Montañas.png");
    this.load.image("Montañas2", "./public/Background/Montañas2.png");
    this.load.image("Ciudad", "./public/Background/Ciudad2.png");
    this.load.image("Agua", "./public/Background/Agua.png");
    this.load.image("CiudadReflejo", "./public/Background/CiudadReflejo.png");
    this.load.image("arbustos", "./public/Background/Arbustos.png");

    // Mandangómetro (todas las variantes)
    this.load.image("Mandangometro1", "./public/assets/Mandangómetro1.png");
    this.load.image("Mandangometro2", "./public/assets/Mandangómetro2.png");
    this.load.image("Mandangometro3", "./public/assets/Mandangómetro3.png");
    this.load.image("Mandangometro4", "./public/assets/Mandangómetro4.png");
    this.load.image("Mandangometro5", "./public/assets/Mandangómetro5.png");
    this.load.image("Mandangometro6", "./public/assets/Mandangómetro6.png");
    this.load.image("Mandangometro7", "./public/assets/Mandangómetro7.png");
    this.load.image("Mandangometro8", "./public/assets/Mandangómetro8.png");
    this.load.image("Mandangometro9", "./public/assets/Mandangómetro9.png");

    // Coleccionables (si tienes un asset específico)
    this.load.image("coleccionable", "./public/assets/Mandanga.png");
    this.load.image("obstaculo", "./public/assets/Obstáculo.png"); 

    // Indicadores/señales
    this.load.image("IndicadorIzq", "./public/assets/Indicador-I.png");
    this.load.image("IndicarorDer", "./public/assets/Indicador-D.png");
    this.load.image("IndicadorUp", "./public/assets/Indicador-U.png");

    // Botones y UI
    this.load.image("jugar", "./public/assets/Play1.png");
    this.load.image("reintentar", "./public/assets/Play2.png");
    this.load.image("ops", "./public/assets/Play3.png");
    this.load.image("menu", "./public/assets/Play4.png");
    this.load.image("volver", "./public/assets/Play6.png"); // Opciones y Tuto usan Play4 para volver
    this.load.image("contrl", "./public/assets/Play5.png");
    this.load.image("volverTuto", "./public/assets/Play6.png"); // Si usas otro para volver en Tuto

    // Animaciones de controles y salto
    this.load.spritesheet("controlesAnim", "./public/assets/Controles.png", {
      frameWidth: 80,
      frameHeight: 160
    });
    this.load.spritesheet("saltarAnim", "./public/assets/BarraCtrl.png", {
      frameWidth: 120,
      frameHeight: 160
    });

    // Otros assets que uses en cualquier escena...
    this.load.audio('GameMusic', './public/assets/GameMusic.mp3');
  }

  create() {
    // Cuando termine la carga, pasa a la escena principal
    localStorage.removeItem('highscore');
    this.scene.start("menu");
  }
}