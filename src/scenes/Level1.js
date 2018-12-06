var Level1 = new Phaser.Scene("L1")
Level1.preload = function()
{
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/Snake.png');
    this.load.image('head', 'assets/head.png');
    this.load.image('headS', 'assets/headS.png');
    this.load.image('headN', 'assets/headN.png');
    this.load.image('headW', 'assets/headW.png');
    this.load.audio('munch', 'assets/eat.wav');
}

Level1.create = function()
{
    this.food = new Food(this, 3, 4);
    this.snake = new Snake(this, 8, 8);
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
    if (this.snake.update(time))
    {
        if (this.snake.collideWithFood(this.food))
        {
            
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.sound.play('munch');
            this.repositionFood();
        }
    }
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

Level1.gameOver = function(){

    this.scene.start("over", {score: this.food.total})
}
