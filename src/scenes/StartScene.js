import 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
      super('StartScene');
      this.intro = `Hello, player!\n\nAnother grey day in Concrete World.\n\nCollect the flowers!\n\nWatch out for creatures!\n\nPress SPACE to begin...`;
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