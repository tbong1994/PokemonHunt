//menu.js

//this is the main menu screen. called by load.
var userCharacter;

//text font and stuff for the game.
var grd;

var menuState ={

	create: function(){
		//set background color for menu screen.
	    game.add.tileSprite(0,0,4600,540,'background');
		var header = game.add.text(80,70,'Ready to Play?' + "\n" + "Choose Character and Click Play");

		//set font and style.
		decorateText(header);

	    //all buttons layout in the same horizontal level.
	    var allButtonY = 400;

	    //display startbutton.
	    var startButton = game.add.button(game.world.centerX + 300, allButtonY, 'startbutton', start, this, 0.3, 0.3, 0.5);
	    
	    //character buttons.
	    var wizardButton = game.add.button(20 ,allButtonY, 'emptybutton', wizardChosen, this, 0.3, 0.3, 0.5);
	    var wizardButtonText = game.add.text(wizardButton.x+25,wizardButton.y+49,"Wizard");
	    decorateText(wizardButtonText);
	    wizardButtonText.fontSize = 22;

	    var berserkerButton = game.add.button(220 ,allButtonY, 'emptybutton', berserkerChosen, this, 0.3, 0.3, 0.5);
	    var berserkerButtonText = game.add.text(berserkerButton.x + 15,berserkerButton.y+49,"Berserker");
	    decorateText(berserkerButtonText);
	    berserkerButtonText.fontSize = 22;

	    var bowmanButton = game.add.button(420,allButtonY, 'emptybutton', bowmanChosen, this, 0.3, 0.3, 0.5);
	    var bowmanButtonText = game.add.text(bowmanButton.x+20,bowmanButton.y+49,"Bowman");
	    decorateText(bowmanButtonText);
	    bowmanButtonText.fontSize = 22;

	    //info button.
	    var infoButton = game.add.button(game.world.centerX,allButtonY, 'emptybutton', infoPressed, this, 0.3, 0.3, 0.5);
	    var infoButtonText = game.add.text(infoButton.x + 46,infoButton.y+49,"Info");
	    decorateText(infoButtonText);
	    infoButtonText.fontSize = 22;
	},
}

//this function is called when button is clicked.
function start(){

	//if character is not chosen, let them know to choose character first.
	if(userCharacter == null){
		var msg = game.add.text(50,350,"Choose a character first!!");
		decorateText(msg);
	}else{
		game.state.start('game');	
	}
}

//based on the character button clicked, set character.

function wizardChosen(){
	userCharacter = "wizard";
}

function berserkerChosen(){
	userCharacter = "berserker";	
}

function bowmanChosen(){
	userCharacter = "bowman";
}

function infoPressed(){
	game.state.start("info");
}

//for setting text
function decorateText(str){

	str.font = 'Revalia';
	str.fontSize = 40;


	grd = str.context.createLinearGradient(0, 0, 0, str.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');

	str.fill = grd;
	str.align;
	str.stroke = '#000000';
    str.strokeThickness = 2;
    str.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
}