//menu.js

//this is the main menu screen. called by load.

//text font and stuff for the game.
var grd;
var playerNum;
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
	    var buttonX = 20;

	    playerNum= 1;
	    //create character buttons.
	    for(i = 1;i<4;i++){
	    	var button= game.add.button(buttonX,allButtonY, 'emptybutton', charChosen, this, 0.3, 0.3, 0.5);
		    var buttonText = game.add.text(button.x+10,button.y+49,"AlienHunter "+i);
		    decorateText(buttonText);
		    buttonText.fontSize = 18;
		    buttonX += 200;
		    playerNum++;
	    }
	    //info button.
	    var infoButton = game.add.button(game.world.centerX,allButtonY, 'emptybutton', infoPressed, this, 0.3, 0.3, 0.5);
	    var infoButtonText = game.add.text(infoButton.x + 46,infoButton.y+49,"Info");
	    decorateText(infoButtonText);
	    infoButtonText.fontSize = 22;
	},
}

//this function is called when button is clicked.

//initial player number. used for setting userCharacter to alien1, alien2, or alien3.
//playerNum =1;

//set character for each button.
function charChosen(){
	if(playerNum==1){
		userCharacter =	'alienhunter1';
	}
	if(playerNum==2){
		userCharacter = 'alienhunter2';		
	}
	if(playerNum==3){
		userCharacter = 'alienhunter3';	
	}
}
//called when infobutton is pressed.
function infoPressed(){
	game.state.start("info");
}

//set gradient, shade, stuff for display text.
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

function start(){

	//if character is not chosen, force to choose character first.
	if(userCharacter == null){
		var msg = game.add.text(50,350,"Choose a character first!!");
		decorateText(msg);
	}else{
		game.state.start('game');	
	}
}