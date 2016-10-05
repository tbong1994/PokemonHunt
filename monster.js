//monsters class.

var monsters;
var lastCollisionTime = 0;
var displayText;
var numMonsterKilled =0;
var timeElapsed =0;

var monster = {
	HP: 100,
	Name:""
};

//CREATE Mob. CALLED IN INITIAL.JS.CREATE() create mobs in a for loop or something.. 
function createMob(){
	mob();
	
	//timer variable keeps track of time elapsed since game started.
}
function mob(){
	//create monsters group.
	monsters = game.add.group();

	//create a monster, which is a part of monsters group.
	monster = monsters.create(300,game.world.height,'mob');

	//increate sprite size.
	monster.scale.setTo(1.5,1.5);

	//flip monster.scale.x because initial sprite sheet 
	//is drawn facing to the right, but in this game,
	//player starts from the left and monsters start from the right.
	//and initially monsters are supposed to move towards the player.
	monster.scale.x*=-1;

	//play() parameter takes animation name, array of frames, frames per second, boolean value.
	//if boolean value is true, animation loops, if false, just operate once.
	monster.animations.add('walk');
	monster.animations.play('walk',10,true);

	//monster sprite should have physics system in order to collide, etc.
	game.physics.enable(monster,Phaser.Physics.ARCADE);
	monsters.enableBody=true;

	//initialize monster's HP.
	monster.HP = 100;

	//monsters should collide with boundaries of the game.
	monster.body.collideWorldBounds=true;
	monster.body.gravity.y = 300;
}

function mobUpdate(){

	//keep track of time.
	timeElapsed = game.time.totalElapsedSeconds();

	//each monster's direction and random speed.
	monsters.forEach(function(m){
		//if monster reached left wall, change direction and keep going.
		if(m.body.blocked.left&&(m.scale.x<0)){
			m.body.velocity.x = (Math.random()*(100-50)+50);
			m.anchor.setTo(0.5,0);
			m.scale.x *= -1;
		}

		//this shouldn't happen but sometimes, monsters collide with players, and then
		//they just walk backwards.. when walking backwards and touch left wall, don't 
		//change direction but just change velocity.
		else if(m.body.blocked.left&&(m.scale.x>0)){
			m.body.velocity.x = (Math.random()*(100-50)+50);
		}
		//if monster reached right wall, change direction and keep going.
		else if(m.body.blocked.right&&(m.scale.x>0)){
			m.body.velocity.x = -(Math.random()*(100-50)+50);
			m.anchor.setTo(0.5,0);
			m.scale.x *= -1;
		}
		//same as when monsters walk backwards but reach the right wall.
		else if(m.body.blocked.right&&(m.scale.x<0)){
			m.body.velocity.x = -(Math.random()*(100-50)+50);
		}

		//Initially monsters move towards the player(to the left).
		else if(m.body.velocity.x ==0){
			m.body.velocity.x = -(Math.random()*(100-50)+50);
		}
	});

	//keep checking if bullets and monsters collided.
	killIfHit(monsters,bullets);

	//keep checking if monsters and players collided.
	collisionPlayerMonster(players,monsters);
}

//Checks collision between monster and bullet and if collision happens, calls collisionHandler function.
function killIfHit(monsters, bullets){
	monsters.forEach(function(m){
		/*detect collision between object1 and object 2. when collided, callback function is called.
		*@param: object1,object2, callBackFunction, processCallback, callBackContext.
		*processCallback has to return either true or false. when true, colliding between ob1 and ob2
		*is acknowledged and calls the call back function. if false, the collision is ignored and fallback function also is ignored.
		*/
		if (game.physics.arcade.collide(m, bullets, collisionHandler, processHandler, this)){
			console.log("BOOM");
			m.HP -= 30;
		}
	});
}

//this function handles when collision happens between bullet and monster.
function collisionHandler(monster,bullet){
	if(monster.HP<0){
		//monster dead.
		monster.kill();
		numMonsterKilled++;
		//player score up.
		player.score++;
	}

	//bullet initial scale.x is positive.
	//monsters initial scale.x is negative.
	//monster hit from the back(left) when monster is moving towards the right. change direction(towards where the bullet came from).
	if(monster.scale.x > 0 && bullet.scale.x>0){
		monster.anchor.setTo(0.5,0);
		monster.scale.x *= -1;
		monster.body.velocity.x *=-1;
	}

	//monster walking towards the right, hit from the right.
	else if(monster.scale.x > 0 && bullet.scale.x<0){
		monster.anchor.setTo(0.5,0);
		monster.body.velocity.x *=-1;
	}

	//monster hit directly in the face. keep moving in the same direction.
	else if(monster.scale.x < 0 && bullet.scale.x>0){
		monster.anchor.setTo(0.5,0);
		monster.body.velocity.x *=-1;
	}

	//if player hits the monsters from the back again but from the right, when monster is moving towards the left. Change direction.
	else if(monster.scale.x <0 && bullet.scale.x<0){
		monster.anchor.setTo(0.5,0);
		monster.scale.x *= -1;
		monster.body.velocity.x *=-1;
	}
	else{
		if(monster.scale.x<0){
 		monster.body.velocity.x *=-1;
		}
	}
	bullet.kill();
	console.log("Got Em");
}

//processHandler needs to return true for the collision to happen.
function processHandler(monster,bullet){
	return true;
}

//detect when player and monster collide.
function collisionPlayerMonster(players,monsters){
	// console.log("lastcollision:"+lastCollisionTime);
	// console.log("time:"+timeElapsed);

	monsters.forEach(function(m){
		if (game.physics.arcade.collide(m, players, pm_collisionHandler, pm_processHandler, this)){
		}
	});
}

//Called when monster and player collided. Handles collision between monster and player
function pm_collisionHandler(monster,player){
	//record the time when collision happened so we can keep track of time after collision.
	//player's HP drops when contacted by monster but there's time frame, so that the player is not hit every ms.
	if(lastCollisionTime==0){
		console.log("first damage");
		player.HP -= 30;
		lastCollisionTime = timeElapsed;
	}

	//if it's been more than 3 seconds since last contact with monster, drop HP.
	if((timeElapsed - lastCollisionTime)>3){
		console.log("second damage");		
		player.HP -= 30;
		lastCollisionTime = timeElapsed;
	}
 	//player dead.
 	if(player.HP<=0){
 		player.kill();
 		gameOver();
 	}

 	//if player hit when facing the right direction, just push back.
 	if(player.scale.x >0){
 		player.body.x -= 100;
 	}

 	//if player hit when facing the left, also push back but to the right.
 	if(player.scale.x <0){
 		player.body.x += 50;
 	}
 	
 	//monster to the left, player to the right.
 	if(monster.scale.x<0&&(monster.body.x>player.body.x)){
 		if(monster.body.velocity.x>0){
	 		monster.body.velocity.x *= -1;
 		}
 	}
 	//monster to the right, player to the left.
 	else if(monster.scale.x>0&&(monster.body.x<player.body.x)){
 		monster.body.velocity.x *= -1;
 	}
}
function pm_processHandler(){
	return true;
}

function gameOver(){
	//display game over text.
	var msg = game.add.text(80,80,'Game Over :(');
	msg.font = 'Revalia';
	msg.fontSize = 60;
	msg.stroke = '#000000';
	msg.strokeThickness = 2;
	msg.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
	msg.fixedToCamera=true;

	//display replay button.
	var replayButton = game.add.button(400,500, 'emptybutton', replay, this, 0.3, 0.3, 0.5);
	var replayButtonText = game.add.text(replayButton.x+25,replayButton.y+49,"Play Again");
	decorateText(replayButtonText);
	replayButtonText.fontSize = 22;
	replayButton.fixedToCamera = true;
	
	//stop time.
}

function replay(){
	game.state.start('menu');
}