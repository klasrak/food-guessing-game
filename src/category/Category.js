const InvalidInstanceError = require('../errors/InvalidInstanceError');
const InvalidTypeError = require('../errors/InvalidTypeError');
const Food = require('../food/Food');
const isInstanceOf = require('../utils');

class Category {
  constructor(name) {
    this.name = name;
    this.foods = [];
  }

  insertFood(food) {
    if (typeof food === 'object' && Array.isArray(food) && food.length > 0) {
      food.forEach(f => {
        if (!isInstanceOf(f, Food)) throw new InvalidInstanceError(f, Food);
      });

      this.foods.push(...food);
    } else if (
      typeof food === 'object' &&
      Object.prototype.toString.call(food) &&
      isInstanceOf(food, Food)
    ) {
      this.foods.push(food);
    } else {
      throw new InvalidTypeError(food);
    }
  }
}

module.exports = Category;
