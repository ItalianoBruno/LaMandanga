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
    this.player = this.physics.add.sprite(spawnX, spawnY, "dude");
    this.player.setScale(1.25);
    //Vars del pj
    this.tieneHacha = false;

    //Colectables
    this.stars = this.physics.add.group();
    objectsLayer.objects
      .filter(obj => obj.name === "colect")
      .forEach(obj => {
        const star = this.stars.create(obj.x, obj.y, "star").setOrigin(1.1, 0.25).setScale(1.5);
        star.body.allowGravity = false;
      });

    // Overlap para recolectar estrellas
    this.physics.add.overlap(this.player, this.stars, (player, star) => {
      star.disableBody(true, true);
      this.score += 100;
      this.coleccionados += 1;
      console.log("Coleccionados: ", this.coleccionados);
      console.log("Puntaje:", this.score);
    }, null, this);

    //Camara
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.25);
    // Limita la cámara al tamaño del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //Profundidad de las capas
    if (pisoLayer) pisoLayer.setDepth(0);
    if (arbolLayer) arbolLayer.setDepth(2);
    if (arbol2Layer) arbol2Layer.setDepth(2);
    this.player.setDepth(1);

    //Resumir Teclas
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // vel pj
    this.speed = 180;
  }

  update() {
    
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
      
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
      
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.speed);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
    }
    if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp) {

    }
    if (this.cursors.left.isUp && this.cursors.right.isUp) {
      // If no cursor keys are pressed, stop the player
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isUp && this.cursors.down.isUp) {
      // If no cursor keys are pressed, stop the player
      this.player.setVelocityY(0);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Phaser.Input.Keyboard.JustDown(this.keyR)");
      this.scene.restart();
    }
  }
}
