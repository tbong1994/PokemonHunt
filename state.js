//first.js
//this file is the very first file for the game Pokemon Hunt.

//first create the game object.
var game = new Phaser.Game(1500,540, Phaser.AUTO,'');

//add all the game states.
game.state.add("boot",bootState);
game.state.add("load",loadState);
game.state.add("menu",menuState);
game.state.add("info",infoState);
game.state.add("level1",firstLevel);
game.state.add("level2",secondLevel);


//call booting state first.
game.state.start("boot");