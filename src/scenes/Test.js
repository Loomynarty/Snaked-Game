var demo = new Phaser.Scene('Demo');

demo.custom = function(){
    console.log('hi')
    this.scene.start('Test')
}
demo.create = function (data){this.custom()};
demo.update = function (time, delta){};

var test = new Phaser.Scene('Test');

test.custom = function(){
    console.log('test')
}
test.create = function (data){this.custom()};
test.update = function (time, delta){};

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '000000',
    parent: 'ay',
    scene: [demo,test]
};

let game = new Phaser.Game(config);