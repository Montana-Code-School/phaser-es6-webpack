import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class TankMenu extends Phaser.State {
  constructor () {
    super();
    this.x = 32;
    this.y = 80;
  }

  init () {
    this.titleText = this.make.text(this.world.centerX, 100, "TANKIN'", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });

    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('background', 'assets/Menu/paperBG.jpg');
    this.load.audio('music', 'assets/audio/QuantumLap.mp3');
    this.load.image('tank', 'assets/tank/tank.png');
    this.load.image('map', 'assets/Menu/map.png');
    this.load.image('dude', 'assets/splash/sprite.png');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'background');

    this.add.existing(this.titleText);
    this.add.text(75, 200, 'INSTRUCTIONS: \nShoot All The Targets\nTo Receive Your First Key',
    { fontSize: '16px', fill: 'black' });
    this.add.text(500, 200, 'CONTROLS:\nUse arrow keys.\nUP or DOWN to adjust turret\nLEFT or RIGHT to adjust power level\nSPACEBAR to fire\n<esc> to Return To Map',
    { fontSize: '16px', fill: 'black' });

    this.music = this.add.audio('music');
    this.music.play();

    this.tank = this.add.sprite(200, 400, 'tank');
    this.physics.arcade.enable(this.tank);
    this.tank.body.immovable = true;

    this.map = this.add.sprite(500, 400, 'map');
    this.physics.arcade.enable(this.map);
    this.map.body.immovable = true;
    this.tank.scale.setTo(2, 2);
    this.map.scale.setTo(2, 2);


    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  }

  update () {
    if (this.escape.isDown) {
      this.goToHome();
    }
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -150;
      this.player.animations.play('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150;
      this.player.animations.play('down');
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }
    if (this.physics.arcade.collide(this.player, this.tank)) {
      this.goToGame();
    }
    if (this.physics.arcade.collide(this.player, this.map)) {
      this.goToHome();
    }
  }

  goToGame () {
    this.state.start('Tank');
    this.music.stop();
  }
  goToHome () {
    this.state.start('Splash');
    this.music.stop;
    // this.resetGame();
  }
}
