//monsters class.

var monsters;


var monster = {
	HP: 100,
	Name:""
};

//CREATE Mob. CALLED IN INITIAL.JS.CREATE() create mobs in a for loop or something.. 
 function createMob(){
	monsters = game.add.group();

	for(i =0;i<7;i++){
		//player is added as a sprite at x,y coordinates entered from create() function from initial.js
		monster = monsters.create(Math.random()*(game.world.width-0)+0,game.world.height,'mob'+''+i);

		//initialize monster's HP.
		monster.HP = 100;


	// player = players.create(x,y,'player');
	//set player's image scale
		monster.scale.setTo(.5,.5);

	// //ADD PHYSICS TO Monsters
		game.physics.enable(monster,Phaser.Physics.ARCADE);
		monsters.enableBody=true;

		
	//ADD WALLS TO THE SCREEN SO THE PLAYER DOESN'T GO OUT OF BOUNDS.
		monster.body.collideWorldBounds = true;

	//GRAVITY AND BOUNCE OF PLAYER.
		monster.body.gravity.y = 300;
	}
 }
 //CREATE PLAYER. CALLED IN INITIAL.JS.CREATE()


 function mobUpdate(){

 	//each monster's direction and random speed.
 	monsters.forEach(function(m){
 		//if monster reached left wall, change direction and keep going.
 		
 		//this works..but kind of terrible.

 		if(m.body.blocked.left&&(m.scale.x>0)){
 			m.body.velocity.x = (Math.random()*(100-50)+50);
 			m.anchor.setTo(0.5,0.5);
 			m.scale.x *= -1;
 			// console.log("left block");
 		}
 		//if monster reached right wall, change direction and keep going.
 		else if(m.body.blocked.right){
 			m.body.velocity.x = -(Math.random()*(100-50)+50);
 			m.anchor.setTo(0.5,0.5);
 			m.scale.x *= -1;
 			// console.log("right block");
 		}
 		/*Initially, monster starts with vel =0, make monsters 
		*initally move towards the player.
		*/
 		else if(m.body.velocity.x ==0){
 			m.body.velocity.x = -(Math.random()*(100-50)+50);

 			if(m.body.velocity.x<0&&(m.scale.x<0)){
 				m.body.velocity.x = (Math.random()*(100-50)+50);
 			}
 			// console.log('this');
 		}
 		// if(monsters.length<5){
 		// 	createMob(0,0);
 		// }

 	});
 	
 	//game.physics.arcade.collide(monsters, bullets);
 	killIfHit(monsters,bullets);
 }

//this function checks collision between monster and bullet and if collision happens, kills both of them. called in updateMob() function.
 function killIfHit(monsters, bullets){
 	monsters.forEach(function(m){
 		if (game.physics.arcade.collide(m, bullets, collisionHandler, processHandler, this)){
			console.log("BOOM");
			m.HP = m.HP-30;
		}
 	});
 }

 function collisionHandler(monster,bullet){ 	
 	if(monster.HP<0){
 		//monster dead.
 		monster.kill();

 		//player score up.
 		player.score++;
 	}

 	//monsters need to keep going in the same direction even though they're hit.
 	if(monster.scale.x > 0 && bullet.scale.x<0){
 		monster.scale.x *= -1;
 		monster.body.velocity.x *=-1;
 	} 
 	else if(monster.scale.x <0 && bullet.scale.x>0){
 		monster.scale.x *= -1;
 		monster.body.velocity.x *=-1;
 	}
 	else{
 		monster.body.velocity.x *=-1;
 	} 		
 	bullet.kill();
 	console.log("Got Em");
 }
 function processHandler(monster,bullet){
 	//processHandler needs to return true for the collision to happen.
 	return true;
 }

//when monsters hit player, player loses HP.
//gotta work on this function.
 function collisionPlayerMonster(player,monster){
 	monsters.forEach(function(m){
 		if (game.physics.arcade.collide(m, player, pm_collisionHandler, pm_processHandler, this)){
			console.log("OUCH");
			player.HP =-10;
		}
 	});
 }

 function pm_collisionHandler(){
 	if(player.HP<0){
 		//player dead.
 		player.kill();
 	}
 }
 function pm_processHandler(){
 	return true;
 }