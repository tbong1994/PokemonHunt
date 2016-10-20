//monsters class.

var monsters;
var lastCollisionTime = 0;
var displayText;
var timeElapsed =0;
var followingTime = 0;
var monsterHealthBar;

var monster = {
	HP: 100,
	Name:"",
	hit: false,
	healthbar: monsterHealthBar
};

function createMob(){
	mob();
}

function mob(){
	//create monsters group.
	monsters = game.add.group();

	for(i=1;i<3;i++){
		//create a monster, which is a part of monsters group.
		monster = monsters.create(Math.random()*((player.body.x+750)-650)+650,Math.random()*(300-100)+100,'monster'+i);
		//increate sprite size.
		monster.scale.setTo(1.1,1.1);

		/*flip monster.scale.x because initial sprite sheet 
		*is drawn facing to the right, but in this game,
		*player starts from the left and monsters start from the right.
		*and initially monsters are supposed to move towards the player.
		*/

		//play() parameter takes animation name, array of frames, frames per second, boolean value.
		//if boolean value is true, animation loops, if false, just operate once.
		monster.animations.add('walk');
		monster.animations.play('walk',10,true);

		//monster sprite should have physics system in order to collide, etc.
		game.physics.enable(monster,Phaser.Physics.ARCADE);
		monsters.enableBody=true;

		//initialize monster's HP.
		monster.HP = 100;
		var monsterHealthBarPosition ={x:monster.body.x+10, y:monster.body.y+5};
		monster.healthbar = new HealthBar(this.game,monsterHealthBarPosition);
		//monsters should collide with boundaries of the game.
		monster.body.collideWorldBounds=true;
		monster.body.gravity.y = 500;
		monster.body.velocity.x = -(Math.random()*(100-50)+50);
	}
}

function mobUpdate(){

	//keep track of time.
	timeElapsed = game.time.totalElapsedSeconds();	
	//each monster's direction and random speed.
	monsters.forEach(function(m){
		if(m.scale.x<0){
			m.body.velocity.x = (Math.random()*(100-50)+50);			
		}
		// else if(m.scale.x>0){
		// 	m.body.velocity.x = (Math.random()*(100-50)+50);
		// }
		//if monster reached left wall, change direction and keep going.
		if(m.body.blocked.left&&(m.scale.x>0)){
			m.body.velocity.x *=-1;
			m.anchor.setTo(0.5,0);
			m.scale.x *= -1;
		}

		//if monster reached right wall, change direction and keep going.
		else if(m.body.blocked.right&&(m.scale.x<0)){
			m.body.velocity.x = -(Math.random()*(100-50)+50);
			m.anchor.setTo(0.5,0);
			m.scale.x *= -1;
		}
		//same as when monsters walk backwards but reach the right wall.
		else if(m.body.blocked.right&&(m.scale.x>0)){
			m.body.velocity.x = -(Math.random()*(100-50)+50);
		}

		if(m.hit == true){
			setTarget(player,m);
			if(timeElapsed - followingTime > 4){
				m.hit = false;
			}
		}
		m.healthbar.setPosition(m.body.x+30,m.body.y+5);//healthbar always above monster sprites
	});
	//keep checking if bullets and monsters collided.
	killIfHit(monsters,bullets);
	//keep checking if monsters and players collided.
	collisionPlayerMonster(players,monsters);
	monsters.setAll('outOfBoundsKill',true);
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
			m.HP -= 30;
			boom = game.add.sprite(m.body.x,m.body.y,'boom');
			boom.animations.add('boom');
			boom.animations.play('boom',40,false);
			m.healthbar.setPercent(m.HP); //display health bar how much is left.
		}
	});
}

//this function handles when collision happens between bullet and monster.
function collisionHandler(monster,bullet){
	//monster's hit.
	monster.hit = true;
	followingTime = timeElapsed;
	if(monster.HP<=0){
		//monster dead.
		//improve performance by disabling the body when dead. won't be called when checking collision.
		monster.enableBody=false; 
		monster.kill();
		monster.healthbar.kill();
		this.monsters.remove(monster); //remove dead monsters from the array.
		

		//OR YOU COULD REUSE MONSTERS JUST LIKE BULLETS. FOR BETTER PERFORMANCE.


		//player score up.
		player.score += 30;
		//only check when monsters die, if any other monsters are still alive.
		//if no monsters are alive, player wins.
		if(this.monsters.total == 0){
			youWin();
		}
	}

	//bullet initial scale.x is positive.
	//monsters initial scale.x is positive.
	//monster hit from the back(left) when monster is moving towards the right. change direction(towards where the bullet came from).
	if(monster.scale.x < 0 && bullet.scale.x>0 || monster.scale.x >0 && bullet.scale.x<0){
		chasePlayer(monster,player,'back');
	}

	//monster walking towards the right, hit from the right. hit from front
	else if(monster.scale.x < 0 && bullet.scale.x<0 || monster.scale.x > 0 && bullet.scale.x>0){
		chasePlayer(monster,player,'front');
	}
	else{
		if(monster.scale.x<0){
 			monster.body.velocity.x *=-1;
		}
	}
	bullet.kill();
}

//processHandler needs to return true for the collision to happen.
function processHandler(monster,bullet){
	return true;
}

//detect when player and monster collide.
function collisionPlayerMonster(players,monsters){
	//disable collision for 3 seconds after player got hit by monster.
	if(timeElapsed - lastCollisionTime<=3){
		player.body.checkCollision.left = false;
		player.body.checkCollision.right = false;
	}else{
		//after 3 seconds had passed.
		player.body.checkCollision.left = true;
		player.body.checkCollision.right = true;
		monsters.forEach(function(m){
			if (game.physics.arcade.collide(m, players, pm_collisionHandler, pm_processHandler, this)){
			}
		});
	}
}

//Called when monster and player collided. Handles collision between monster and player
function pm_collisionHandler(monster,player){
	//record the time when collision happened so we can keep track of time after collision.
	//player's HP drops when contacted by monster but there's time frame, so that the player is not hit every ms.
	if(lastCollisionTime==0||(timeElapsed-lastCollisionTime)>3){
		player.HP -= 20;
		lastCollisionTime = timeElapsed;
		myHealthBar.setPercent(player.HP);
	}
 	//player dead.
 	if(player.HP<=0){
 		//don't display negative number.
 		player.HP = 0;
 		player.enableBody=false; //improve performance.
 		player.kill();
 		myHealthBar.kill();
 		gameOver();
 		this.players.remove(player);
  	}
	// do all this only when collision is allowed 
	//for 3 seconds after collision, player will not collide with monsters.
	
 	//if player hit when facing the right direction, just push back.
 	if(player.scale.x >0){
 		//make the sprite jump after collision
 		player.anchor.setTo(0,1.0);
 		player.body.x -= 100;
 	}

 	//if player hit when facing the left, also push back but to the right.
 	if(player.scale.x <0){
 		player.anchor.setTo(0,1.0);
 		player.body.x += 100;
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
	//display replay button.
	var replayButton = game.add.button(500,game.world.height/2, 'emptybutton', replay, this, 0.3, 0.3, 0.5);
	var replayButtonText = game.add.text(replayButton.x+25,replayButton.y+75,"Play Again");
	decorateText(replayButtonText);
	replayButtonText.fontSize = 25;
	replayButton.scale.setTo(1.5,1.5);
	replayButtonText.fixedToCamera = true;
	replayButton.fixedToCamera = true;
	
	//display game over text.
	var msg = game.add.text(400,150,'Game Over');
	decorateText(msg)
	msg.fixedToCamera=true;
	//stop time.
}

//doesn't work yet but need to work on it!
function attackPlayer(monster,player){
	//when player is right above monster, monster jumps to attack.
	if(Math.abs(player.x-monster.body.x) < 100 && Math.abs(player.x-monster.body.x) > 40){
		monster.body.velocity.y =-300;
		console.log("closeby");
	}
	//if player is nearby monster, monster tries to hit him.
	// if(Math.abs(player.y-monster.body.y) < 50 && Math.abs(player.y-monster.body.y) > 0&&Math.abs(player.x-monster.body.x)<300){
	 
	// }
}

//when bullet hits monster, monster should set the player as target and follow.
//the monster from the parameter is hit, because only the hit monsters are being passed in,
//as chasePlayer is called inside the collision handling function.
//direction is where the bullet came from with respect to monster.
function chasePlayer(monster,player,direction){
	if(direction=='back'){
		monster.anchor.setTo(0.5,0);
		monster.scale.x *= -1;
		monster.body.velocity.x *=-1.5;
	}
	else if(direction=='front'){
		monster.body.velocity.x *=-1.5;
	}
}
//monsters that set the player as target will only move around the player.
function setTarget(player,monster){
	//player is behind monster. turn around and follow.
	if(player.body.x > monster.body.x && monster.scale.x > 0){
		if(monster.body.velocity.x <0){
			monster.anchor.setTo(0.5,0);
			monster.scale.x *= -1;
			monster.body.velocity.x = -560;
		}
	}
	if(player.body.x < monster.body.x && monster.scale.x < 0){
	 	if(monster.body.velocity.x >0){
			monster.anchor.setTo(0.5,0);
			monster.scale.x *= -1;
			monster.body.velocity.x = 560;
		}
	}
	//player is in front. keep going
	if(player.body.x > monster.body.x && monster.scale.x < 0){
		if(monster.body.velocity.x <0){
			monster.anchor.setTo(0.5,0);
			monster.body.velocity.x = 560;
		}
	}
	if(player.body.x < monster.body.x && monster.scale.x > 0){
		if(monster.body.velocity.x >0){
			monster.anchor.setTo(0.5,0);
			monster.body.velocity.x = -560;
		}
	}
}
function replay(){
	game.state.start('menu');
}
function youWin(){
	game.state.start('menu');
}