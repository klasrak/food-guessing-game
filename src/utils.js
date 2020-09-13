function isInstanceOf(instance, klass) {
  return instance instanceof klass;
}

function isOk(choice) {
  if (typeof choice === 'string' && choice === 's') return true;
  return false;
}

module.exports = {
  isInstanceOf,
  isOk,
};
