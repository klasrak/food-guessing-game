/* eslint-disable no-console */
const readline = require('readline-sync');
const Category = require('./category/Category');
const Food = require('./food/Food');
const Guess = require('./guess/Guess');
const { isOk } = require('./utils');

const guessingGame = new Guess(Category, Food, readline);

function keepPlaying(answer = true) {
  if (!answer) {
    console.log('Obrigado por jogar! Encerrando o game.');
    process.exit(0);
  }
}

function startGame() {
  while (true) {
    guessingGame.startGuessing();
    const answer = readline.question('Deseja continuar jogando? (s/n) ');
    keepPlaying(isOk(answer));
  }
}

startGame();
