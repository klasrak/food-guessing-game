class InvalidTypeError extends Error {
  constructor(paramName) {
    super(`Invalid param type: ${typeof paramName}`);
    this.name = 'InvalidTypeError';
  }
}

module.exports = InvalidTypeError;
