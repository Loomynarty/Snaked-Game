var Snake = new Phaser.Class({

    initialize:

    function Snake (scene, x, y)
    {
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 16, y * 16, 'head');
        this.head.setOrigin(0);

        this.alive = true;

        this.speed = 100;

        this.moveTime = 0;

        this.tail = new Phaser.Geom.Point(x, y);

        this.heading = RIGHT;
        this.direction = RIGHT;
    },

    update: function (time)
    {
        if (time >= this.moveTime)
        {
            return this.move(time);
        }
    },

    faceLeft: function ()
    {
        if (this.direction === UP || this.direction === DOWN)
        {
            
            this.heading = LEFT;
            
            this.head.setTexture('headW');
        }
    },

    faceRight: function ()
    {
        if (this.direction === UP || this.direction === DOWN)
        {
            
            this.heading = RIGHT;
           
            this.head.setTexture('head');
            
        }
    },

    faceUp: function ()
    {
        if (this.direction === LEFT || this.direction === RIGHT)
        {
            
            this.heading = UP;
            this.head.setTexture('headN');
        }
    },

    faceDown: function ()
    {
        if (this.direction === LEFT || this.direction === RIGHT)
        {
            
            this.heading = DOWN;
            this.head.setTexture('headS');
        }
    },

    move: function (time)
    {
        switch (this.heading)
            {
                case LEFT:
                    if(this.headPosition.x <= 0) this.alive = false
                    else this.headPosition.x -= 1
                    break;

                case RIGHT:
                    if(this.headPosition.x >= 39) this.alive = false
                    else this.headPosition.x += 1
                    break;

                case UP:
                    if(this.headPosition.y <= 0) this.alive = false
                    else this.headPosition.y -= 1
                    break;

                case DOWN:
                    if(this.headPosition.y >= 29) this.alive = false
                    else this.headPosition.y += 1
                    break;
            }

        this.direction = this.heading;

        //  Update the body segments and place the last coordinate into this.tail
        if(this.alive){
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);
        }

        //  Check to see if any of the body pieces have the same x/y as the head
        //  If they do, the head ran into the body

        var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

        if (hitBody)
        {
            this.alive = false;
            return false;
        }
        else
        {
            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;
            return true;
        }
    },

    grow: function ()
    {
        var newPart = this.body.create(this.tail.x, this.tail.y, 'body');

        newPart.setOrigin(0);
    },

    collideWithFood: function (food)
    {
        if (this.head.x === food.x && this.head.y === food.y)
        {
            this.grow();

            food.eat();

            //  For every 5 items of food eaten we'll increase the snake speed a little
            if (this.speed > 20 && food.total % 5 === 0)
            {
                this.speed -= 5;
            }

            return true;
        }
        else
        {
            return false;
        }
    },

    updateGrid: function (grid)
    {
        //  Remove all body pieces from valid positions list
        this.body.children.each(function (segment) {

            var bx = segment.x / 16;
            var by = segment.y / 16;

            grid[by][bx] = false;

        });

        return grid;
    }

});