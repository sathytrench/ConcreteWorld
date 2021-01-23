import 'phaser'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.audio('music', 'assets/audio/snowWorld.mp3');
  }

  create() {
    this.scene.launch('BgScene');
    this.scene.launch('FgScene');
    this.sound.add('music').setLoop(true).play();
  }
}