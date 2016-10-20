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

	/*JUMP ANIMATION HERE.
	*
	*/

	//ADD PHYSICS TO PLAYER
	game.physics.enable(player,Phaser.Physics.ARCADE);
	players.enableBody=true;

	//create health bar.
	var hpBarPosition ={x:player.body.x+10, y:player.body.y+5};
	myHealthBar = new HealthBar(this.game,hpBarPosition);

	//ADD WALLS TO THE SCREEN SO THE PLAYER DOESN'T GO OUT OF BOUNDS.
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

	//LEFT ARROW KEY PRESSED
	if(cursor.left.isDown){
		player.body.velocity.x = -750;
		player.animations.play('walk',100,false);
		//IF PLAYER IS FACING TO THE RIGHT, TURN AROUND AND KEEP GOING.
		if(player.scale.x >0){
			player.anchor.setTo(0.5,0);
			player.scale.x *=-1;
		}
	}
	if(cursor.right.isDown){
		player.body.velocity.x = 750;
		player.animations.play('walk',100,false);

		if(player.scale.x<0){
			player.anchor.setTo(0.5,0);
			player.scale.x *=-1;
		}
	}

	//JUMP
	if(cursor.up.isDown&&(player.body.touching.down||player.body.onFloor())){
		player.body.velocity.y = -650;
	}

	//gotta work on this. do something when down is pressed.
	else if(cursor.down.isDown){
		//check player's on a platform. if not don't do anything if yes, do something.
		platforms.forEach(function(p){
			if(p.body.touching.up){
				console.log("cursor is down loop");
				p.body.checkCollision.up = false;
			}
			p.body.checkCollision.up = true;
		});
	}
	//level up!
	if(player.score == expForLevelUp){
		player.lvl +=1;
		//increase exp for levelup for next level.
		expForLevelUp*=1.5; 
	}
	//health bar should stay with the player.
	this.myHealthBar.setPosition(player.body.x+30,player.body.y+5);
}
 // function updateScore(){

 // }