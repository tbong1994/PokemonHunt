//player class

var players;
var player;

//CREATE PLAYER. CALLED IN INITIAL.JS.CREATE()
//later on, you give user a choice which character they want to choose.
 function createPlayer(x,y){
	players = game.add.group();

	//player is added as a sprite at x,y coordinates entered from create() function from initial.js
	player = players.create(x,y,'wizard');
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
		//if character is facing right, change direction to left.
		if(player.scale.x >0){
			player.anchor.setTo(0.5,0.5);
			player.scale.x *=-1;
		}

	//when right arrow is pressed;
	}else if(cursor.right.isDown){
		player.body.velocity.x = 150;
		//if character is facing left, then change back to right.
		if(player.scale.x<0){
			player.anchor.setTo(0.5,0.5);
			player.scale.x *=-1;
		}
	}

	//only make it able to jump, not fly.
	else if((cursor.up.isDown&&player.body.touching.down)||(cursor.up.isDown&&player.body.blocked.down)){
		player.body.velocity.y = -300;
	}
	else if(cursor.down.isDown){
		//just duck or something.
		//use changing frame or loading another image for this.	
	}

	//make it able for players to collide.
	game.physics.arcade.collide(players, players);
 }