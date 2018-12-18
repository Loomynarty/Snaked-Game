var Level1 = new Phaser.Scene("L1")
Level1.preload = function()
{
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/Snake.png');
    this.load.image('head', 'assets/head.png');
    this.load.image('headS', 'assets/headS.png');
    this.load.image('headN', 'assets/headN.png');
    this.load.image('headW', 'assets/headW.png');
    this.load.image('blueportal', 'assets/blueportal.png');
    this.load.image('orangeportal', 'assets/orangeportal.png')
    this.load.audio('munch', 'assets/eat.wav');
    this.load.audio('song' , 'assets/song.mp3');

}

Level1.create = function()
{
    console.log('a')
    this.sound.play('song', {volume: 0.1});
    this.food = new Food(this, 3, 4);
    this.snake = new Snake(this, 8, 8);
    this.blueportal = new Blueportal(this, 4, 3);
    this.orangeportal = new Orangeportal(this, 4, 5);
    this.portalrandomizer();
    //  Create our keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
}

Level1.update = function(time, delta)
{

    if (!this.snake.alive)
    {
        this.gameOver()
    }
    if (this.cursors.left.isDown)
    {
        this.snake.faceLeft();
    }
    else if (this.cursors.right.isDown)
    {
        this.snake.faceRight();
    }
    else if (this.cursors.up.isDown)
    {
        this.snake.faceUp();
    }
    else if (this.cursors.down.isDown)
    {
        this.snake.faceDown();
    }
    if (this.cursors.space.isDown)
    {
      this.snake.grow();
      this.food.total++;
    }
    if (this.snake.update(time))
    {
        if (this.snake.collideWithFood(this.food))
        {
            this.sound.play('munch');
            this.repositionFood();
        }
    }
}

Level1.portalrandomizer = function()
{
  this.repositionBlueportal();
  this.repositionOrangeportal();
}

Level1.repositionFood = function()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }
    /*testGrid[blueportal.x][blueportal.y] = false
    testGrid[orangeportal.x][orangeportal.y] = false*/
    this.snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        this.food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}
Level1.repositionBlueportal = function ()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }

    this.snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        this.blueportal.setPosition(pos.x * 16, pos.y * 16);
        this.bx = pos.x*16;
        this.by = pos.y*16;

        return true;
    }
    else
    {
        return false;
    }
}

Level1.repositionOrangeportal = function ()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }

    this.snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        this.orangeportal.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}
Level1.gameOver = function()
{


    this.scene.start("over", {score: this.food.total})

}
