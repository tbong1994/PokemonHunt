
//platforms class.

//platforms not need to be updated it's part of game setting.
//the only time it needs to update is collision.

var platforms;

function createPlatform(){
	platforms = game.add.group();

	platformX = 30;

	//work on creating platform, make sure they're not too over populated in one area and empty in other areas.
	for(i =0;i<40;i++){
		var randomNum = Math.floor((Math.random()*2)+1);

		//generate 2 platforms randomly.
		var platform = platforms.create(platformX,Math.random()*(game.world.height-350)+350,'platform' + ''+randomNum);
		platform.scale.setTo(1,1);

		//enable physics for platforms.
		game.physics.enable(platforms,Phaser.Physics.ARCADE);
		platforms.enableBody=true;
		platform.body.collideWorldBounds = true;

		platformX += 150;
		//for each platform created, allow collision on their top side. so that players can land on it.
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
		game.physics.arcade.collide(platforms, monsters);
		game.physics.arcade.collide(platforms, hpPotions);
		//one way collision.players can land on the platform but collision from other directions will not happen.
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = false;
	});
}