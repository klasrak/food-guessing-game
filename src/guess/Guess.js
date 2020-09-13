/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const readline = require('readline-sync');
const InvalidInstanceError = require('../errors/InvalidInstanceError');
const InvalidTypeError = require('../errors/InvalidTypeError');
const { isInstanceOf } = require('../utils');

function isOk(choice) {
  if (typeof choice === 'string' && choice === 's') return true;
  return false;
}

function askUserAbout(about, name) {
  switch (about) {
    case 'category':
      return readline.question(`A comida que você pensou é ${name}? (s/n) `);
    case 'food':
      return readline.question(`Você pensou em ${name}? (s/n) `);
    default:
      break;
  }
  return false;
}

class Guess {
  constructor(category, food) {
    this.counter = 0;
    this.Category = category;
    this.Food = food;
    this.categoryList = [];
    this.foodList = [];
    this.populateFirstQuestion();
  }

  createNewCategory(name) {
    if (typeof name === 'string' && name !== '') {
      return new this.Category(name);
    }
    throw new InvalidTypeError(name);
  }

  createNewFood(name) {
    if (typeof name === 'string' && name !== '') {
      return new this.Food(name);
    }
    throw new InvalidTypeError(name);
  }

  appendFoodToCategory(food, category) {
    if (
      isInstanceOf(food, this.Food) &&
      isInstanceOf(category, this.Category)
    ) {
      category.insertFood(food);
    } else if (!isInstanceOf(food, this.Food)) {
      throw new InvalidInstanceError(food, this.Food);
    } else {
      throw new InvalidInstanceError(category, this.Category);
    }
  }

  appendCategoryToList(category) {
    if (isInstanceOf(category, this.Category)) {
      this.categoryList.push(category);
    } else {
      throw new InvalidInstanceError(category, this.Category);
    }
  }

  appendFoodToList(food) {
    if (isInstanceOf(food, this.Food)) {
      this.foodList.push(food);
    } else {
      throw new InvalidInstanceError(food, this.Food);
    }
  }

  populateFirstQuestion() {
    const lasanha = this.createNewFood('lasanha');
    const massa = this.createNewCategory('massa');
    const bolo = this.createNewFood('bolo de chocolate');
    const doce = this.createNewCategory('doce');

    this.appendFoodToCategory(lasanha, massa);
    this.appendFoodToCategory(bolo, doce);

    this.appendCategoryToList(massa);
    this.appendCategoryToList(doce);
    this.appendFoodToList(lasanha);
    this.appendFoodToList(bolo);
  }

  handleNewCategory(current) {
    const name = readline.question('Digite uma nova categoria: ');
    const category = this.createNewCategory(name);

    if (category && category.name !== current) {
      console.log(`Nova categoria ${category.name}`);
    }
  }

  startGuessingGame() {
    for (const category of this.categoryList) {
      const answer = askUserAbout('category', category.name);

      if (answer && isOk(answer)) {
        for (const food of category.foods) {
          const foodAnswer = askUserAbout('food', food.name);

          if (foodAnswer && isOk(foodAnswer)) {
            console.log('Acertei!');
            break;
          }
        }
        break;
      }
    }
    this.handleNewCategory();
    this.counter += 1;
    console.log(`Você já jogou ${this.counter} jogo(s)`);
  }

  endGame() {
    console.log(`Você jogou ${this.counter} vezes!`);
    process.exit(0);
  }

  start() {
    this.startGuessingGame();
  }
}

module.exports = Guess;
