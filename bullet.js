

//time in between each shot.
var shootTime = 20;

//group of bullts.
var bullets;
var bullet;
var boom;

//make special attack for player. or you need to have MP, but deal with time for now.
var specialAttackTime = 100;

function createBullets(){
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	bullets.createMultiple(15,'bullet');//default exists = false.

	//dest function will be called when bullets go out of bounds.
	//callAll function will pass in the child in bullets group as the input
	//for dest function.
	bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', destBounds);
}

function updateBullets(){
	// create and shoot 
	if(game.input.keyboard.isDown(Phaser.KeyCode.A) && shootTime%20==0){
		//don't allow shooting every ms.
		//if(shootTime%20==0){
		fire();
		//increment shoottime.
		//shootTime++;
	}
	if(game.input.keyboard.isDown(Phaser.KeyCode.S)&&specialAttackTime%100==0){
		// console.log("s pressed");
		specialAttack();
	}
	bullets.setAll('outOfBoundsKill',true);
	bullets.setAll('checkWorldBounds',true);
	shootTime++;
	specialAttackTime ++;
}
function fire(){
	bullet = bullets.getFirstExists(false); //get the first inactive bullet for reuse.
	if(bullet){
		bullet.reset(player.body.x,player.body.y+30);
		bullet.body.gravity.y = 0;
		bullet.body.bounce.x = 0;
		bullet.body.collideWorldBounds=false;
		bullet.animations.add("shoot");
		bullet.animations.play("shoot",40,true);
		sound = game.sound.play('shoot_sound');
		//bullets change direction according to the player's direction.
		if(player.scale.x<0){
			bullet.scale.x *= -1;
			bullet.body.velocity.x = -700;
		}
		//if player is facing to the right.
		else{
			bullet.body.velocity.x = 700;
		}
	}
}
//raining pokeballs.
function specialAttack(){
	//get all the non active bullets and rain them!!
	bullets.forEach(function(b){
		bullet = bullets.getFirstExists(false); //get the first inactive bullet for reuse.
		if(bullet){
			bullet.reset(Math.random()*((gamesizeX)-50)+50, 0);
			bullet.animations.add("shoot");
			bullet.animations.play("shoot",40,true);
			bullet.body.gravity.y = 1200;
			bullet.body.collideWorldBounds=true;
			bullet.body.bounce.y = 0.5;
			bullet.body.bounce.x = 0.3;
			game.time.events.add(Phaser.Timer.SECOND * 1.5, dest, bullet);
			//bullets change direction according to the player's direction.
		}
	});
}
//this function is called when bullets go out of bounds.
function dest(){
	this.kill();
}

function destBounds(bullet){
	bullet.kill();
}