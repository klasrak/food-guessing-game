function isInstanceOf(instance, klass) {
  return instance instanceof klass;
}

function waitFor(func, time) {
  setTimeout(func, time);
}

module.exports = {
  isInstanceOf,
  waitFor,
};
