//items class. 
//dropped when monsters are killed.
//very similar to the implementation of bullets.

var hpPotions; //pokeball will be HP potions.


//parameter takes the monster that dies for its x y coordinates.
function createItems(){

	//HP POTIONS
	hpPotions = game.add.group();
	hpPotions.physicsBodyType = Phaser.Physics.ARCADE;
	hpPotions.enableBody=true;
	hpPotions.createMultiple(5,'potion1');
	hpPotions.scale.setTo(0.3,0.3);
	//each potion's property.
	hpPotions.forEach(function(hp){
		hp.body.gravity.y = 3000;
		hp.body.collideWorldBounds = true;
		hp.body.checkCollision.up = false;
		hp.body.checkCollision.down =false;
	});
	
	//MP POTIONS
	mpPotions = game.add.group();
	mpPotions.physicsBodyType = Phaser.Physics.ARCADE;
	mpPotions.enableBody=true; 
	mpPotions.createMultiple(5,'potion2');
	mpPotions.scale.setTo(0.15,0.15);

	mpPotions.forEach(function(mp){
		mp.body.gravity.y = 3000;
		mp.body.collideWorldBounds = true;
		mp.body.checkCollision.up = false;
		mp.body.checkCollision.down =false;
	});
	
}
//similar to bullets. This function is called in monster.js, when monster dies.
//parameter takes in x and y coords of the monster just died.

function dropItems(mx, my){						//this function doesn't work yet... I can't find the reason why!!
	var random = Math.floor((Math.random() * 10) + 1); //random between 1 and 10
	if(random <=5){
		potion = hpPotions.getFirstExists(false);
		if(potion){
			potion.reset(mx,my);
		}
	}else{
		mpPotion = mpPotions.getFirstExists(false);
		if(mpPotion){
			mpPotion.reset(mx,my);
		}
	}
}