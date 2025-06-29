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
    this.load.spritesheet("dude", "./public/assets/GarlyCharsia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("saltoG", "./public/assets/saltoGC.png");
    this.load.image("IndicadorIzq", "./public/assets/Indicador-I.png");
    this.load.image("IndicarorDer", "./public/assets/Indicador-D.png");
    this.load.image("IndicadorUp", "./public/assets/Indicador-U.png");
    this.load.image("piso", "./public/Background/piso1,0.png");
    this.load.image("piso2", "./public/Background/piso2,0.png");
    this.load.image("piso3", "./public/Background/piso3,0.png");
    this.load.image("piso4", "./public/Background/piso4,0.png");
  }

  create() {
    //                                                               |Player|

    this.player = this.physics.add.sprite(225, 800, "dude");
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(15, 50).setOffset(26, 7);
    this.player.setDepth(100);

    //                                                               |Camara|

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1);
    // Limita la cámara al tamaño del mapa
    this.cameras.main.setBounds(0, 0, 1920, 1080);

    //                                                                |Piso|
  
    this.pisoKeys = ["piso4", "piso3", "piso2", "piso2", "piso"];
    this.segmentWidth = 2040; // Ajusta según el tamaño real de tu asset y escala

    // Crea dos segmentos de piso, uno visible y otro justo a la derecha
    this.pisoSegments = [];
    for (let i = 0; i < 2; i++) { // El primer segmento está en la parte inferior, el segundo arriba
      const key = Phaser.Utils.Array.GetRandom(this.pisoKeys);
      const pisoSegY = key === "piso3" ? 254 : 560;
      const piso = this.add
        .image(i * this.segmentWidth, pisoSegY, key)
        .setOrigin(0, 0)
        .setScale(3)
        .setDepth(5);
      this.pisoSegments.push(piso);
    }

    // Plataforma física invisible para colisión
    this.ground = this.add
      .rectangle(0, 950, this.segmentWidth, 100, 0x000000, 0)
      .setOrigin(0, 0);
    this.physics.add.existing(this.ground, true);
    this.physics.add.collider(this.player, this.ground);

    //Profundidad de las capas
    //this.player.setDepth(1);

    //Resumir Teclas
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    //                                                          |Crear enemigos|

    // Grupo para los objetos enemigos
    this.enemigos = this.physics.add.group();

    // Intervalo de aparición (en milisegundos)
    this.tiempoAparicion = Phaser.Math.Between(500, 1000); // Cambia este valor para ajustar el intervalo
    this.velocidadEnemigo = -450; //velocidad
    // Evento para crear el primer enemigo
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

    //                                                             |Señales|

    this.senales = this.add.group();
    this.senalKeys = ["IndicadorIzq", "IndicarorDer", "IndicadorUp"];
    this.senalDirections = ["left", "right", "up"];
    this.senalActive = null;

    // Crear señales
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnSenal,
      callbackScope: this,
      loop: true,
    });

    //                                                 |Colisión entre jugador y enemigos|

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

    //Sumar puntos a lo largo del tiempo
    this.score = 0; // Inicializa el puntaje
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.score += 1;
        this.scoreText.setText("Puntaje: " + this.score);
      },
      callbackScope: this,
      loop: true,
    });

    // Mostrar puntaje en pantalla
    this.scoreText = this.add.text(32, 32, "Puntaje: 0", {
      fontSize: "48px",
      fill: "#fff",
      fontFamily: "Arial",
    });
    this.scoreText.setScrollFactor(0); // Para que el texto siga la cámara

    // vel pj
    this.speed = 930;

    this.isPaused = false;
    this.pauseText = null;

    // Crear animación de correr para el jugador
    this.anims.create({
      key: 'correr',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
      frameRate: 15, // Velocidad de la animación
      repeat: -1     // Repetir infinitamente
    });
  }

  update() {

    //                                                                |Pausa|
    if (Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.physics.world.pause();
        this.time.paused = true; // Pausa todos los eventos de tiempo
        this.pauseText = this.add.text(850, 500, 'PAUSA', { fontSize: '64px', fill: '#fff' });
      } else {
        this.physics.world.resume();
        this.time.paused = false; // Reanuda todos los eventos de tiempo
        if (this.pauseText) {
          this.pauseText.destroy();
          this.pauseText = null;
        }
      }
    }

    // Si está en pausa, no ejecutar el resto de la lógica
    if (this.isPaused) return;

    //                                                               |Salto|

    if (
      Phaser.Input.Keyboard.JustDown(this.spaceBar) &&
      this.player.body.touching.down
    ) {
      // Salta solo si está en el suelo y se acaba de presionar la barra
      this.player.setVelocityY(-this.speed);
      this.player.isJumping = true;
    } else if (
      !this.player.body.touching.down &&
      this.player.body.velocity.y > -335
    ) {
      // Si está en el aire, mantiene la barra y está cayendo, cae rápido
      this.player.setVelocityY(this.speed);
    }
    this.player.setVelocityX(0);

    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Phaser.Input.Keyboard.JustDown(this.keyR)");
      this.scene.restart();
    }

    if (this.player.body.touching.down) {
      this.player.anims.play('correr', true);
    } else if (this.player.isJumping) {
      this.player.setTexture('saltoG');
    }

    //                                                     |Comportamiento de señales|

    if (this.senalActive) {
      if (
        !this.senalActive.isRed &&
        ((this.senalActive.direction === "left" && this.cursors.left.isDown) ||
          (this.senalActive.direction === "right" &&
            this.cursors.right.isDown) ||
          (this.senalActive.direction === "up" && this.cursors.up.isDown))
      ) {
        this.senalActive.setTint(0xffd700); // Dorado
        this.time.delayedCall(200, () => {
          if (this.senalActive) {
            this.senalActive.destroy();
            this.senales.clear(true, true);
            this.senalActive = null;
            this.score += 50; // Puntos x señal
            this.scoreText.setText("Puntaje: " + this.score);
            // Actualiza el texto de puntaje si tienes uno
          }
        });
      } else {
        // Flecha incorrecta
        if (
          (this.cursors.left.isDown && this.senalActive.direction !== "left") ||
          (this.cursors.right.isDown &&
            this.senalActive.direction !== "right") ||
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

    // Movimiento del suelo tipo runner
    const pisoSpeed = 10;

    for (let piso of this.pisoSegments) {
      piso.x -= pisoSpeed;
    }

    // Si el primer segmento sale completamente de pantalla, recíclalo a la derecha del segundo
    let first = this.pisoSegments[0];
    let second = this.pisoSegments[1];
    if (first.x + this.segmentWidth < -170) {
      // Reposiciona justo después del segundo segmento
      first.x = second.x + this.segmentWidth ;
      // Cambia la textura aleatoriamente
      const newKey = Phaser.Utils.Array.GetRandom(this.pisoKeys);
      first.setTexture(newKey);
      if (newKey === "piso3") { 
        first.y = 254;
      }else {
        first.y = 560; // Asegúrate de que el piso esté en la posición correcta
      }
      // Reordena el array para mantener el ciclo
      this.pisoSegments.push(this.pisoSegments.shift());
    }

    // Mueve la plataforma física junto con el segmento visible
    this.ground.x = this.pisoSegments[0].x;
  }

  //                                                         |Crear enemigos|

  createEnemy() {
    const enemigo = this.enemigos.create(1950, 922, "bomb");
    enemigo.setVelocityX(this.velocidadEnemigo);
    enemigo.setCollideWorldBounds(false);
    enemigo.setImmovable(true);
    enemigo.body.allowGravity = false;
    enemigo.setScale(1.8);
  }

  createNewEvent() {
    this.tiempoAparicion = Phaser.Math.Between(1150, 3000); // Cambia este valor para ajustar el intervalo
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
  //                                                          |Crear señales|

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
    } else {
      // up
      x = 950;
      y = 75;
    }

    const senal = this.add.image(x, y, key).setScale(4).setDepth(100); // <-- aquí
    senal.direction = direction;
    this.senales.add(senal);
    this.senalActive = senal;

    // Desaparecer señal si no se presiona
    this.time.delayedCall(1100, () => {
      if (this.senalActive === senal) {
        senal.destroy();
        this.senales.clear(true, true);
        this.senalActive = null;
      }
    });
  }
}
