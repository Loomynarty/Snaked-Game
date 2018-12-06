var GameOver = new Phaser.Scene("over")

GameOver.init = function(data)
{
  this.score = data.score
}
GameOver.preload = function()
{

}

GameOver.create = function(data)
{
    scoreText = this.add.text(190,200, 'Score: ' + this.score).setFontSize(64)
    this.replay = this.add.text(250, 300, 'Play Again').setFontSize(30)
        .setInteractive()
        .on('pointerup', () => this.scene.start('L1'))
        .on('pointerover', () => this.replay.setStyle({fill: '#E8E83F'}))
        .on('pointerout', () => this.replay.setStyle({fill: '#FFFFFF'})) 
}

GameOver.update = function(time, delta)
{
}
