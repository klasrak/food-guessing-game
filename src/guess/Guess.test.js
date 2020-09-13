/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const readline = require('readline-sync');

const Guess = require('./Guess');
const Food = require('../food/Food');
const Category = require('../category/Category');
const InvalidInstanceError = require('../errors/InvalidInstanceError');

function makeSut() {
  return new Guess(Category, Food, readline);
}

const createGuessStub = () => {
  class GuessStub {
    inquireCategory() {
      return true;
    }

    inquireAboutFoodName() {
      return true;
    }

    inquireAboutFoodAttribute() {
      return true;
    }
  }
  return new GuessStub();
};

describe('Guess test', () => {
  it('should get an instance of Guess class', () => {
    const sut = makeSut();

    expect(sut).toBeInstanceOf(Guess);
  });

  it('should instantiate Guess with 2 categories', () => {
    const sut = makeSut();
    expect(sut.categoryList).toHaveLength(2);
  });

  it('should instantiate with "massa" category by default as first element of categoryList array', () => {
    const sut = makeSut();

    expect(sut.categoryList[0].name).toBe('massa');
  });

  it('should instantiate with "doce" category by default as second element of categoryList array', () => {
    const sut = makeSut();

    expect(sut.categoryList[1].name).toBe('doce');
  });

  it('should not throw when call createCategory method', () => {
    const sut = makeSut();

    function createCategory() {
      sut.createCategory('new category');
    }

    expect(createCategory).not.toThrow();
  });

  it('should not throw when call createFood method', () => {
    const sut = makeSut();

    function createFood() {
      sut.createFood('new food');
    }

    expect(createFood).not.toThrow();
  });

  it('should return false if call inquireCategory with a parameter !== "s"', () => {
    const stub = createGuessStub();
    jest.spyOn(stub, 'inquireCategory').mockReturnValueOnce(false);

    const value = stub.inquireCategory('n');

    expect(stub.inquireCategory).not.toThrow();
    expect(stub.inquireCategory).toHaveBeenCalledWith('n');
    expect(value).toBe(false);
  });

  it('should return true if call inquireCategory with "s" parameter', () => {
    const stub = createGuessStub();
    jest.spyOn(stub, 'inquireCategory');

    const value = stub.inquireCategory('s');

    expect(stub.inquireCategory).not.toThrow();
    expect(stub.inquireCategory).toHaveBeenCalledWith('s');
    expect(value).toBe(true);
  });

  it('should return false if call inquireAboutFoodName with a parameter !== "s"', () => {
    const stub = createGuessStub();
    jest.spyOn(stub, 'inquireAboutFoodName').mockReturnValueOnce(false);

    const value = stub.inquireAboutFoodName('n');

    expect(stub.inquireAboutFoodName).not.toThrow();
    expect(stub.inquireAboutFoodName).toHaveBeenCalledWith('n');
    expect(value).toBe(false);
  });

  it('should return true if call inquireAboutFoodName with "s" parameter', () => {
    const stub = createGuessStub();
    jest.spyOn(stub, 'inquireAboutFoodName');

    const value = stub.inquireAboutFoodName('s');

    expect(stub.inquireAboutFoodName).not.toThrow();
    expect(stub.inquireAboutFoodName).toHaveBeenCalledWith('s');
    expect(value).toBe(true);
  });

  it('should return false if call inquireAboutFoodAttribute with a parameter !== "s"', () => {
    const stub = createGuessStub();
    jest.spyOn(stub, 'inquireAboutFoodAttribute').mockReturnValueOnce(false);

    const value = stub.inquireAboutFoodAttribute('n');

    expect(stub.inquireAboutFoodAttribute).not.toThrow();
    expect(stub.inquireAboutFoodAttribute).toHaveBeenCalledWith('n');
    expect(value).toBe(false);
  });

  it('should return true if call inquireAboutFoodAttribute with "s" parameter', () => {
    const stub = createGuessStub();
    jest.spyOn(stub, 'inquireAboutFoodAttribute');

    const value = stub.inquireAboutFoodAttribute('s');

    expect(stub.inquireAboutFoodAttribute).not.toThrow();
    expect(stub.inquireAboutFoodAttribute).toHaveBeenCalledWith('s');
    expect(value).toBe(true);
  });
});
