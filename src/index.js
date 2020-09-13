const readline = require('readline-sync');
const Category = require('./category/Category');
const Food = require('./food/Food');
const Guess = require('./guess/Guess');

const guessingGame = new Guess(Category, Food, readline);

function startGame() {
  while (true) {
    guessingGame.startGuessing();
  }
}

startGame();
