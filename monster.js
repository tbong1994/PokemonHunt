//monsters class.

var monsters;
var monster;
var monster2;

//CREATE Mob. CALLED IN INITIAL.JS.CREATE() create mobs in a for loop or something.. 
 function createMob1(x,y){
	monsters = game.add.group();

	//player is added as a sprite at x,y coordinates entered from create() function from initial.js
	monster = monsters.create(x,y,'mob');
	// player = players.create(x,y,'player');
	//set player's image scale
	monster.scale.setTo(.5,.5);

	//ADD PHYSICS TO SYSTEM
	// game.physics.startSystem(Phaser.Physics.ARCADE);

	// //ADD PHYSICS TO PLAYER
	game.physics.enable(monster,Phaser.Physics.ARCADE);
	monsters.enableBody=true;

	//ADD WALLS TO THE SCREEN SO THE PLAYER DOESN'T GO OUT OF BOUNDS.
	monster.body.collideWorldBounds = true;

	//GRAVITY AND BOUNCE OF PLAYER.
	monster.body.gravity.y = 300;
	monster.body.velocity.x = -70;
 }
 //CREATE PLAYER. CALLED IN INITIAL.JS.CREATE()
 function createMob2(x,y){

	//player is added as a sprite at x,y coordinates entered from create() function from initial.js
	monster2 = monsters.create(x,y,'pikachu');
	// player = players.create(x,y,'player');
	//set player's image scale
	monster2.scale.setTo(.5,.5);

	//ADD PHYSICS TO SYSTEM
	// game.physics.startSystem(Phaser.Physics.ARCADE);

	// //ADD PHYSICS TO PLAYER
	game.physics.enable(monster2,Phaser.Physics.ARCADE);
	monsters.enableBody=true;

	//ADD WALLS TO THE SCREEN SO THE PLAYER DOESN'T GO OUT OF BOUNDS.
	monster2.body.collideWorldBounds = true;

	//GRAVITY AND BOUNCE OF PLAYER.
	monster2.body.gravity.y = 300;
	monster2.body.velocity.x = -100;
 }

 function mobUpdate(){

 	if(monster2.body.blocked.left){

 		monster2.anchor.setTo(0.5,0.5);
 		monster2.body.velocity.x = monster2.body.velocity.x*-1;
 		monster2.scale.x *=-1;
 		//error detection purpose.
 		console.log('left');
 	}
 	else if(monster2.body.blocked.right){

 		monster2.anchor.setTo(0.5,0.5);
 		monster2.scale.x *=-1;
 		monster2.body.velocity.x = monster2.body.velocity.x*-1;

 		console.log('right');
 	}
 	
 }