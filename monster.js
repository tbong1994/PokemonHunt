//monsters class.


//EACH LEVEL SHOULD HAVE THE BOSS MOB. SPECIAL SCREEN WHEN THE BOSS APPEARS(BOSS SHOULD APPEAR WHEN 
//ALL THE NORMAL MONSTERS ARE DEAD) AND MUSIC WOULD BE COOL. THE BOSS SHOULD BE ABLE TO ATTACK WITH DIFFERENT ABILITIES.
//IT'S KIND OF LIKE AN AI. 
//MAKE THIS HAPPEN WITHOUT TOO MUCH LAG..

var monsters;
var lastCollisionTime = 0;
var displayText;
var timeElapsed =0;
var followingTime = 0;
var monsterHealthBar;
var monster_vel_x = 600;
var monster_vel_y = 0;
var gameOverSound;
var bossMob;
var bossAlive = false;
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
	bossMob = game.add.group();

	bossMob.createMultiple(1,'boss');
	game.physics.enable(bossMob,Phaser.Physics.ARCADE);
	bossMob.enableBody = true;
	//ANIMATION SHOULD BE CREATED AND PLAYED WHEN ONE OBJECT FROM bossMob is referred.
	//PERHAPS IN THE SAME FUNCTION WHEN THE bossMob IS RESET.
	// bossMob.animations.add('walk',[21,22,23,24,25,26,27,28]);

	for(i=1;i<6;i++){
		//create a monster, which is a part of monsters group.
		monster = monsters.create(Math.random()*((gamesizeX)-0)+0,Math.random()*(300-100)+100,'monster'+Math.floor((Math.random() * 2) + 1));
		//increate sprite size.
		monster.scale.setTo(1.1,1.1);

		//play() parameter takes animation name, array of frames, frames per second, boolean value.
		//if boolean value is true, animation loops, if false, just operate once.
		monster.animations.add('walk');
		monster.animations.play('walk',10,true);

		//animation for monsters getting hit.
		booms = game.add.group();
		booms.createMultiple(3,'boom');

		//monster sprite should have physics system in order to collide, etc.
		game.physics.enable(monster,Phaser.Physics.ARCADE);
		monsters.enableBody=true;

		//initialize monster's HP.
		monster.HP = 100;
		var monsterHealthBarPosition ={x:monster.body.x+10, y:monster.body.y+10};
		monster.healthbar = new HealthBar(this.game,monsterHealthBarPosition,"monster");
		//monsters should collide with boundaries of the game.
		monster.body.collideWorldBounds=true;
		monster.body.gravity.y = 500;
		monster.body.velocity.x = (Math.random()*(monster_vel_x-(-monster_vel_x))+(-monster_vel_x));
	}
}

function mobUpdate(){

	//keep track of time.
	timeElapsed = game.time.totalElapsedSeconds();	
	
	//each monster's direction and random speed.
	if(monsters.total>0){
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
			//don't let the monsters face one direction and move towards the other direction.
			else if(m.body.velocity.x > 0&&m.scale.x>0 || m.body.velocity.x < 0&&m.scale.x<0 ){
				m.scale.x *= -1;
			}
			if(m.hit == true){
				//setTarget(player,m);
				if(timeElapsed - followingTime > 4){
					m.hit = false;
				}
			}
			m.healthbar.setPosition(m.body.x+30,m.body.y+5);//healthbar always above monster sprites
		});
	}	
// if(this.monsters.total ==1){
	// 	//CREATE THE LAST MOB.
	// 	boss = bossMob.getFirstExists(false);
	// 	if(boss){
	//		bossCreate(boss);
	// 	}
	// }
		
	//BOSS UPDATE FUNCTION HERE.
	// if(bossAlive){
		// bossMobMoveAndAttack();
	// }
	killIfHit(monsters,bullets);//collision between bullet and monster.
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
			boom = booms.getFirstExists(false);
			if(boom){
				boom.reset(m.body.x,m.body.y);
				boom.animations.add('boom');
				boom.animations.play('boom',40,false);
				game.time.events.add(Phaser.Timer.SECOND * 0.2, killSprite, boom);
			}
			m.healthbar.setPercent(m.HP); //display health bar how much is left.
		}
	});
}

//this function handles when collision happens between bullet and monster.
function collisionHandler(monster,bullet){
	//monster's hit.
	monster.hit = true;
	followingTime = timeElapsed;
	sound = game.sound.play('monsters_hit_sound');
	var monsterHit = game.add.text(monster.body.x,monster.body.y-50,'-30HP');
		decorateText(monsterHit);
		monsterHit.fontSize = 15;
		//fade text after 3 seconds.
		this.game.add.tween(monsterHit).to({alpha: 0}, 
			Phaser.Timer.SECOND * 0.1, Phaser.Easing.Default, true, 800).onComplete.add(function () {
		           this.destroy();
		        }, monsterHit
		    );
	if(monster.HP<=0){
		var exp = game.add.text(player.body.x,player.body.y-50,'+30EXP');
		decorateText(exp);
		exp.fontSize = 15;
		//fade text after 3 seconds.
		this.game.add.tween(exp).to({alpha: 0}, 
			Phaser.Timer.SECOND * 0.1, Phaser.Easing.Default, true, 800).onComplete.add(function () {
		           this.destroy();
		        }, exp
		    );
		//player score up.
		player.score += 30;

		expBar.setPercentExp(player.score,player.expForLevelUp);
		//monster dead.
		sound = game.sound.play('monster_dead_sound');
		dropItems(monster.body.x,monster.body.y);
		//improve performance by disabling the body when dead. won't be called when checking collision.
		monster.enableBody=false;
		monster.kill();
		monster.healthbar.kill();
		this.monsters.remove(monster); //remove dead monsters from the array.

		//ADD this.bossMOb.total==0 IN THE PARAMETER AFTER bossMob is completely defined.
		if(this.monsters.total == 0){
			youWin();
		}
	}

	//bullet initial scale.x is positive.
	//monsters initial scale.x is positive.
	//monster hit from the back(left) when monster is moving towards the right. change direction(towards where the bullet came from).
	if(monster.scale.x < 0 && monster.body.touching.left || monster.scale.x >0 && monster.body.touching.right){
		chasePlayer(monster,player,'back');
	}

	//monster walking towards the right, hit from the right. hit from front
	else if(monster.scale.x < 0 && monster.body.touching.right|| monster.scale.x > 0 && monster.body.touching.left){
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
				sound = game.sound.play('player_hit_sound');
			}
		});
	}
}

//Called when monster and player collided. Handles collision between monster and player
function pm_collisionHandler(monster,player){
	//record the time when collision happened so we can keep track of time after collision.
	//player's HP drops when contacted by monster but there's time frame, so that the player is not hit every ms.
	if(lastCollisionTime==0||(timeElapsed-lastCollisionTime)>3){
		var hpStats = game.add.text(player.body.x,player.body.y-50,'-20 HP');
		decorateText(hpStats);
		hpStats.fontSize = 15;
		//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);

		//fade text after 3 seconds.
		this.game.add.tween(hpStats).to({alpha: 0}, 
			Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true, 1000).onComplete.add(function () {
		           this.destroy();
		        }, hpStats
		    );
		player.HP -= 20;
		lastCollisionTime = timeElapsed;
		myHealthBar.setPercent(player.HP);
	}
 	//player dead.
 	if(player.HP<=0){
 		gameSound.destroy();
 		gameOver();
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
	//REMOVE EVERYTHING.
	game.world.removeAll();
	monsters.removeAll();
	players.removeAll();
	bullets.removeAll();
	hpPotions.removeAll();
	platforms.removeAll();
	
	currentLevel = 1; //GO BACK TO INITIAL LEVEL

	gameOverSound = game.sound.play('gameover_music');
	//ADD A BACKGROUND HERE.

	//display replay button.
	var replayButton = game.add.button(500,game.world.height/2, 'emptybutton', replay, this, 0.3, 0.3, 0.5);
	var replayButtonText = game.add.text(replayButton.x+25,replayButton.y+75,"Play Again");
	decorateText(replayButtonText);
	replayButtonText.fontSize = 25;
	replayButton.scale.setTo(1.5,1.5);
	replayButtonText.fixedToCamera = true;
	replayButton.fixedToCamera = true;

	//display game over text.
	var msg = game.add.text(400,150,'Pay $1 to play again');
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
			monster.body.velocity.x -= -1;
		}
	}
	if(player.body.x < monster.body.x && monster.scale.x < 0){
	 	if(monster.body.velocity.x >0){
			monster.anchor.setTo(0.5,0);
			monster.scale.x *= -1;
			monster.body.velocity.x *= -1;
		}
	}
	//player is in front. keep going
	if(player.body.x > monster.body.x && monster.scale.x < 0){
		if(monster.body.velocity.x <0){
			monster.anchor.setTo(0.5,0);
			monster.body.velocity.x *= 1;
		}
	}
	if(player.body.x < monster.body.x && monster.scale.x > 0){
		if(monster.body.velocity.x >0){
			monster.anchor.setTo(0.5,0);
			monster.body.velocity.x *= 1;
		}
	}
}
function replay(){
	game.world.removeAll();
	gameSound.destroy();
	game.state.start('menu');
}
function nextLevel(){
	//check current level, then start the state accordingly.
	game.state.start('level'+currentLevel);
}
function youWin(){
	currentLevel++; //increase level.
	var replayButtonX = 500;
	var replayButtonY = game.world.height/2
	var nextLevelButtonX = replayButtonX + 400;
	var nextLevelButtonY = replayButtonY;

	var replayButton = game.add.button(replayButtonX,replayButtonY, 'emptybutton', replay, this, 0.3, 0.3, 0.5);
	var replayButtonText = game.add.text(replayButton.x+25,replayButton.y+75,"Main Menu");
	decorateText(replayButtonText);
	replayButtonText.fontSize = 25;
	replayButton.scale.setTo(1.5,1.5);
	replayButtonText.fixedToCamera = true;
	replayButton.fixedToCamera = true;

	var nextLevelButton = game.add.button(nextLevelButtonX,nextLevelButtonY, 'emptybutton', nextLevel, this, 0.3, 0.3, 0.5);
	var nextLevelButtonText = game.add.text(nextLevelButton.x+30,nextLevelButton.y+75,"Next Level");
	decorateText(nextLevelButtonText);
	nextLevelButtonText.fontSize = 25;
	nextLevelButton.scale.setTo(1.5,1.5);
	nextLevelButtonText.fixedToCamera = true;
	nextLevelButton.fixedToCamera = true;
	
	//display game over text.
	var msg = game.add.text(400,150,"YOU CAUGHT'EM ALL!");
	decorateText(msg)
	msg.fixedToCamera=true;
}

function killSprite(){
	this.kill();
}

function reviveMonster(){
	this.reset(Math.random()*((player.body.x+750)-650)+650,Math.random()*(300-100)+100);
}

function bossCreate(boss){
	bossAlive = true;
	boss.reset(Math.random()*((gamesizeX)-0)+0,Math.random()*(300-100)+100,'monster'+Math.floor((Math.random() * 2) + 1));
	boss.animations.add('walk');
	boss.animations.play('walk');

	//FLYING OR OTHER ANIMATIONS SHOULD BE ADDED HERE, TOO.
}
//BOSS MOB IS ABLE TO ATTACK THE PLAYER. THIS FUNCTION INCLUDES BOSS MOVING.
function bossMobMoveAndAttack(){
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
		//don't let the monsters face one direction and move towards the other direction.
		else if(m.body.velocity.x > 0&&m.scale.x>0 || m.body.velocity.x < 0&&m.scale.x<0 ){
			m.scale.x *= -1;
		}
		if(m.hit == true){
			//setTarget(player,m);
			if(timeElapsed - followingTime > 4){
				m.hit = false;
			}
		}
}