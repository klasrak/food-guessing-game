/* eslint-disable no-console */
const readline = require('readline-sync');
const chalk = require('chalk');
const figlet = require('figlet');
const Category = require('./category/Category');
const Food = require('./food/Food');
const Guess = require('./guess/Guess');
const { isOk } = require('./utils');

const guessingGame = new Guess(Category, Food, readline);

function welcome() {
  function prepareWelcome() {
    return figlet.textSync('Food Guessing Game', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 50,
      whitespaceBreak: true,
    });
  }

  console.log(chalk.yellow(prepareWelcome()));
}

function keepPlaying(answer = true) {
  if (!answer) {
    console.log('Obrigado por jogar! Encerrando o game.');
    process.exit(0);
  }
}

function startGame() {
  welcome();
  while (true) {
    guessingGame.startGuessing();
    const answer = readline.question('Deseja continuar jogando? (s/n) ');
    keepPlaying(isOk(answer));
  }
}

startGame();
