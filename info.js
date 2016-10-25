//info.js


//infoState is entered when info button is clicked from main menu.
var infoState = {
	create: function(){
		game.add.tileSprite(0,0,gamesizeX,gamesizeY,'background');
		var infoMsg = game.add.text(50,70,"A : Normal Attack" + "\n" +"S: Special Attack" + "\n" +
			"move with the arrow keys."+"\n" + "Pick any of the characters and play");

		decorateText(infoMsg);

		//go back to menu button
		backToMenuButton = game.add.button(game.world.centerX -200 , 400, 'emptybutton', goBackButton, this, 0.3, 0.3, 0.5);
	    var backToMenuButtonText = game.add.text(backToMenuButton.x + 40,backToMenuButton.y + 50,"Back");
	    decorateText(backToMenuButtonText);
	    backToMenuButtonText.fontSize = 22;

	    //if character chosen from menu, press start from info page.
	    startFromInfoButton = game.add.button(game.world.centerX + 20 , 400, 'emptybutton', startFromInfo, this, 0.3, 0.3, 0.5);
	    var startFromInfoButtonText = game.add.text(startFromInfoButton.x + 40,startFromInfoButton.y + 50,"Start");
	    decorateText(startFromInfoButtonText);
	    startFromInfoButtonText.fontSize = 22;
	}
}

//go back to menu.
function goBackButton(){
	game.state.start("menu");
	comeBackFromInfo = true;
}

//go right into the game.
function startFromInfo(){
	if(userCharacter ==null){
		var msg = game.add.text(50,400,"Go back to main menu and choose a character first!");
		game.time.events.add(Phaser.Timer.SECOND * 1.5, destroyText, msg); //destroyText() is in menu.js
		decorateText(msg);
	}
	else{
		game.state.start("game");
	}
}