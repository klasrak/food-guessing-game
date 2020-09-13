const Food = require('./Food');
const InvalidTypeError = require('../errors/InvalidTypeError');

function makeSut() {
  const sut = new Food('Test food');
  return sut;
}

describe('Food test', () => {
  it('should get an instance of Food class', () => {
    const sut = makeSut();
    expect(sut).toBeInstanceOf(Food);
  });

  it('should instantiate Food with name Test food', () => {
    const sut = makeSut();
    expect(sut.name).toBe('Test food');
  });

  it('should throw if call the insertAttribute with a parameter that does not have the type "string"', () => {
    const sut = makeSut();

    function insertAttribute() {
      sut.insertAttribute(1);
    }

    expect(insertAttribute).toThrowError(InvalidTypeError);
  });

  it('should have an attribute if method insertAttribute is called corretcly', () => {
    const sut = makeSut();

    function insertAttribute() {
      sut.insertAttribute('tasty');
    }

    expect(insertAttribute).not.toThrowError();
    expect(sut.attribute).toBe('tasty');
  });
});
