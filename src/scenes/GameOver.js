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
    this.scoreText = this.add.text(250,10, 'Your Score: ' + this.score).setFontSize(20)
    this.replay = this.add.text(250, 300, 'Play Again').setFontSize(30)
        .setInteractive()
        .on('pointerup', () => this.scene.start('L1'))
        .on('pointerover', () => this.replay.setStyle({fill: '#E8E83F'}))
        .on('pointerout', () => this.replay.setStyle({fill: '#FFFFFF'}))
    var leaderText = this.add.text(300,90, '').setFontSize(20)
    leaderText.setText([
      '1: 0',
      '2: 0',
      '3: 0',
      '4: 0',
      '5: 0',
      '6: 0',
      '7: 0',
      '8: 0',
      '9: 0',
      '10: 0',
    ]) 
}

GameOver.update = function(time, delta)
{
}
