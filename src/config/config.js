export default {
    physics: {    
      default: 'arcade',  
      arcade: {
        gravity: { y: 300 },  
        debug: true,    
      }
    },
    type: Phaser.AUTO,  
    width: 800,   
    height: 600, 
    parent: "canvas-container"
  };
  