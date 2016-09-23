
//platforms class.

//platforms not need to be updated it's part of game setting.
//the only time it needs to update is collision.

var platform;
var platforms;

function createPlatform(){
	platforms = game.add.group();

	platform = platforms.create(300,400,'platform');
	platform.scale.setTo(1,1);

	//platforms enter the physics world.
	game.physics.enable(platforms,Phaser.Physics.ARCADE);
	platforms.enableBody=true;
	platform.body.collideWorldBounds = true;
}

function platformUpdate(){

	platform.body.immovable = true;

	//only players and platforms collide
	game.physics.arcade.collide(platforms,players);
}