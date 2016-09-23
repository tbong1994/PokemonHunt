 
//initializing gam

var cursor;

window.onload = function() {

        //Phaser.Game() parameter includes functions to execute. so if you don't include functions that you want executed here, then that function will not be called.
        game = new Phaser.Game(800,540, Phaser.AUTO, '', { preload: preload, create: create, update:update});
        
        function preload () {
            //load the player image first.
            game.load.image('background', 'assets/background.jpg');
            game.load.image('wizard', 'assets/wizard.png');
            game.load.image('mob', 'assets/namoo.png');
            game.load.image('pikachu', 'assets/pikachu.png');
        }
        function create () {
            //create game field.
            game.add.sprite(0,0,'background');
            //game.stage.backgroundColor = "196F3D";
            createPlayer(0,430);
            createMob1(700,430);
            createMob2(650,400);
            cursor = game.input.keyboard.createCursorKeys();
        }
        function update(){
            playerUpdate();
            mobUpdate();
        }

};