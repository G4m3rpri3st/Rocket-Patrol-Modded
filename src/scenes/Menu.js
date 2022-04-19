class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('playMusic', './assets/eCommerce.mp3');
      }

    create() {
        // menu text configuration
        let menuConfig = {
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

        let creditConfig = {
          fontFamily: 'Courier',
        fontSize: '24px',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
      }

        //display high score
        this.highScore = this.add.text(game.config.width/2, borderUISize + borderPadding*2.4, 'High Score:' + highScore, menuConfig).setOrigin(0.5,0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ← → to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3, 'Play music is "eCommerce" by BoxCat Games \n From the Free Music Archive, CC BY 3.0', creditConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      }

      update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}

