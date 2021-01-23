import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
  }

  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play('left', true);
    }
    // Move right
    else if (cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play('right', true);
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
      this.anims.play('turn');
    }
    if (cursors.up.isDown && this.body.touching.down){
      this.setVelocityY(-330);
    }
  }

  // Check which controller button is being pushed and execute movement & animation
  update(cursors) {
    this.updateMovement(cursors);
  }
}
