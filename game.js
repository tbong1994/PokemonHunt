//game.js

//this is the state where the actual game contents are created and updated.
//called by menu state, when user presses a certain key.
var background;
var gamesizeX = 1600;
var gamesizeY = 540;
var gameSound;

var gameState = {

	create: function(){
		//main game background music.
		gameSound = game.sound.play('game_music');
	    //create game field.
	    background = game.add.tileSprite(0,0,gamesizeX,gamesizeY,'background');
	    game.world.setBounds(0,0,background.width,background.height);

	    //order of creating matters because of the layer. platforms must be behind the user and monster sprites.
 		createPlatform();
	    createPlayer(0,350);
	    createMob();
	    createBullets();
	    createItems();
	    //for the camera to be able to actually follow, tileSprite must be greater than the Phaser.Game() initial screen.
	    game.camera.follow(player);
	    //detect keyboard input.
	    cursor = game.input.keyboard.createCursorKeys();
	},
	update: function(){
	    playerUpdate();
	    mobUpdate();
	    platformUpdate();
	    updateBullets();
	    // updateItems();
	},
	render: function(){
		//display monsters killed, player name and HP left.
		//game.debug.text(player.name+" "+ "HP : "+ player.HP+" EXP: " + player.score + " Level: "+player.lvl +" EXP to lvl up: "+(expForLevelUp-player.score), 32, 32);
	}
}
