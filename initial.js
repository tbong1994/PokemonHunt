 
//initializing game.

var cursor;

var header;
var level;
var playerName;
var gradient;
var sc;

window.onload = function() {

        //Phaser.Game() parameter includes functions to execute. so if you don't include functions that you want executed here, then that function will not be called.
        game = new Phaser.Game(800,500, Phaser.AUTO, '', { preload: preload, create: create, update:update, render:render});
        
        function preload () {

            //load the assets first.

            game.load.image('background', 'assets/background.jpg');
           
            game.load.image('wizard', 'assets/wizard.png');
            
            game.load.image('mob0', 'assets/namoo.png');
            game.load.image('mob1', 'assets/pikachu.png');
            game.load.image('mob2', 'assets/squirtle.png');
            game.load.image('mob3', 'assets/Bulbasaur.png');
            game.load.image('mob4', 'assets/pokemon2.png');
            game.load.image('mob5', 'assets/pokemon.png');
            game.load.image('mob6', 'assets/squirtle2.png');
          
            
            game.load.image('platform', 'assets/platform2.png');

            game.load.image('bullet', 'assets/bullet0.png');


            //ADD PHYSICS TO SYSTEM
            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            //google web font. Text needed for displaying score and level.
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        }
        function create () {
            //create game field.
            game.add.tileSprite(0,0,4600,500,'background');
            game.world.setBounds(0,0,4600,500);

            //game.stage.backgroundColor = "196F3D";
            createPlayer(0,0);

            //for the camera to be able to actually follow, tileSprite must be greater than the Phaser.Game() initial screen.
            game.camera.follow(player);
            createMob();
            createPlatform();
            createBullets();
            createText();
            //detect keyboard input.
            cursor = game.input.keyboard.createCursorKeys();

        }
        function update(){
            playerUpdate();
            mobUpdate();
            platformUpdate();
            updateBullets();
        }

        function createText(){

            header = game.add.text(300, 50, "Pokemon Hunt");
            header.anchor.setTo(0.5);
            header.scale.setTo(.7,.7);
            grd = header.context.createLinearGradient(0, 0, 0, header.canvas.height);
            //grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            header.fill = grd;

            playerName = game.add.text(50,50,player.Name);
            playerName.anchor.setTo(0.5);
            playerName.scale.setTo(.7,.7);
            playerName.fill = grd;

            sc = game.add.text(600,50,"score: "+ player.score);
            sc.anchor.setTo(0.5);
            sc.scale.setTo(.7,.7);
            sc.fill = grd;

            lvl = game.add.text(450,50,"level: "+ player.score);
            lvl.anchor.setTo(0.5);
            lvl.scale.setTo(.7,.7);
            lvl.fill = grd;
        }
        function render(){
           // game.debug.cameraInfo(game.camera, 32, 32);
        }
};