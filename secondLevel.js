

//SECOND LEVEL!

var background;
var gameSound;
//var this_player;

var secondLevel = {
	create: function(){
		//main game background music.
		gameSound = game.sound.play('game_music');
	    //create game field.
	    background = game.add.tileSprite(0,0,gamesizeX,gamesizeY,'secondlevel_background');
	    game.world.setBounds(0,0,background.width,background.height);
	    //order of creating matters because of the layer. platforms must be behind the user and monster sprites.
 		createPlatform();
		createPlayer(initialPlayerX,initialPlayerY,player);
	   	//player.enableBody = true;
	    createMob();
	    createBullets();
	    createItems();
	    //for the camera to be able to actually follow, tileSprite must be greater than the Phaser.Game() initial screen.
	    game.camera.follow(this.player);
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
