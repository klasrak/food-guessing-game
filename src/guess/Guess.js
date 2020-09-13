/* eslint-disable no-continue */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const InvalidInstanceError = require('../errors/InvalidInstanceError');
const { isInstanceOf } = require('../utils');

function isOk(choice) {
  if (typeof choice === 'string' && choice === 's') return true;
  return false;
}

class GuessingGame {
  constructor(category, food, input) {
    this.Category = category;
    this.Food = food;
    this.input = input;
    this.categoryList = [];
    this.counter = 0;
    this.populateFirstQuestion();
  }

  populateFirstQuestion() {
    const massa = this.createCategory('massa');
    const lasanha = this.createFood('lasanha');

    const doce = this.createCategory('doce');
    const bolo = this.createFood('bolo de chocolate');

    massa.insertFood(lasanha);
    doce.insertFood(bolo);

    this.categoryList.push(massa, doce);
  }

  createCategory(name) {
    return new this.Category(name);
  }

  createFood(name) {
    return new this.Food(name);
  }

  inquireCategory(category) {
    const answer = this.input.question(
      `Você pensou em ${category.name}? (s/n) `
    );
    return isOk(answer);
  }

  inquireAboutFoodName(food) {
    const answer = this.input.question(
      `O prato que você pensou é ${food.name} (s/n) `
    );
    return isOk(answer);
  }

  inquireAboutFoodAttribute(food) {
    if (isInstanceOf(food, this.Food) && food.attribute) {
      const answer = this.input.question(
        `O prato que você pensou é ${food.attribute} (s/n) `
      );
      return isOk(answer);
    }
    throw new InvalidInstanceError(food, this.Food);
  }

  inquireNewFood(food, category) {
    if (category && isInstanceOf(category, this.Category)) {
      const answer = this.input.question(`Qual prato você pensou? `);
      const newFood = this.createFood(answer);
      if (!food) {
        return category.foods.push(newFood);
      }
      const attribute = this.input.question(
        `${newFood.name} é _____________ mas ${food.name} não. `
      );
      newFood.insertAttribute(attribute);
      return category.foods.push(newFood);
    }
  }

  getFoodByCategory(category, food) {
    if (
      isInstanceOf(category, this.Category) &&
      isInstanceOf(food, this.Food)
    ) {
      let ok;
      if (food.attribute) {
        const found = category.foods.map(f => {
          if (f.attribute === food.attribute) {
            return f;
          }
        });
        console.log(found);

        if (found && found.length > 0) {
          for (const f of found) {
            if (f === undefined) {
              continue;
            }
            ok = this.inquireAboutFoodName(f);

            if (ok) {
              return this.win(f);
            }
          }
        }
      }
    }
  }

  handlerInCategory(category) {
    let ok;
    let currentFood;
    for (const food of category.foods) {
      currentFood = food;
      if (category.foods.indexOf(food) === 0) {
        ok = this.inquireAboutFoodName(food);
        if (ok) {
          return this.win(food);
        }
      } else {
        ok = this.inquireAboutFoodAttribute(food);
      }
      if (ok) {
        return this.getFoodByCategory(category, food);
      }
    }
    return this.inquireNewFood(currentFood, category);
  }

  win(food) {
    this.counter += 1;
    console.log(`Acertei! Você pensou em ${food.name}`);
  }

  startGuessing() {
    let ok;
    for (const category of this.categoryList) {
      ok = this.inquireCategory(category);

      if (ok) {
        return this.handlerInCategory(category);
      }
    }
    const answer = this.input.question('No que você pensou? ');
    const newCategory = this.createCategory(answer);
    return this.categoryList.push(newCategory);
  }
}

module.exports = GuessingGame;
