//load.js

//loading state. called by boot. As the name mentions it, add all the assets in this file.
//then go to menu state.
var loadState = {

	//Phaser defined function preload() called once at start.
	preload:function() {
		var loadingLabel = game.add.text(80,150,'loading...',{font:'30px Courier', fill: '#ffffff'});

		//load all assets here.
		game.load.image('background', 'assets/background.jpg');

		game.load.image('platform', 'assets/platform2.png');
	           
	    game.load.image('wizard', 'assets/wizard.png');
	    
	    game.load.image('mob0', 'assets/namoo.png');
	    game.load.image('mob1', 'assets/pikachu.png');
	    game.load.image('mob2', 'assets/squirtle.png');
	    game.load.image('mob3', 'assets/Bulbasaur.png');
	    game.load.image('mob4', 'assets/pokemon2.png');
	    game.load.image('mob5', 'assets/pokemon.png');
	    game.load.image('mob6', 'assets/squirtle2.png');

	    game.load.image('bullet', 'assets/bullet0.png');

	    //font 
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	},

	create: function(){
		//call menu.
		game.state.start('menu');
	}
};