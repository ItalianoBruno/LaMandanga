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
    this.load.spritesheet("dude", "./public/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("arrow_left", "./public/assets/arrow_left.png");
    this.load.image("arrow_right", "./public/assets/arrow_right.png");
    this.load.image("arrow_up", "./public/assets/arrow_up.png");
  }

  create() {
    //Player
    this.player = this.physics.add.sprite(150, 900, "dude");
    this.player.setScale(2.25);
    this.player.setCollideWorldBounds(true);
    this.player.flipX = true;
    this.player.flipY = true; // Voltea el sprite para que mire a la izquierda
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
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Grupo para los objetos enemigos
    this.enemigos = this.physics.add.group();

    // Intervalo de aparición (en milisegundos)
    this.tiempoAparicion = Phaser.Math.Between(500, 1000); // Cambia este valor para ajustar el intervalo
    this.velocidadEnemigo = -325; // Cambia este valor para ajustar la velocidad

    // Evento para crear enemigos periódicamente

    const startEvent = this.time.addEvent({
      delay: this.tiempoAparicion,
      callback: () => {
        this.createEnemy();
        this.createNewEvent();
      },
      callbackScope: this,
      loop: false,
    });
    
    // Evento para crear enemigos periódicamente

    // Señales
this.senales = this.add.group();
this.senalKeys = ["arrow_left", "arrow_right", "arrow_up"];
this.senalDirections = ["left", "right", "up"];
this.senalActive = null;

// Evento periódico para crear señales
this.time.addEvent({
  delay: 2000, // cada 2 segundos (ajusta a gusto)
  callback: this.spawnSenal,
  callbackScope: this,
  loop: true,
});

    // Colisión entre jugador y enemigos
    this.physics.add.overlap(
      this.player,
      this.enemigos,
      () => {
        // Lógica de muerte: reinicia la escena o ve a GameOver
        this.scene.restart();
      },
      null,
      this
    );

    // vel pj
    this.speed = 650;
  }

  update() {
    if (this.spaceBar.isDown && this.player.body.touching.down) {
      
      this.player.setVelocityY(-this.speed);
    }
    this.player.setVelocityX(0);

    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Phaser.Input.Keyboard.JustDown(this.keyR)");
      this.scene.restart();
    }

    if (this.senalActive) {
      if (
        (this.senalActive.direction === "left" && this.cursors.left.isDown) ||
        (this.senalActive.direction === "right" && this.cursors.right.isDown) ||
        (this.senalActive.direction === "up" && this.cursors.up.isDown)
      ) {
        this.senalActive.destroy();
        this.senales.clear(true, true);
        this.senalActive = null;
        this.score += 1;
        // Aquí puedes actualizar el texto de puntaje si tienes uno
        // this.scoreText.setText('Puntos: ' + this.score);
      }
    }
  }

  createEnemy() {
    const enemigo = this.enemigos.create(1950, 980, "bomb"); // Usa la imagen que prefieras
    enemigo.setVelocityX(this.velocidadEnemigo);
    enemigo.setCollideWorldBounds(false);
    enemigo.setImmovable(true);
    enemigo.body.allowGravity = false;
    enemigo.setScale(1.8);
  }

  createNewEvent() {
    this.tiempoAparicion = Phaser.Math.Between(1000, 3000); // Cambia este valor para ajustar el intervalo
    this.time.addEvent({
      delay: this.tiempoAparicion,
      callback: () => {
        this.createEnemy();
        this.createNewEvent();
        //  console.log("Nuevo enemigo creado " + this.tiempoAparicion);  
      },
      callbackScope: this,
      loop: false,
    });
  }

  spawnSenal() {
    // Si ya hay una señal activa, no crear otra
    if (this.senalActive) return;

    const idx = Phaser.Math.Between(0, 2);
    const key = this.senalKeys[idx];
    const direction = this.senalDirections[idx];

    let x, y;
    if (direction === "left") {
      x = 50;
      y = 510;
    } else if (direction === "right") {
      x = 1870;
      y = 510;
    } else { // up
      x = 950;
      y = 50;
    }

    const senal = this.add.image(x, y, key).setScale(2);
    senal.direction = direction;
    this.senales.add(senal);
    this.senalActive = senal;
  }
}
