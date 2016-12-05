

//time in between each shot.
var shootTime = 20;

var lastSpecialAttackTime = 0;
var lastNotEnoughMpDisplayTime = 0;
//group of bullts.
var bullets;
var bullet;
var boom;

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
		fire();
	}
	//timeElapsed is defined in monster.js
	if(game.input.keyboard.isDown(Phaser.KeyCode.S)&&player.MP>=30&&(timeElapsed-lastSpecialAttackTime)>=2.5){
		specialAttack();
		lastSpecialAttackTime = timeElapsed;
		console.log(player.MP);
	}
	if(game.input.keyboard.isDown(Phaser.KeyCode.S)&&player.MP<30&&(timeElapsed-lastNotEnoughMpDisplayTime)>2){
		var notEnoughMp = game.add.text(player.body.x,player.body.y-50,'Not Enough MP');
		decorateText(notEnoughMp);
		notEnoughMp.fontSize = 15;
		//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);

		//fade text after 3 seconds.
		this.game.add.tween(notEnoughMp).to({alpha: 0}, 
			Phaser.Timer.SECOND * 0.1, Phaser.Easing.Default, true, 800).onComplete.add(function () {
		           this.destroy();
		        }, notEnoughMp
		    );
		lastNotEnoughMpDisplayTime = timeElapsed;
	}
	bullets.setAll('outOfBoundsKill',true);
	bullets.setAll('checkWorldBounds',true);
	shootTime++;
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
	var mpStats = game.add.text(player.body.x,player.body.y-50,'-20 MP');
	decorateText(mpStats);
	mpStats.fontSize = 15;
	//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);

	//fade text after 3 seconds.
	this.game.add.tween(mpStats).to({alpha: 0}, 
		Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true, 1000).onComplete.add(function () {
	           this.destroy();
	        }, mpStats
	    );
	player.MP -=30;
	myMpBar.setPercent(player.MP);
	//get all the non active bullets and rain them!!
	bullets.forEach(function(b){
		bullet = bullets.getFirstExists(false); //get the first inactive bullet for reuse.
		if(bullet){
			bullet.reset(Math.random()*((gamesizeX)+10), 0);
			bullet.animations.add("shoot");
			bullet.animations.play("shoot",40,true);
			bullet.body.gravity.y = 1200;
			bullet.body.collideWorldBounds=true;
			bullet.body.bounce.y = 0.5;
			bullet.body.bounce.x = 0.3;
			game.time.events.add(Phaser.Timer.SECOND * 2, dest, bullet);
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