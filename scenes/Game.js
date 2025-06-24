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
    this.load.image("IndicadorIzq", "./public/assets/Indicador-I.png");
    this.load.image("IndicarorDer", "./public/assets/Indicador-D.png");
    this.load.image("IndicadorUp", "./public/assets/Indicador-U.png");
  }

  create() {
    //Player
    this.player = this.physics.add.sprite(150, 900, "dude");
    this.player.setScale(2.25);
    this.player.setCollideWorldBounds(true);
    this.player.flipX = true;
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
    this.velocidadEnemigo = -400; // Cambia este valor para ajustar la velocidad

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
this.senalKeys = ["IndicadorIzq", "IndicarorDer", "IndicadorUp"];
this.senalDirections = ["left", "right", "up"];
this.senalActive = null;

// Evento periódico para crear señales
this.time.addEvent({
  delay: 1250, // cada 2 segundos (ajusta a gusto)
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

    //Sumar puntos a lo largo del tiempo
    this.score = 0; // Inicializa el puntaje
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.score += 1;
        this.scoreText.setText('Puntaje: ' + this.score);
      },
      callbackScope: this,
      loop: true,
    });

    // Mostrar puntaje en pantalla
    this.scoreText = this.add.text(32, 32, 'Puntaje: 0', {
      fontSize: '48px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
    this.scoreText.setScrollFactor(0); // Para que el texto siga la cámara
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
        !this.senalActive.isRed && (
          (this.senalActive.direction === "left" && this.cursors.left.isDown) ||
          (this.senalActive.direction === "right" && this.cursors.right.isDown) ||
          (this.senalActive.direction === "up" && this.cursors.up.isDown)
        )
      ) {
        this.senalActive.setTint(0xFFD700); // Dorado
        this.time.delayedCall(200, () => {
          if (this.senalActive) {
            this.senalActive.destroy();
            this.senales.clear(true, true);
            this.senalActive = null;
            this.score += 50; // Puntos x señal
            this.scoreText.setText('Puntaje: ' + this.score);
            // Actualiza el texto de puntaje si tienes uno 
          }
        });
      } else {
        // Flecha incorrecta
        if (
          (this.cursors.left.isDown && this.senalActive.direction !== "left") ||
          (this.cursors.right.isDown && this.senalActive.direction !== "right") ||
          (this.cursors.up.isDown && this.senalActive.direction !== "up")
        ) {
          if (!this.senalActive.isRed) {
            this.senalActive.setTint(0xff0000); // Rojo
            this.senalActive.isRed = true;
            this.time.delayedCall(300, () => {
              if (this.senalActive) {
                this.senalActive.destroy();
                this.senales.clear(true, true);
                this.senalActive = null;
              }
            });
          }
        }
      }
    }
  }

  createEnemy() {
    const enemigo = this.enemigos.create(1950, 980, "bomb"); 
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
      x = 70;
      y = 510;
    } else if (direction === "right") {
      x = 1850;
      y = 510;
    } else { // up
      x = 950;
      y = 75;
    }

    const senal = this.add.image(x, y, key).setScale(4);
    senal.direction = direction;
    this.senales.add(senal);
    this.senalActive = senal;

    // Desaparecer la señal después de x segundos si no se presiona
    this.time.delayedCall(1100, () => {
      if (this.senalActive === senal) {
        senal.destroy();
        this.senales.clear(true, true);
        this.senalActive = null;
      }
    });
  }
}
