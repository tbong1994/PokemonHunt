//game.js

//this is the state where the actual game contents are created and updated.
//called by menu state, when user presses a certain key.

var gameState = {

	create: function(){
	    //create game field.
	    game.add.tileSprite(0,0,4600,540,'background');
	    game.world.setBounds(0,0,4600,540);

	    //order of creating matters because of the layer. platforms must be behind the user and monster sprites.
 		createPlatform();

	    //game.stage.backgroundColor = "196F3D";
	    createPlayer(0,0);

	    //for the camera to be able to actually follow, tileSprite must be greater than the Phaser.Game() initial screen.
	    game.camera.follow(player);
	   
	    //put monsters into the game.
	    createMob();
	    createBullets();
	    //detect keyboard input.
	    cursor = game.input.keyboard.createCursorKeys();
	},

	update: function(){
	    playerUpdate();
	    mobUpdate();
	    platformUpdate();
	    updateBullets();
	},

	render: function(){
		//display monsters killed, player name and HP left.
		game.debug.text("monsters killed: " + numMonsterKilled + " " + player.Name+" HP : " + player.HP, 32, 32);
	}
}
