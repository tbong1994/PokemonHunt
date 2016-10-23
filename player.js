//player class

var players;
var userCharacter;
var expForLevelUp;
var myHealthBar;
var player;
var player={
	name:"",
	HP:100,
	lvl:0,
	score:0,
};

//CREATE PLAYER. CALLED IN INITIAL.JS.CREATE()
//later on, you give user a choice which character they want to choose.
function createPlayer(x,y){
	players = game.add.group();

	//PLAYER CREATION. USERCHARACTER IS ASSIGNED IN MENU.JS WHEN CHARACTER BUTTON IS CLICKED.
	player = players.create(x,y,userCharacter);
	player.name = charName
	player.HP = 100;
	player.lvl = 0;
	player.score =0;
	expForLevelUp = 100;

	//WALKING ANIMATION.
	player.animations.add('walk');
	player.scale.setTo(.7,.7);
	// player.animations.add('jumpDust');
	// player.animations.add('hpup');
	/*JUMP ANIMATION HERE.
	*
	*/

	//ADD PHYSICS TO PLAYER
	game.physics.enable(player,Phaser.Physics.ARCADE);
	players.enableBody=true;

	//create health bar.
	var hpBarPosition ={x:player.body.x+10, y:player.body.y+10};
	myHealthBar = new HealthBar(this.game,hpBarPosition);
	chIdOverSprite = this.game.add.text(player.body.x,player.body.y-400,player.name); //character name over player sprite.
	decorateText(chIdOverSprite);
	chIdOverSprite.fontSize = 20;
	chIdOverSprite.setScaleMinMax(1,1,1,1);//don't flip the character name display by setting the x scale only go down to 1.
	player.addChild(chIdOverSprite);

	player.body.collideWorldBounds = true;

	//GRAVITY AND BOUNCE OF PLAYER.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 900;
}

function playerUpdate(){

	//INITIAL VELOCITY
	player.body.velocity.x = 0;

	//SET COLLISION BEFORE INPUT.
	game.physics.arcade.collide(players, platforms);
	game.physics.arcade.collide(players, hpPotions);
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
		player.body.velocity.y = -650;
		jumpDust = game.add.sprite(player.body.x-30, player.body.y-20,'jumpDust');
		jumpDust.animations.add('jumpDust');
		jumpDust.animations.play('jumpDust',100,false);
	}

	//gotta work on this. do something when down is pressed.


	//level up!
	if(player.score == expForLevelUp){
		player.lvl +=1;
		//increase exp for levelup for next level.
		expForLevelUp*=1.5; 
	}
	//health bar should stay with the player.
	this.myHealthBar.setPosition(player.body.x+30,player.body.y+5);
	takeItems(hpPotions,players);

}
 // function updateScore(){

 // }

function takeItems(hpPotions, players){
	hpPotions.forEach(function(potion){
		/*detect collision between object1 and object 2. when collided, callback function is called.
		*@param: object1,object2, callBackFunction, processCallback, callBackContext.
		*processCallback has to return either true or false. when true, colliding between ob1 and ob2
		*is acknowledged and calls the call back function. if false, the collision is ignored and fallback function also is ignored.
		*/
		if (game.physics.arcade.collide(potion, players, upPlayerHP,processHandler,this)){
			console.log("display +20 HP");
			potion.kill(); //reuse items, too!
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
		this.game.add.tween(hpStats).to({alpha: 0}, 
			Phaser.Timer.SECOND * 3, Phaser.Easing.Default, true, 3000).onComplete.add(function () {
		           this.destroy();
		        }, hpStats
		    );
		hpup = game.add.sprite(player.body.x,player.body.y,'hpup'); //creating this everytime may affect performance.
		hpup.animations.add('hpup');
		hpup.animations.play('hpup',50,false);
		player.HP += 20;
		myHealthBar.setPercent(player.HP);
	}
}
function processHandler(potion,player){
	return true;
}
function killText(){
	this.destroy();
}