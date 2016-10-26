

//bootState. called by first.

//at this stage, just create physics and go to loading state.

var bootState = {

    //phaser function create() is automatically called once at start.
    create : function(){

        //just activate physics system here.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //call load.
        game.state.start('load');
    }
}