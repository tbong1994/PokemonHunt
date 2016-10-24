//items class. 
//dropped when monsters are killed.
//very similar to the implementation of bullets.

var hpPotions; //pokeball will be HP potions.


//parameter takes the monster that dies for its x y coordinates.
function createItems(){
	hpPotions = game.add.group();
	//enable physics for items.
	//game.physics.enable(hpPotions,Phaser.Physics.ARCADE);
	hpPotions.physicsBodyType = Phaser.Physics.ARCADE;
	hpPotions.enableBody=true; 
	
	hpPotions.createMultiple(5,'potion');
	hpPotions.scale.setTo(0.3,0.3);
	
	//each potion's property.
	hpPotions.forEach(function(hp){
		hp.body.gravity.y = 3000;
		hp.body.collideWorldBounds = true;
		hp.body.checkCollision.up = false;
		hp.body.checkCollision.down =false;
	});
	
}
//similar to bullets. This function is called in monster.js, when monster dies.
//parameter takes in x and y coords of the monster just died.

function dropItems(mx, my){						//this function doesn't work yet... I can't find the reason why!!
	potion = hpPotions.getFirstExists(false);
	if(potion){
		potion.reset(mx,my);
	}
}