//menu.js

//this is the main menu screen. called by load.

//text font and stuff for the game.
var grd;

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
	    
	    //create character buttons.
    	var button1= game.add.button(20,allButtonY, 'emptybutton', a1Chosen, this, 0.3, 0.3, 0.5);
	    var button1Text = game.add.text(button1.x+10,button1.y+49,"AlienHunter 1");
	    decorateText(button1Text);
	    button1Text.fontSize = 18;

	    var button2= game.add.button(220,allButtonY, 'emptybutton', a2Chosen, this, 0.3, 0.3, 0.5);
	    var button2Text = game.add.text(button2.x+10,button2.y+49,"AlienHunter 2");
	    decorateText(button2Text);
	    button2Text.fontSize = 18;
		
		var button3= game.add.button(420,allButtonY, 'emptybutton', a3Chosen, this, 0.3, 0.3, 0.5);
	    var button3Text = game.add.text(button3.x+10,button3.y+49,"AlienHunter 3");
	    decorateText(button3Text);
	    button3Text.fontSize = 18;

	    //info button.
	    var infoButton = game.add.button(game.world.centerX,allButtonY, 'emptybutton', infoPressed, this, 0.3, 0.3, 0.5);
	    var infoButtonText = game.add.text(infoButton.x + 46,infoButton.y+49,"Info");
	    decorateText(infoButtonText);
	    infoButtonText.fontSize = 22;
	},
}

//this function is called when button is clicked.

//set character for each button.
function a1Chosen(){
	userCharacter =	'alienhunter1';
	charName = "JoonNam";
}
function a2Chosen(){
	userCharacter =	'alienhunter2';
	charName = "Muscle Lee aka Sudden Lee";
}
function a3Chosen(){
	userCharacter =	'alienhunter3';
	charName = "T-Bong";
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
	if(userCharacter== null){
		var msg = game.add.text(50,350,"Choose a character first!!");
		decorateText(msg);
	}else{
		game.state.start('game');	
	}
}