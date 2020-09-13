const InvalidTypeError = require('../errors/InvalidTypeError');

class Food {
  constructor(name) {
    this.name = name;
  }

  insertAttribute(attribute) {
    if (typeof attribute === 'string') {
      this.attribute = attribute;
    } else {
      throw new InvalidTypeError(attribute);
    }
  }
}

module.exports = Food;
