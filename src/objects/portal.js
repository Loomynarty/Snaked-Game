var Blueportal = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Blueportal (scene, x, y)
    {
        Phaser.GameObjects.Image.call(this, scene)

        this.setTexture('blueportal');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);

        scene.children.add(this);
    },

});

var Orangeportal = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Orangeportal (scene, x, y)
    {
        Phaser.GameObjects.Image.call(this, scene)

        this.setTexture('orangeportal');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);

        scene.children.add(this);
    },

});
