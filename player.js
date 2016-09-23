//player class

var players;
var player;

//CREATE PLAYER. CALLED IN INITIAL.JS.CREATE()
 function createPlayer(x,y){
	players = game.add.group();

	//player is added as a sprite at x,y coordinates entered from create() function from initial.js
	player = game.add.sprite(x,y,'wizard');
	// player = players.create(x,y,'player');
	//set player's image scale
	player.scale.setTo(.3,.3);

	//ADD PHYSICS TO SYSTEM
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//ADD PHYSICS TO PLAYER
	game.physics.enable(player,Phaser.Physics.ARCADE);
	players.enableBody=true;

	//ADD WALLS TO THE SCREEN SO THE PLAYER DOESN'T GO OUT OF BOUNDS.
	player.body.collideWorldBounds = true;

	//GRAVITY AND BOUNCE OF PLAYER.
	player.body.bounce.y = 0.5;
	player.body.gravity.y = 300;
 }

 function playerUpdate(){

 	//player's initial x vel is zero.
	player.body.velocity.x = 0;
	
	//when left arrow is pressed;
	if(cursor.left.isDown){
		player.body.velocity.x = -150;
		player.scale.x *=1;
	//when right arrow is pressed;
	}else if(cursor.right.isDown){
		player.body.velocity.x = 150;
	}
	else if(cursor.up.isDown){
		player.body.velocity.y = -150;
	}
	else if(cursor.down.isDown){
		//just duck or something.	
	}

	//make it able for players to collide.
	game.physics.arcade.collide(players, players);
 }