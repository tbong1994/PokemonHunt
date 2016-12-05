//menu.js

//this is the main menu screen. called by load.

//text font and stuff for the game.
var grd;
var sound;
var background;
var gamesizeX = 2200;
var gamesizeY = 600;
var comeBackFromInfo = false; //coming back from the info page.
var currentLevel; // keep the level number.

var menuState ={
	create: function(){
		currentLevel = 1; //set current level back to 1 when starting from the menu screen

		//OR YOU CAN EDIT THE GAME AND ALLOW USER TO GO TO MAIN MENU TO CHANGE SETTINGS OR SOMETHING
		//AND THEN GOES BACK TO WHERE HE LEFT OFF, WHEN THE SCALE OF THE GAME GETS BIGGER. 
		
		userCharacter = null; //When coming to menu screen after game over, users still need to select a character.
		
		//PLAY ONLY ONE MUSIC.
		if(!comeBackFromInfo){
			sound = game.sound.play('menu_music');
		}
		//set background color for menu screen.
	    game.add.tileSprite(0,0,gamesizeX,gamesizeY,'background');
		var header = game.add.text(80,70,"Gotta Catch'Em All");
		decorateText(header);

		//all buttons have the same y coordinates.
	    var allButtonY = 400;

	    /*button parameter (x,y,buttonimage_id,functionCalledWhenButtonClicked,callbackContext*, outFrame, downFrame)
	    *callBackContext is the context which the call back will be called, usually 'this'.
	    */

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
	    var infoButton = game.add.button(620,allButtonY, 'emptybutton', infoPressed, this, 0.3, 0.3, 0.5);
	    var infoButtonText = game.add.text(infoButton.x + 46,infoButton.y+49,"Info");
	    decorateText(infoButtonText);
	    infoButtonText.fontSize = 22;

	    //display startbutton.
		var startButton= game.add.button(infoButton.x + 300,allButtonY-20, 'emptybutton', start, this, 0.3, 0.3, 0.5);
	    var startButtonText = game.add.text(startButton.x+30,startButton.y+50,"Start");
	    decorateText(startButtonText);
	    startButton.scale.setTo(1.3,1.3);
	    startButtonText.fontSize = 50;	    
	},
}

//set character for each button.
function a1Chosen(){
	userCharacter =	'alienhunter1'; //key value for sprite
	charName = "A1"; //character name to display
}
function a2Chosen(){
	userCharacter =	'alienhunter2';
	charName = "A2";
}
function a3Chosen(){
	userCharacter =	'alienhunter3';
	charName = "A3";
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
    grd.addColorStop(0, '#FF9033');   
    grd.addColorStop(1, '#FFF933');
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
		game.time.events.add(Phaser.Timer.SECOND * 1, destroyText, msg);
	}else{
		sound.destroy();
		game.state.start('level1');
	}
}

function destroyText(){
	this.destroy();
}