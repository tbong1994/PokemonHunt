//player class

var players;
var userCharacter;
var myHealthBar;
var myMpBar;
var expBar;
var expBarPosition;
var lastTeleportTime = 0;
var player={
	name:"",
	HP:100,
	MP:100,
	lvl:0,
	score:0,
	expForLevelUp:100,
	healthBar:myHealthBar,
	mpBar:myMpBar
};

//CREATE PLAYER. CALLED IN INITIAL.JS.CREATE()
//later on, you give user a choice which character they want to choose.
function createPlayer(x,y,playerFromPrevLvl){
	players = game.add.group();

	//PLAYER CREATION. USERCHARACTER IS ASSIGNED IN MENU.JS WHEN CHARACTER BUTTON IS CLICKED.
	player = players.create(x,y,userCharacter);
	player.name = charName;
	playerAttackAnims = game.add.group();
	playerAttackAnims.createMultiple(1,'playerattack'+player.name[1]); //player animations

	//ADD PHYSICS TO PLAYER
	game.physics.enable(player,Phaser.Physics.ARCADE);
	players.enableBody=true;
	
	chIdOverSprite = this.game.add.text(player.body.x,player.body.y-400,player.name); //character name over player sprite.
	decorateText(chIdOverSprite);
	chIdOverSprite.fontSize = 20;
	chIdOverSprite.setScaleMinMax(1,1,1,1);//don't flip the character name display by setting the x scale only go down to 1.
	player.addChild(chIdOverSprite);

	//FIRST LEVEL...INITIALIZE EVERYTHING.
	if(currentLevel ==1){
		player.HP = 100;
		player.MP =100;
		player.lvl = 0;
		player.score =0;
		player.expForLevelUp = 100;
	}
	//OTHER LEVELS.
	else{
		console.log(playerFromPrevLvl);
		player.HP = playerFromPrevLvl.HP;
		player.MP = playerFromPrevLvl.MP;
		player.lvl = playerFromPrevLvl.lvl;
		player.score = playerFromPrevLvl.score;
		player.expForLevelUp = playerFromPrevLvl.expForLevelUp;
	}
	//create health bar.
	var hpBarPosition ={x:player.body.x+10, y:player.body.y+10};
	myHealthBar = new HealthBar(this.game,hpBarPosition,'healthBar');
	myHealthBar.setPercent(player.HP);

	var mpBarPosition ={x:player.body.x+10, y:player.body.y-5};
	myMpBar = new HealthBar(this.game,mpBarPosition,'mpBar');
	myMpBar.setPercent(player.MP);

	expBarPositionX = window.innerWidth/2;
	expBarPositionY = 500;
	expBarPosition ={x:expBarPositionX, y:expBarPositionY};
	expBar = new HealthBar(this.game,expBarPosition,'expBar'); //from the healthbar class, I've managed to set this fixed to camera.
	expBar.setPosition(expBarPositionX,expBarPositionY);
	// expBar.fixedToCamera = true;
	expBar.setPercentExp(player.score,player.expForLevelUp);//bartype is optional for expbar.
	
	expBarText = this.game.add.text(0,470,"EXP: ");
	decorateText(expBarText);
	expBarText.fontSize = 15;
	expBarText.fixedToCamera = true;

	player.body.collideWorldBounds = true;

	//GRAVITY AND BOUNCE OF PLAYER.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 1100;

	//WALKING ANIMATION.
	player.animations.add('walk');
	player.scale.setTo(.7,.7);
	
	
	//JUMP ANIMATION ARRAY. REUSE SPRITES WHENEVER PLAYER JUMPS.
	jumps = game.add.group();
	jumps.createMultiple(2,'jumpDust');

	//CONSUMING ITEM ANIMATION.
	hpups = game.add.group();
	hpups.createMultiple(2,'hpup');
}

function playerReset(x,y){
	//CALLED WHEN NEW LEVEL STARTS.
	this.player.reset(x,y);

}

function playerUpdate(){
	//INITIAL VELOCITY
	player.body.velocity.x = 0;

	//SET COLLISION BEFORE INPUT.
	game.physics.arcade.collide(players, platforms);
	game.physics.arcade.collide(players, hpPotions);
	game.physics.arcade.collide(players, mpPotions);
	//LEFT ARROW KEY PRESSED
	if(cursor.left.isDown){
		player.body.velocity.x = -650;
		player.animations.play('walk',150,false);
		//IF PLAYER IS FACING TO THE RIGHT, TURN AROUND AND KEEP GOING.
		if(player.scale.x >0){
			player.anchor.setTo(0.5,0);
			player.scale.x *=-1;
		}
	}
	if(cursor.right.isDown){
		player.body.velocity.x = 650;
		player.animations.play('walk',100,false);

		if(player.scale.x<0){
			player.anchor.setTo(0.5,0);
			player.scale.x *=-1;
		}
	}

	//JUMP
	if(cursor.up.isDown&&(player.body.touching.down||player.body.onFloor())){
		var jump = jumps.getFirstExists(false);
		if(jump){
			jump.reset(player.body.x-50,player.body.y-50);
			jump.animations.add('jumpDust');
			jump.animations.play('jumpDust',150,false);
			sound = game.sound.play('jump_sound');

			//kill sprite so you can reuse it.
			game.time.events.add(Phaser.Timer.SECOND * 0.1, killSprite, jump);
		}
		player.body.velocity.y = -650;
	}
	// if(game.input.keyboard.isDown(Phaser.KeyCode.A)){
	// 	playerAttackAnims.forEach(function(a){
	// 	playerAttackAnim = playerAttackAnims.getFirstExists(false); //get the first inactive bullet for reuse.
	// 	if(playerAttackAnim){
	// 		//decrease scale of the animation
	// 		playerAttackAnim.reset(player.body.x,player.body.y);
	// 		playerAttackAnim.animations.add("attack");
	// 		playerAttackAnim.animations.play("attack",20,true);
	// 		game.time.events.add(Phaser.Timer.SECOND * 0.5, dest, playerAttackAnim);
	// 		//bullets change direction according to the player's direction.
	// 	}
	// });
	// }
	if(game.input.keyboard.isDown(Phaser.KeyCode.W)&&player.MP>=10&&(timeElapsed-lastTeleportTime)>2){ //teleport
		var mpDown = game.add.text(player.body.x,player.body.y-50,'-10MP');
		decorateText(mpDown);
		mpDown.fontSize = 15;
		fadeText(mpDown);
		teleport();
		lastTeleportTime = timeElapsed;
	}
	if(game.input.keyboard.isDown(Phaser.KeyCode.W)&&player.MP<10&&(timeElapsed-lastNotEnoughMpDisplayTime)>1.5){//teleport not enough mp
		var notEnoughMp = game.add.text(player.body.x,player.body.y-50,'Not Enough MP');
		decorateText(notEnoughMp);
		notEnoughMp.fontSize = 15;
		//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);
		fadeText(notEnoughMp);
		lastNotEnoughMpDisplayTime = timeElapsed;
	}

	//gotta work on this. do something when down is pressed.


	//level up!
	if(player.score >= player.expForLevelUp){
		player.lvl +=1;
		//increase exp for levelup for next level.
		player.expForLevelUp*=1.5; 
		player.score = 0;
		var notEnoughMp = game.add.text(player.body.x,player.body.y - 200,'LVL UP!');
		decorateText(notEnoughMp);
		notEnoughMp.fontSize = 100;
		//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);
		fadeText(notEnoughMp);
		expBar.setPercent(player.score,player.expForLevelUp);
	}
	//health bar should stay with the player.
	this.myHealthBar.setPosition(player.body.x+30,player.body.y+5);
	this.myMpBar.setPosition(player.body.x+30,player.body.y-5);
	takeItems(hpPotions,players);
	takeItems(mpPotions,players);
}
 // function updateScore(){

 // }
function teleport(){
	console.log(player.MP);
	if(player.scale.x>0){ //facing right
		if((gamesizeX - player.body.x) > 300){
			player.body.x += 200;
		}
		else{
			player.body.x += gamesizeX - player.body.x + 50;
		}
		player.MP -= 50;
			
		}
	else{ //facing left
		if(player.body.x > 300){
			player.body.x -= 300;
		}else{
			player.body.x -= player.body.x + 50;
		}
		player.MP -= 50;
	}
	player.MP -= 10;
	myMpBar.setPercent(player.MP);
}
function takeItems(Potions, players){
	Potions.forEach(function(potion){
		/*detect collision between object1 and object 2. when collided, callback function is called.
		*@param: object1,object2, callBackFunction, processCallback, callBackContext.
		*processCallback has to return either true or false. when true, colliding between ob1 and ob2
		*is acknowledged and calls the call back function. if false, the collision is ignored and fallback function also is ignored.
		*/

		//DETERMINE MP OR HP POTION FIRST. potion1 is hp potion.
		if(potion.key=='potion1'){
			if (game.physics.arcade.collide(potion, players, upPlayerHP,processHandler,this)){
				sound = game.sound.play('item_consumed_sound');
				potion.kill(); //reuse items, too!
			}
		}
		//MP
		else{
			if (game.physics.arcade.collide(potion, players, upPlayerMP,processHandler,this)){
				sound = game.sound.play('item_consumed_sound');
				potion.kill(); //reuse items, too!
			}
		}
	});
}

function upPlayerHP(potion,player){
	if(player.HP <100){
		var hpStats = game.add.text(player.body.x,player.body.y-50,'+20 HP');
		decorateText(hpStats);
		hpStats.fontSize = 15;
		//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);

		//fade text after 3 seconds.
		fadeText(hpStats);

		//CONSUMING ITEM ANIMATION.
		var hpup = hpups.getFirstExists(false);
		if(hpup){
			hpup.reset(player.body.x-30,player.body.y-30);
			hpup.animations.add('hpup');
			hpup.animations.play('hpup',50,false);
			//kill sprite so you can reuse it.
			game.time.events.add(Phaser.Timer.SECOND * 0.2, killSprite, hpup);
		}
		player.HP += 20;
		myHealthBar.setPercent(player.HP);
	}
}
function upPlayerMP(potion,player){
	if(player.MP <100){
		var mpStats = game.add.text(player.body.x,player.body.y-50,'+20 MP');
		decorateText(mpStats);
		mpStats.fontSize = 15;
		//game.time.events.add(Phaser.Timer.SECOND * 3, killText, hpStats);

		fadeText(mpStats);

		//CONSUMING ITEM ANIMATION.
		var mpup = hpups.getFirstExists(false);
		if(mpup){
			mpup.reset(player.body.x-30,player.body.y-30);
			mpup.animations.add('hpup');
			mpup.animations.play('hpup',50,false);
			//kill sprite so you can reuse it.
			game.time.events.add(Phaser.Timer.SECOND * 0.5, killSprite, mpup);
		}
		player.MP += 20;
		myMpBar.setPercent(player.MP);
	}
}
function processHandler(potion,player){
	return true;
}
function killSprite(){
	this.kill();
}
function fadeText(str){
	//fade text after a few seconds.
	this.game.add.tween(str).to({alpha: 0}, 
		Phaser.Timer.SECOND * 0.1, Phaser.Easing.Default, true, 800).onComplete.add(function () {
	           this.destroy();
	        }, str
	    );
}