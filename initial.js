 
//initializing gam

var cursor;

window.onload = function() {

        //Phaser.Game() parameter includes functions to execute. so if you don't include functions that you want executed here, then that function will not be called.
        game = new Phaser.Game(800,540, Phaser.AUTO, '', { preload: preload, create: create, update:update});
        
        function preload () {

            //load the assets first.

            game.load.image('background', 'assets/background.jpg');
           
            game.load.image('wizard', 'assets/wizard.png');
            
            game.load.image('mob0', 'assets/namoo.png');
            game.load.image('mob1', 'assets/pikachu.png');
            game.load.image('mob2', 'assets/squirtle.png');
            
            game.load.image('platform', 'assets/platform2.png');

            game.load.image('bullet', 'assets/bullet0.png');


            //ADD PHYSICS TO SYSTEM
            game.physics.startSystem(Phaser.Physics.ARCADE);
            

        }
        function create () {
            //create game field.
            game.add.sprite(0,0,'background');
            //game.stage.backgroundColor = "196F3D";
            createPlayer(0,430);
            createMob(600,430);
            createPlatform();
            createBullets();

            //detect keyboard input.
            cursor = game.input.keyboard.createCursorKeys();
        }
        function update(){
            playerUpdate();
            mobUpdate();
            platformUpdate();
            updateBullets();
        }

};