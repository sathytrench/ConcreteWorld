import 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
      super('StartScene');
      this.intro = 
      `Hello, player! 

    Another grey day in Concrete World. 

    Collect the flowers! 
      
    Watch out for creatures!
    
    Press SPACE to begin...`;
    }
    
    preload() {
    }
  
    create() {
      this.add.text(200, 200, this.intro);
      this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    update() {
        if (this.cursors.space.isDown) {
            this.scene.start('Scene1');
        }
    }
  }