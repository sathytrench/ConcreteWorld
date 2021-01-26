import 'phaser';
import DeadLady from '../entity/DeadLady';
import PlayAgain from '../entity/PlayAgain';

export default class GameOver extends Phaser.Scene {
    constructor() {
      super('GameOver');
      this.finalScore;
      this.restart = this.restart.bind(this);
    }

    restart() {
        window.location.reload();
    }

    init(data) {
        this.finalScore = data.score;
    }

    preload() {
        this.load.image('sign', 'assets/sprites/gameOver.png');
        this.load.spritesheet('deadLady', 'assets/spritesheets/deadLady.png', { frameWidth: 624, frameHeight: 624 });
        this.load.spritesheet('playAgain', 'assets/spritesheets/playAgain.png', { frameWidth: 432, frameHeight: 90 });
    }   
  
    create() {
        this.add.image(400, 300, 'sign');
        this.add.text(250, 200, `Oh dear...looks like you died.\n\nWell, it was nice while it lasted.\n\nAnd you got ${this.finalScore} points!`);
        
        this.anims.create({
            key: 'float',
            frames: this.anims.generateFrameNumbers('deadLady', { start: 0, end: 8 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'flash',
            frames: this.anims.generateFrameNumbers('playAgain', { start: 0, end: 1 }), 
            frameRate: 2,
            repeat: -1
        })
        
        this.deadLady = new DeadLady(this, 400, 400, 'deadLady').setScale(0.2).play('float');
        this.playAgain = new PlayAgain(this, 400, 550, 'playAgain').play('flash');
        this.playAgain.setInteractive();
        this.playAgain.on('pointerdown', this.restart)
    }
  }