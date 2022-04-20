class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield0', './assets/starfield0.png');
        this.load.image('starfield1', './assets/starfield1.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('spark0', './assets/whiteParticle.png');
        this.load.image('spark1', './assets/greenParticle.png');
        this.load.image('spark2', './assets/yellowParticle.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      }

    create() {
        // play music
        this.playSong = this.sound.add('playMusic');
        this.playSong.play();
        this.playSong.loop = true;

        // place tile sprites
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield0 = this.add.tileSprite(0, 0, 640, 480, 'starfield0').setOrigin(0, 0);
        this.starfield1 = this.add.tileSprite(0, 0, 640, 480, 'starfield1').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0).setDepth(1);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(1);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '24px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'center',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 160
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2.4, 'Score:' + this.p1Score, scoreConfig).setDepth(2);
        this.highScore = this.add.text(game.config.width/2, borderUISize + borderPadding*2.4, 'High:' + highScore, scoreConfig).setOrigin(0.5,0).setDepth(2);

        // display timer
        this.timeLeft = game.settings.gameTimer;
        this.displayTimer = this.add.text(game.config.width - borderUISize - borderPadding, borderUISize + borderPadding*2.4, 'Time:' + this.timeLeft/1000, scoreConfig).setOrigin(1,0).setDepth(2);

        // spaceships speed up after 30 seconds
        this.speedUp = this.time.delayedCall(30000, () => {
          this.ship01.moveSpeed += 1;
          this.ship02.moveSpeed += 1;
          this.ship03.moveSpeed += 1;
      }, null, this);

        // GAME OVER flag
        this.gameOver = false;
      }

      update(time, delta) {
        // check if time is up and call game over
        if(this.timeLeft <= 0 && this.gameOver != true) {
          //game over menu
          let endConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', endConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ↓ for Menu', endConfig).setOrigin(0.5);
          this.gameOver = true;
        }
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.playSong.stop();
          this.scene.restart();
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          this.playSong.stop();
          this.scene.start("menuScene");
        }

        // parallax background scrolling
        this.starfield.tilePositionX -= 0.25;
        this.starfield0.tilePositionX -= 0.5;
        this.starfield1.tilePositionX -= 1;
        this.starfield2.tilePositionX -= 2;

        if (!this.gameOver) {               
          this.p1Rocket.update();         // update rocket sprite
          this.ship01.update();           // update spaceships (x3)
          this.ship02.update();
          this.ship03.update();

        // update timer display
          this.timeLeft -= delta;
          this.displayTimer.text = 'Time:' + (this.timeLeft/1000).toFixed(1) + 's';
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship01);
        }

        
      }

      checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0;
      // create explosion particles at ship's position
      var emitter0 = this.add.particles('spark0').createEmitter({
        x: ship.x,
        y: ship.y + 16,
        speed: { min: -400, max: 400 },
        angle: { min: 0, max: 360 },
        scale: { start: 2, end: 0 },
        blendMode: 'SCREEN',
        //active: false,
        lifespan: 300,
      });
      var emitter1 = this.add.particles('spark1').createEmitter({
        x: ship.x,
        y: ship.y + 16,
        speed: { min: -400, max: 400 },
        angle: { min: 0, max: 360 },
        scale: { start: 2, end: 0 },
        blendMode: 'SCREEN',
        //active: false,
        lifespan: 300,
      });
      var emitter2 = this.add.particles('spark2').createEmitter({
        x: ship.x,
        y: ship.y + 16,
        speed: { min: -400, max: 400 },
        angle: { min: 0, max: 360 },
        scale: { start: 2, end: 0 },
        blendMode: 'SCREEN',
        //active: false,
        lifespan: 300,
      });
      emitter0.explode(10);
      emitter1.explode(10);
      emitter2.explode(10);
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');             // play explode animation
      boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
      });
      // add score and time and repaint
      this.timeLeft += 1000;
      this.p1Score += ship.points;
      if (highScore < this.p1Score){
        highScore = this.p1Score;
        this.highScore.text = 'High:' + highScore;
      }
      this.scoreLeft.text = 'Score:' + this.p1Score;
      this.sound.play('sfx_explosion');       
    }
    
}