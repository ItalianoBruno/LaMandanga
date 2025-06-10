// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init(data) {
    this.score = data && data.score ? data.score : 0;
    this.coleccionados = 0;
  }

  preload() {
    this.load.spritesheet("dude", "./public/assets/dude.png", { frameWidth: 32, frameHeight: 48 });
  }

  create() {

    //Player
    this.player = this.physics.add.sprite(150, 900, "dude");
    this.player.setScale(2.25);
    this.player.setCollideWorldBounds(true);
    //Camara
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1);
    // Limita la cámara al tamaño del mapa
    this.cameras.main.setBounds(0, 0, 1920, 1080);

    //piso
    this.ground = this.add.tileSprite(0, 1010, 1550, 100, "dude");
    this.ground.setOrigin(0, 0);
    this.ground.setScale(2);
    this.physics.add.existing(this.ground);
    this.ground.body.setAllowGravity(false);
    this.ground.body.setImmovable(true);
    this.physics.add.collider(this.player, this.ground);

    //Profundidad de las capas
    //this.player.setDepth(1);

    //Resumir Teclas
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // vel pj
    this.speed = 650;

    // Grupo para los objetos enemigos
    this.enemigos = this.physics.add.group();

    // Intervalo de aparición (en milisegundos)
    this.tiempoAparicion = Phaser.Math.Between(500, 2500); // Cambia este valor para ajustar el intervalo
    this.velocidadEnemigo = -300; // Cambia este valor para ajustar la velocidad

    // Evento para crear enemigos periódicamente
    this.time.addEvent({
      delay: this.tiempoAparicion,
      callback: () => {
        // Crea un enemigo en la posición izquierda, en una altura aleatoria
        const enemigo = this.enemigos.create(1950, 980, "bomb"); // Usa la imagen que prefieras
        enemigo.setVelocityX(this.velocidadEnemigo);
        enemigo.setCollideWorldBounds(false);
        enemigo.setImmovable(true);
        enemigo.body.allowGravity = false;
        enemigo.setScale(1.2);
      },
      callbackScope: this,
      loop: true
    });

    // Colisión entre jugador y enemigos
    this.physics.add.overlap(this.player, this.enemigos, () => {
      // Lógica de muerte: reinicia la escena o ve a GameOver
      this.scene.restart();
    }, null, this);
  }

  update() {
    
    if (this.spaceBar.isDown) {
      this.player.setVelocityY(-this.speed);
    }
    this.player.setVelocityX(0);

    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Phaser.Input.Keyboard.JustDown(this.keyR)");
      this.scene.restart();
    }
  }
}
