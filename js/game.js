var Coin = require('./coin.js');
var Furry = require('./furry.js');
var Game = function(){
  var result = document.querySelector("#score strong");
  var self;
  this.board = document.querySelectorAll("#board div"),
  this.furry = new Furry(),
  this.coin = new Coin(),
  this.score = 0,

  this.index = function(x,y) {
    return x + (y * 10);
  },

   this.showFurry = function() {
   this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry')
   },

   this.hideVisibleFurry = function() {
     document.querySelectorAll('.furry')[0].classList.remove('furry')
   },

    this.showCoin = function() {
    this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
  },

    this.moveFurry = function() {
      self.hideVisibleFurry();
      if(self.furry.direction === "right") {
        self.furry.x = self.furry.x + 1;
      } else if (self.furry.direction === "left") {
        self.furry.x = self.furry.x - 1;
      } else if (self.furry.direction === "up") {
        self.furry.y = self.furry.y - 1;
      } else if (self.furry.direction === "down") {
        self.furry.y = self.furry.y + 1;
      }
      self.gameOver();
      self.showFurry();
      self.checkCoinCollision();
    },

    this.turnFurry = function(event){
      switch (event.which) {
      case 37:
      self.furry.direction = 'left';
      break;
      case 38:
      self.furry.direction = 'up';
      break;
      case 39:
      self.furry.direction = 'right';
      break;
      case 40:
      self.furry.direction = 'down';
      break;
    }
  },

  document.addEventListener('keydown', this.turnFurry);

  this.checkCoinCollision = function(){
      if(this.furry.x===this.coin.x&&this.furry.y===this.coin.y){
        document.querySelector('.coin').classList.remove("coin"),
        this.score++,
        result.innerHTML=this.score,
        this.coin = new Coin();
        this.showCoin();
      }
    },

    this.gameOver = function() {
      if(this.furry.x<0||this.furry.x>9||this.furry.y<0||this.furry.y>9){
        clearInterval(this.idSetInterval);
        // this.hideVisibleFurry();
        alert('Game over! Score: '+ result.innerHTML);
      }
    },

  this.startGame = function(){

    self = this;

  this.idSetInterval = setInterval(function() {
  self.moveFurry()
  }, 250);
 }

}
module.exports = Game;
