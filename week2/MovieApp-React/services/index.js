import storageService from './storage';
import { searchMovie, getMoviesForList, getPopular } from './search';

const parent = (el, clsName) => {
  if (el.className.search(clsName) >= 0) {
    return el;
  }
  return parent(el.parentNode, clsName);
};

module.exports = {
  storageService,
  searchMovie,
  getMoviesForList,
  getPopular,
  parent,
};
