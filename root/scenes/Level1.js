var Level1 = new Phaser.Scene("L1")
Level1.preload = function()
{
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/Snake.png');
    this.load.image('head', 'assets/head.png');
    this.load.image('headS', 'assets/headS.png');
    this.load.image('headN', 'assets/headN.png');
    this.load.image('headW', 'assets/headW.png');
}

Level1.create = function()
{
    console.log('this is level1')
    scoreText = this.add.text(200,200, 'temp').setFontSize(64)
    scoreText.visible = false    

    food = new Food(this, 3, 4);

    snake = new Snake(this, 8, 8);

    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

Level1.update = function(time, delta)
{
    if (!snake.alive)
    {
        this.gameOver()
    }
    if (cursors.left.isDown)
    {
        snake.faceLeft();
    }
    else if (cursors.right.isDown)
    {
        snake.faceRight();
    }
    else if (cursors.up.isDown)
    {
        snake.faceUp();
    }
    else if (cursors.down.isDown)
    {
        snake.faceDown();
    }
    if (snake.update(time))
    {
        if (snake.collideWithFood(food))
        {
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

    snake.updateGrid(testGrid);

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
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}

Level1.gameOver = function(){
    /*
    scoreText.setText('Score:'+ food.total)
    scoreText.visible = true
    */
    this.scene.start("over", {score: food.total})
}
