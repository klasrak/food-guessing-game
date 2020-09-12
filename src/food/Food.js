const InvalidTypeError = require('../errors/InvalidTypeError');

class Food {
  constructor(name) {
    this.name = name;
    this.attributes = [];
  }

  insertAttribute(attribute) {
    if (typeof attribute === 'string') {
      this.attributes.push(attribute);
    } else {
      throw new InvalidTypeError(attribute);
    }
  }
}

module.exports = Food;
