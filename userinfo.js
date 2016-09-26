//userinfo.js

//allow user to enter their name(username) and choose character!!!

var userState = {

	create: function(){
		//set background color for menu screen.
	    game.stage.setBackgroundColor(0x2d2d2d);

		var header = game.add.text(80,80,'U Too Old For This Game');

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

	    //if this button is pressed, start the game.
	    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
	    button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
	},

	//this function is called when startKey is pressed down.
	actionOnClick: function(){
		game.state.start('game');
	}
}