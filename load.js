//load.js

//loading state. called by boot. As the name mentions it, add all the assets in this file.
//then go to menu state.
var loadState = {
	//Phaser defined function preload() called once at start.
	preload:function() {
		var loadingLabel = game.add.text(80,150,'loading...',{font:'30px Courier', fill: '#ffffff'});

		//load all assets here.
		game.load.image('background', 'assets/background/background.jpg');

		game.load.image('platform1', 'assets/platform/ice-platform.png');
		game.load.image('platform2', 'assets/platform/platform2.png');
		game.load.image('potion', 'assets/items/pokeball1.png');

	    game.load.spritesheet('alienhunter1', 'assets/player/alienhunter.png',93,155);
	    game.load.spritesheet('alienhunter2', 'assets/player/alienhunter2.png',93,157);
	    game.load.spritesheet('alienhunter3', 'assets/player/alienhunter3.png',103,158);
	    
	    //load sprite sheets for pokemons here.
	    //spritesheet('variablename',locationoffile,framex,framey,numberofframesfromfile);
	    game.load.spritesheet('monster1','assets/Pokemons/lapras-1.png',105,99);
	    game.load.spritesheet('monster2','assets/Pokemons/squirtle3-1.png',74,70);

	    game.load.spritesheet('bullet', 'assets/bullet/pokeball.png',250/5,253/6,25); //25 images only
	    game.load.spritesheet('boom','assets/bullet/blowup.png',512/4,512/4);

	    //font 
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //button
        game.load.spritesheet('startbutton', 'assets/button/startbutton.png', 193, 71);
        game.load.spritesheet('emptybutton', 'assets/button/emptybutton.png', 10, 60);
	},

	create: function(){
		//call menu.
		game.state.start('menu');
	}
};