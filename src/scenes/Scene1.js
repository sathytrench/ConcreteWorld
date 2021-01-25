import 'phaser';
import Player from '../entity/Player';
import Ground from '../entity/Ground';
import Flower from '../entity/Flower';
import Enemy from '../entity/Enemy';
//import Portal from '../entity/Portal';

export default class Scene1 extends Phaser.Scene {
    constructor() {
      super('Scene1');
      this.score = 0;
      this.nextLevel = false;
      this.hitEnemy = this.hitEnemy.bind(this);
      this.collectFlower = this.collectFlower.bind(this);
      this.newLevel = this.newLevel.bind(this);
    }

    //////////////////////////CLASS METHODS/////////////////////////////////////

    hitEnemy(player, enemy) {
      this.physics.pause();
      player.setTint(0xff0000);
      this.player.anims.play('turn');
      this.sound.get('music').stop();
      this.deathSound.play();
      this.gameOver = true;
    }

    collectFlower (player, flower){
        flower.disableBody(true, true);
        this.collectSound.play();
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

    newLevel() {
      this.nextLevel = true;
    }

    //////////////////////////////////PRELOAD//////////////////////////////////////////////////////////////
      
    preload () {  
      //background
      this.load.image('sky', 'assets/backgrounds/background3.png');
      //background music
      this.load.audio('music', 'assets/audio/snowWorld.mp3');
      //sprites 
      this.load.image('ground', 'assets/sprites/road.png');
      this.load.image('flower', 'assets/sprites/flower.png');
      this.load.image('enemy', 'assets/sprites/enemy.png');
      this.load.image('portal', 'assets/sprites/portal.png');
      //player
      this.load.spritesheet('lady', 'assets/spritesheets/lady.png', { frameWidth: 32, frameHeight: 32 });
      //soundfx
      this.load.audio('jump', 'assets/audio/jump.wav');
      this.load.audio('collect', 'assets/audio/collect.wav');
      this.load.audio('death', 'assets/audio/death.wav');
    }

    //////////////////////////////////////////CREATE///////////////////////////////////////////////////////

    create () {
      //background
      this.add.image(400, 300, 'sky');
      //background music
      this.sound.add('music').setLoop(true).play();
      //player
      this.player = new Player(this, 100, 450, 'lady').setScale(1.5);
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('lady', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });
  
      this.anims.create({
          key: 'turn',
          frames: [ { key: 'lady', frame: 4 } ],
          frameRate: 20
      });
  
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('lady', { start: 5, end: 8 }),
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
      this.physics.add.collider(this.player, this.portal, function(){
        this.scene.start('StartScene');
        }, null, this);
      
      this.physics.add.overlap(this.player, this.portal, this.newLevel, null, this);
      this.physics.add.overlap(this.player, this.flowerGroup, this.collectFlower, null, this);

      //sounds
      this.jumpSound = this.sound.add('jump');
      this.collectSound = this.sound.add('collect');
      this.deathSound = this.sound.add('death');

      //scoreText
      this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFB6C1', backgroundColor: 'black' });

      //KEYBOARD MANAGER
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    ///////////////////////////////////////////UPDATE////////////////////////////////////////////////////

    update () {
      this.player.update(this.cursors, this.jumpSound);

      // if (this.score > 30) {
      //   this.sound.get('music').stop();
      //   this.scene.start('StartScene');
      // }
      //portal
      //if (this.score >= 10) {
        //this.portal = new Portal(this, 500, 510, 'portal');
        //this.physics.add.overlap(this.player, this.portal, this.newLevel, null, this);
      //}

      // if (this.nextLevel) {
      //   //this should probably happen in main scene somehow to avoid using the old background
      //   this.scene.start('StartScene');
      // }
    }
  }
