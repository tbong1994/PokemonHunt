//load.js

//loading state. called by boot. As the name mentions it, add all the assets in this file.
//then go to menu state.
var loadState = {
	//Phaser defined function preload() called once at start.
	preload:function() {
		var loadingLabel = game.add.text(80,150,'loading...',{font:'30px Courier', fill: '#ffffff'});

		//load all assets here.
		game.load.image('background', 'assets/background/background.jpg');
		game.load.image('secondlevel_background', 'assets/background/background3.jpg');

		game.load.image('platform1', 'assets/platform/ice-platform.png');
		game.load.image('platform2', 'assets/platform/platform2.png');
		game.load.image('potion1', 'assets/items/pokeball1.png');
		game.load.image('potion2', 'assets/items/pokeball3.png');

	    game.load.spritesheet('alienhunter1', 'assets/player/alienhunter.png',93,155);
	    game.load.spritesheet('alienhunter2', 'assets/player/alienhunter2.png',93,157);
	    game.load.spritesheet('alienhunter3', 'assets/player/alienhunter3.png',103,158);
	    
	    //load sprite sheets for pokemons here.
	    //spritesheet('variablename',locationoffile,framex,framey,numberofframesfromfile);
	    game.load.spritesheet('monster1','assets/Pokemons/lapras-1.png',105,99);
	    game.load.spritesheet('monster2','assets/Pokemons/squirtle3-1.png',74,70);
	    game.load.spritesheet('boss','assets/Pokemons/magma-1.png',773/10,420/6);

	    game.load.spritesheet('bullet', 'assets/bullet/pokeball.png',250/5,253/6,25); //25 images only
	    game.load.spritesheet('boom','assets/bullet/blowup.png',512/4,512/4);

	    game.load.spritesheet('jumpDust','assets/player/jump_dust1.png',960/5,384/2);
	    game.load.spritesheet('hpup','assets/player/hpup.png',1024/8,384/3,14);

	    //font 
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //button
        game.load.spritesheet('startbutton', 'assets/button/startbutton.png', 193, 71);
        game.load.spritesheet('emptybutton', 'assets/button/emptybutton.png', 10, 60);

        //sound
        game.load.audio('menu_music', ['assets/sound/menu_music.mp3', 'assets/sound/menu_music.mp3']);
        game.load.audio('gameover_music', ['assets/sound/gameover_music.mp3', 'assets/sound/gameover_music.mp3']);
        game.load.audio('game_music', ['assets/sound/game_music.mp3', 'assets/sound/game_music.mp3']);
        game.load.audio('shoot_sound', ['assets/sound/112.mp3', 'assets/sound/112.ogg']);
        game.load.audio('item_consumed_sound', ['assets/sound/4.ogg', 'assets/sound/4.ogg']);
        game.load.audio('jump_sound', ['assets/sound/113.mp3', 'assets/sound/113.ogg']);
        game.load.audio('monsters_hit_sound', ['assets/sound/121.mp3', 'assets/sound/121.ogg']);
        game.load.audio('player_hit_sound', ['assets/sound/5.ogg', 'assets/sound/5.ogg']);
        game.load.audio('monster_dead_sound', ['assets/sound/131.mp3', 'assets/sound/131.mp3']);
	},
	create: function(){
		//call menu.
		game.state.start('menu');
	}
};