//items class. 
//dropped when monsters are killed.
//very similar to the implementation of bullets.

var hpPotions; //pokeball will be HP potions.


//parameter takes the monster that dies for its x y coordinates.
function createItems(){
	hpPotions = game.add.group();
	//enable physics for items.
	game.physics.enable(hpPotions,Phaser.Physics.ARCADE);
	hpPotions.enableBody=true; 
	
	hpPotions.createMultiple(5,'potion');
	hpPotions.scale.setTo(0.3,0.3);
	
	//each potion's property.
	
}

function updateItems(){
	//takeItems();
	hpPotions.forEach(function(potion){
		potion.body.gravity.y = 2000;
		//for each platform created, allow collision on their top side. so that players can land on it.
		// onePotion.body.checkCollision.up = false;
		//potion.body.checkCollision.down = true;
		// onePotion.body.checkCollision.left = false;
		// onePotion.body.checkCollision.right = false;
		//onePotion.body.immovable = true;
		if(Math.abs(player.body.x - potion.body.x)<=10 && Math.abs(player.body.x - potion.body.x)>=0 &&
			Math.abs(player.body.y - potion.body.y)<=10 &&Math.abs(player.body.y - potion.body.y)>=0){
			potion.kill(); //reuse items, too!
			player.HP += 20;
			myHealthBar.setPercent(player.HP);
		}
	});
}
// function takeItems(){
// 	hpPotions.forEach(function(h){
// 		if(Math.abs(player.body.x - h.body.x)<=10 && Math.abs(player.body.x - h.body.x)>=0 &&
// 			Math.abs(player.body.y - h.body.y)<=10 &&Math.abs(player.body.y - h.body.y)>=0){
// 			h.kill(); //reuse items, too!
// 			player.HP += 20;
// 			myHealthBar.setPercent(player.HP);
// 		}
// 	});
// }

//similar to bullets. This function is called in monster.js, when monster dies.
//parameter takes in x and y coords of the monster just died.
function dropItems(mx, my){
	potion = hpPotions.getFirstExists(false);
	if(potion){
		potion.reset(800,300);
	}
}