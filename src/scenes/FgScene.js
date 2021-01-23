import 'phaser';
import Player from '../entity/Player';
import Ground from '../entity/Ground';
import Flower from '../entity/Flower';
import Enemy from '../entity/Enemy';

export default class FgScene extends Phaser.Scene {
    constructor() {
      super('FgScene');
      this.score = 0;
      this.hitEnemy = this.hitEnemy.bind(this);
      this.collectFlower = this.collectFlower.bind(this);
    }

    hitEnemy(player, enemy) {
      this.physics.pause();
      player.setTint(0xff0000);
      this.player.anims.play('turn');
      this.gameOver = true;
    }

    collectFlower (player, flower){
        flower.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.flowerGroup.countActive(true) === 0) {
          this.flowerGroup.children.iterate(function (child) {
              child.enableBody(true, child.x, 0, true, true);
          });
  
          var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  
          var enemy = this.enemy.create(x, 16, 'enemy');
          enemy.setBounce(1);
          enemy.setCollideWorldBounds(true);
          enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }
      
    preload () {  
      //sprites 
      this.load.image('ground', 'assets/sprites/road.png');
      this.load.image('flower', 'assets/sprites/flower.png');
      this.load.image('enemy', 'assets/sprites/enemy.png');
      this.load.spritesheet('dude', 'assets/spritesheets/dude.png', { frameWidth: 32, frameHeight: 48 });

      //sounds?
    }

    create () {
      //player
      this.player = new Player(this, 100, 450, 'dude');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });
  
      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });
  
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });

      //ground
      this.groundGroup = this.physics.add.staticGroup({classType: Ground}); 
      this.groundGroup.create(400, 568, 'ground').setScale(2).refreshBody();
      this.groundGroup.create(600, 400, 'ground');
      this.groundGroup.create(50, 250, 'ground');
      this.groundGroup.create(750, 220, 'ground');

      //flowers
      this.flowerGroup = this.physics.add.group({ 
        classType: Flower,
        key: 'flower',
        repeat: 11,
        setXY: { x: 12, y:0, stepX:70 }
      }); 

      this.flowerGroup.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      //enemies
      this.enemy = this.physics.add.group({classType: Enemy});

      //collisions
      this.physics.add.collider(this.player, this.groundGroup);
      this.physics.add.collider(this.flowerGroup, this.groundGroup);
      this.physics.add.collider(this.enemy, this.groundGroup);
      this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);

      this.physics.add.overlap(this.player, this.flowerGroup, this.collectFlower, null, this);

      //scoreText
      this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

      //KEYBOARD MANAGER
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      this.player.update(this.cursors);
    }
  }

