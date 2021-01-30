/** @type {import("../typings/phaser")} */

import Phaser from 'phaser';
import config from './config/config';
import Scene1 from './scenes/Scene1';
import StartScene from './scenes/StartScene';
import GameOver from './scenes/GameOver';

class Game extends Phaser.Game {
    constructor() {
      super(config);
  
      this.scene.add('StartScene', StartScene);
      this.scene.add('Scene1', Scene1);
      this.scene.add('GameOver', GameOver);
      
      this.scene.start('StartScene');
    }
  }
  
  window.onload = function () {
    window.game = new Game();
  }
  