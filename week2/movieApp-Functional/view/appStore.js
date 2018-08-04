const {createStore} = require('redux');
const movieApp = require('../model');

const store = createStore(movieApp);

module.exports = store;
