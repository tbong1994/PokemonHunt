//menu.js

//this is the main menu screen. called by load.

//text font and stuff for the game.
var grd;
// var charButton = {
// 	num:0;
// }
var menuState ={

	create: function(){
		//set background color for menu screen.
	    game.add.tileSprite(0,0,4600,540,'background');
		var header = game.add.text(80,70,'Ready to Play?' + "\n" + "Choose Character and Click Play");

		//set font and style.
		decorateText(header);

		//all buttons have the same y coordinates.
	    var allButtonY = 400;

	    /*button parameter (x,y,buttonimage_id,functionCalledWhenButtonClicked,callbackContext*, outFrame, downFrame)
	    *callBackContext is the context which the call back will be called, usually 'this'.
	    */
	    //display startbutton.
	    var startButton = game.add.button(game.world.centerX + 300, allButtonY, 'startbutton', start, this, 0.3, 0.3, 0.5);
	    
	    //x position for first button. will change for each button.
	    
	    // for(i = 0;i<3;i++){
	    // 	var aiButton = new charButton();
	    // 	aiButton= game.add.button(20,allButtonY, 'emptybutton', charChosen, this, 0.3, 0.3, 0.5);
		   //  var ai1ButtonText = game.add.text(aiButton.x+10,aiButton.y+49,"AlienHunter "+i);
		   //  decorateText(aiButtonText);
		   //  aiButtonText.fontSize = 18;
	    // }
	    //create character buttons.
    	var a1Button= game.add.button(20,allButtonY, 'emptybutton', a1Chosen, this, 0.3, 0.3, 0.5);
	    var a1ButtonText = game.add.text(a1Button.x+10,a1Button.y+49,"AlienHunter 1");
	    decorateText(a1ButtonText);
	    a1ButtonText.fontSize = 18;

	    var a2Button= game.add.button(220,allButtonY, 'emptybutton', a2Chosen, this, 0.3, 0.3, 0.5);
	    var a2ButtonText = game.add.text(a2Button.x+10,a2Button.y+49,"AlienHunter 2");
	    decorateText(a2ButtonText);
	    a2ButtonText.fontSize = 18;

	    var a3Button= game.add.button(420,allButtonY, 'emptybutton', a3Chosen, this, 0.3, 0.3, 0.5);
	    var a3ButtonText = game.add.text(a3Button.x+10,a3Button.y+49,"AlienHunter 3");
	    decorateText(a3ButtonText);
	    a3ButtonText.fontSize = 18;
	    
	    //info button.
	    var infoButton = game.add.button(game.world.centerX,allButtonY, 'emptybutton', infoPressed, this, 0.3, 0.3, 0.5);
	    var infoButtonText = game.add.text(infoButton.x + 46,infoButton.y+49,"Info");
	    decorateText(infoButtonText);
	    infoButtonText.fontSize = 22;
	},
}

//this function is called when button is clicked.
function start(){

	//if character is not chosen, force to choose character first.
	if(userCharacter == null){
		var msg = game.add.text(50,350,"Choose a character first!!");
		decorateText(msg);
	}else{
		game.state.start('game');	
	}
}

function a1Chosen(){
	userCharacter = "alienhunter1";
}
function a2Chosen(){
	userCharacter = "alienhunter2";
}
function a3Chosen(){
	userCharacter = "alienhunter3";
}
//based on the character button clicked, set character.
// function charChosen(){
// 	userCharacter = "alienhunter1";
// }
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