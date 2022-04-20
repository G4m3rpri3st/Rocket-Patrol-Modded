/* 
* Author: Logan Flansaas
* Date: 4/18/2022
* Title: Rocket Patrol 2: Electric Boogalo
* Time to complete: X hours
* ----------------------------------------
* Points breakdown:
* Track a high score that persists across scenes and display it in the UI (5)
* Add your own (copyright-free) background music to the Play scene (5)
* Implement the speed increase that happens after 30 seconds in the original game (5)
* Allow the player to control the Rocket after it's fired (5)
* Display the time remaining (in seconds) on the screen (10)
* Implement parallax scrolling (10)
* Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
* Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
* Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyDOWN, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// initialize high score
let highScore = 0;