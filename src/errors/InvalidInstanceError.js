class InvalidInstanceError extends Error {
  constructor(instance, klass) {
    super(`${instance} is not instance of ${klass}`);
    this.name = 'InvalidInstanceError';
  }
}

module.exports = InvalidInstanceError;
