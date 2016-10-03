//load.js

//loading state. called by boot. As the name mentions it, add all the assets in this file.
//then go to menu state.
var loadState = {

	//Phaser defined function preload() called once at start.
	preload:function() {
		var loadingLabel = game.add.text(80,150,'loading...',{font:'30px Courier', fill: '#ffffff'});

		//load all assets here.
		game.load.image('background', 'assets/background/background.jpg');

		game.load.image('platform', 'assets/platform/platform2.png');
		game.load.image('platform', 'assets/platform/ice-platform.png');

	    game.load.image('wizard', 'assets/player/wizard.png');
	    game.load.image('berserker', 'assets/player/berserker.png');
	    game.load.image('bowman', 'assets/player/bowman.png');
	    
	    //load sprite sheets for pokemons here.
	    //spritesheet('variablename',locationoffile,framex,framey,numberofframesfromfile);
	    game.load.spritesheet('mob','assets/Pokemons/lighchu.png',30,45,5);
	    game.load.image('bullet', 'assets/bullet/bullet0.png');

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