const Category = require('./category/Category');
const Food = require('./food/Food');

const category = new Category('massa');
const lasanha = new Food('Lasanha');
const macarrao = new Food('Macarrão');

macarrao.insertAttribute('barato');

category.insertFood([lasanha, macarrao]);

console.log(category);
