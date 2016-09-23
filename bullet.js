

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
				bullet.body.velocity.x = -60;
			}
			//if player is facing to the right.
			else{
				bullet.body.velocity.x = 60;
			}
		}
		shootTime++;
	}

	bullets.setAll('outOfBoundsKill',true);
	bullets.setAll('checkWorldBounds',true);
}