

//time in between each shot.
var shootTime = 20;

//group of bullts.
var bullets;
var bullet;
var boom;

//make special attack for player. 
var specialAttackTime = 100;

function createBullets(){
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(5,'bullet');
	//dest function will be called when bullets go out of bounds.
	//callAll function will pass in the child in bullets group as the input
	//for dest function.
	bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', dest);
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
	bullets.setAll('outOfBoundsKill',true);
	bullets.setAll('checkWorldBounds',true);
	shootTime++;
}
function fire(){
	bullet = bullets.getFirstExists(false); //get the first inactive bullet for reuse.
	if(bullet){
		bullet.reset(player.body.x,player.body.y+30);
		bullet.animations.add("shoot");
		bullet.animations.play("shoot",40,true);
		//bullets change direction according to the player's direction.
		if(player.scale.x<0){
			bullet.scale.x *= -1;
			bullet.body.velocity.x = -500;
		}
		//if player is facing to the right.
		else{
			bullet.body.velocity.x = 500;
		}
	}
}
//this function is called when bullets go out of bounds.
function dest(bullet){
	//"this" is the bullet.
	bullet.kill();
}
