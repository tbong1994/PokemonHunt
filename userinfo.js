//userinfo.js

//allow user to enter their name(username) and choose character!!!

var userState = {

	create: function(){
		//set background color for menu screen.
	    game.stage.setBackgroundColor(0x2d2d2d);

		var header = game.add.text(80,80,'U Too Old For This Game');


		var subHeader = game.add.text(100, game.world.height -200, 'If you still wanna play'+'\n'+ 'press Enter');

		//font for nameLabel and startLabel.
		header.font = 'Revalia';
	    header.fontSize = 60;

	    //  x0, y0 - x1, y1
	    grd = header.context.createLinearGradient(0, 0, 0, header.canvas.height);
	    grd.addColorStop(0, '#8ED6FF');   
	    grd.addColorStop(1, '#004CB3');
	    header.fill = grd;

	    header.align = 'center';
	    header.stroke = '#000000';
	    header.strokeThickness = 2;
	    header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

	    subHeader.font = 'Revalia';
	    subHeader.fontSize = 60;
	   
	    subHeader.fill = grd;

	    subHeader.align = 'center';
	    subHeader.stroke = '#000000';
	    subHeader.strokeThickness = 2;
	    subHeader.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);


		//make a variable to store a startkey.
		var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		//when startKey is pressed, call start function.
		startKey.onDown.addOnce(this.start, this);
	},

	//this function is called when startKey is pressed down.
	start: function(){
		game.state.start('game');
	}
}