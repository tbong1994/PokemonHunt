
//platforms class.

//platforms not need to be updated it's part of game setting.
//the only time it needs to update is collision.

var platforms;

function createPlatform(){
	platforms = game.add.group();

	for(i =0;i<100;i++){
		var platform = platforms.create(Math.random()*(game.world.width)+300,Math.random()*(game.world.height-400)+400,'platform');
		platform.scale.setTo(1,1);

	//enable physics for platforms.
		game.physics.enable(platforms,Phaser.Physics.ARCADE);
		platforms.enableBody=true;
		platform.body.collideWorldBounds = true;
		platforms.forEach(function(p){
			p.body.checkCollision.up = true;
		});
	}
	
}

function platformUpdate(){

	platforms.forEach(function(p){
		p.body.immovable = true;
	//only players and platforms collide
		game.physics.arcade.collide(platforms,players);

		//one way collision.players can land on the platform but collision from other directions will not happen.
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = false;
	});
}