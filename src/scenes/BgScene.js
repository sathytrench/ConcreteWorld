import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    this.load.image('sky', 'assets/backgrounds/background3.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
  }
}