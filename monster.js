//monsters class.

var monsters;
var collisionTime = 20;
var displayText;
var numMonsterKilled =0;

var monster = {
	HP: 100,
	Name:""
};

//CREATE Mob. CALLED IN INITIAL.JS.CREATE() create mobs in a for loop or something.. 
 function createMob(){
	monsters = game.add.group();

	displayText = game.add.text(80,80,'');

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
 	
 	//game.physics.arcade.collide(monsters, bullets);  //this line is unnecessary because we allow collision between monsters and bullets in processHandler function.

 	//defined below.
 	killIfHit(monsters,bullets);

 	collisionPlayerMonster(players,monsters);

 	// updateNumMonsterKilled();
 }

//this function checks collision between monster and bullet and if collision happens, kills both of them. called in updateMob() function.
 function killIfHit(monsters, bullets){
 	monsters.forEach(function(m){
 		if (game.physics.arcade.collide(m, bullets, collisionHandler, processHandler, this)){
			console.log("BOOM");
			m.HP -= 30;
		}
 	});
 }

 function collisionHandler(monster,bullet){ 	
 	if(monster.HP<0){
 		//monster dead.
 		monster.kill();
 		numMonsterKilled++;
 		//player score up.
 		player.score++;
 	}

 	//monsters need to keep going in the same direction even though they're hit.
 	if(monster.scale.x > 0 && bullet.scale.x<0){
 		monster.anchor.setTo(0.5,0.5);
 		monster.scale.x *= -1;
 		monster.body.velocity.x *=-1;
 	} 

 	//if player hits the monsters from the back. Monsters turn around and go towards the player.
 	else if(monster.scale.x <0 && bullet.scale.x>0){
 		monster.anchor.setTo(0.5,0.5);
 		monster.scale.x *= -1;
 		monster.body.velocity.x *=-1;
 	}
 	else{
 		monster.body.velocity.x *=-1;
 	} 		
 	bullet.kill();
 	console.log("Got Em");
 }

 //processHandler needs to return true for the collision to happen.
 function processHandler(monster,bullet){
 	return true;
 }

//when monsters hit player, player loses HP.
//gotta work on this function.
 function collisionPlayerMonster(players,monsters){
 	monsters.forEach(function(m){
 		if (game.physics.arcade.collide(m, players, pm_collisionHandler, pm_processHandler, this)){
		}
 	});
 }

 function pm_collisionHandler(monster,player){
 	game.time.events.loop(Phaser.Timer.SECOND*10, updateCollisionTime,this);
 		//player's HP drops when contacted by monster but there's time frame, so that the player is not hit every ms.
	 	if(collisionTime%10==0){
	 		console.log("OUCH");
	 		player.HP -= 30;
	 	}

	 	//player dead.
	 	if(player.HP<=0){
	 		player.kill();
	 		gameOver();
	 	}

	 	//if player hit when facing the right direction, just push back.
	 	if(player.scale.x >0){
	 		player.body.x -= 50;
	 	}

	 	//if player hit when facing the left, also push back but to the right.
	 	if(player.scale.x <0){
	 		player.body.x += 50;
	 	}
 	// player.body.checkCollision.left = false;
 	// player.body.checkCollision.right = false;
 }
 function pm_processHandler(){
 	return true;
 }
 //callback function for player and monster collision.
 function updateCollisionTime(){
 	collisionTime++;
 }


 function gameOver(){
 	var msg = game.add.text(80,80,'Game Over :(');
 	msg.font = 'Revalia';
    msg.fontSize = 60;
    msg.stroke = '#000000';
    msg.strokeThickness = 2;
    msg.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    var replayButton = game.add.button(20 ,500, 'emptybutton', replay, this, 0.3, 0.3, 0.5);
    var replayButtonText = game.add.text(replayButton.x+25,replayButton.y+49,"Play Again");
    decorateText(replayButtonText);
    replayButtonText.fontSize = 22;
 }

 function replay(){
 	game.state.start('menu');
 }