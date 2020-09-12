const InvalidInstanceError = require('../errors/InvalidInstanceError');
const InvalidTypeError = require('../errors/InvalidTypeError');
const Food = require('../food/Food');
const Category = require('./Category');

function makeSut() {
  const sut = new Category('Test');
  return sut;
}

class TestFood {}

describe('Category test', () => {
  it('should get an instance of Category class', () => {
    const sut = makeSut();
    expect(sut).toBeInstanceOf(Category);
  });

  it('should instantiate Category with name Test', () => {
    const sut = makeSut();
    expect(sut.name).toBe('Test');
  });

  it('should be instantiate with empty list of food', () => {
    const sut = makeSut();
    expect(sut.foods).toHaveLength(0);
  });

  it('should throw if call the insertFood with a parameter that does not have the type "object"', () => {
    const sut = makeSut();

    function insertFood() {
      sut.insertFood('food');
    }

    expect(insertFood).toThrowError(InvalidTypeError);
  });

  it('should throw if insertFood is called with an empty array', () => {
    const sut = makeSut();

    function insertFood() {
      sut.insertFood([]);
    }

    expect(insertFood).toThrowError(InvalidTypeError);
  });

  it('should throw if insertFood is called with an array of objects that are not Food instances', () => {
    const sut = makeSut();

    function insertFood() {
      const food = new TestFood();
      sut.insertFood([food]);
    }

    expect(insertFood).toThrowError(InvalidInstanceError);
  });

  it('should throw if insertFood is called with object that is not Food instance', () => {
    const sut = makeSut();

    function insertFood() {
      const food = new TestFood();
      sut.insertFood(food);
    }

    expect(insertFood).toThrowError(InvalidTypeError);
  });

  it('should have an array of Food instances if insertFood is called correctly', () => {
    const sut = makeSut();

    function insertFood() {
      const food = new Food('test food');
      sut.insertFood([food, food, food]);
      sut.insertFood(food);
    }

    expect(insertFood).not.toThrow();
    expect(sut.foods).toHaveLength(4);
  });
});
