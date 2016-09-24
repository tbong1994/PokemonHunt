

//time in between each shot.
var shootTime = 20;

//group of bullts.
var bullets;
var bullet;
function createBullets(){
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
}

function updateBullets(){
	// create and shoot 
	if(game.input.keyboard.isDown(Phaser.KeyCode.A)){
		//don't allow shooting every ms.
		if(shootTime%20==0){
			bullet = bullets.create(player.body.x,player.body.y+50,'bullet');
			bullet.scale.setTo(0.5,0.5);
			//bullets change direction according to the player's direction.
			if(player.scale.x<0){
				bullet.scale.x *= -1;
				bullet.body.velocity.x = -300;
			}
			//if player is facing to the right.
			else{
				bullet.body.velocity.x = 300;
			}
		}

		//increment shoottime.
		shootTime++;
	}
	bullets.setAll('outOfBoundsKill',true);
	bullets.setAll('checkWorldBounds',true);

	//after some ms, bullets are gone if haven't hit the monsters.
	bullets.forEach(function(p){
		game.time.events.add(Phaser.Timer.SECOND * 3, dest, p);
	});
}
//this function is for time events argument.
function dest(){
	this.kill();
}