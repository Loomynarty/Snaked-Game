var Test2 = new Phaser.Class({

    initialize:
    function Test2()
    {
        Phaser.Scene.call(this, {key: 'test2'})
    },

    preload: function() {
            this.load.image('food', 'assets/food.png');
            this.load.image('body', 'assets/Snake.png');
            this.load.image('head', 'assets/head.png');
            this.load.image('headS', 'assets/headS.png');
            this.load.image('headN', 'assets/headN.png');
            this.load.image('headW', 'assets/headW.png');
    },
    create: function(data) {
            console.log('this is test')
            scoreText = this.add.text(200,200, 'temp').setFontSize(64)
            scoreText.visible = false    
        
            food = new Food(this, 3, 4);
        
            snake = new Snake(this, 8, 8);
        
            cursors = this.input.keyboard.createCursorKeys();
    },
    update: function(time, delta) {
            if (!snake.alive)
            {
                gameOver()
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
                    repositionFood();
                }
            }
    },
    repositionFood: function()
    {
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
    
                return true;
            }
            else
            {
                return false;
            }
        
    },
    gameOver: function(){
            scoreText.setText('Score:'+ food.total)
            scoreText.visible = true
            this.scene.start('test')
     },
    
}) 