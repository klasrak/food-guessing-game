const Category = require('./category/Category');
const Food = require('./food/Food');
const Guess = require('./guess/Guess');

const guessingGame = new Guess(Category, Food);

guessingGame.start();
