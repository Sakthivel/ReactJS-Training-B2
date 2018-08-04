import config from './config';
import storageService from './storage';

const _makeAjax = (url, method, data) => {
  return new Promise((resolve, reject) => {
    // Make Call
    // on success resolve
    // on Err reject
    const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    try {
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
          resolve(xhr.responseText);
        }

        if (xhr.readyState === xhr.DONE && xhr.status !== 200) {
          reject(xhr);
        }
      });
      xhr.open(method, url);
      xhr.send(JSON.stringify(data));
    } catch (err) {
      reject(err);
    }
  });
};

const saveToLocalStorage = (results, searchTerm, conf) => {
  // Mutation here -- Internal to function
  const dataToStore = storageService.getStoredData(conf.results_storage);

  if (!dataToStore[searchTerm]) {
    dataToStore[searchTerm] = {};
  }

  dataToStore[searchTerm][results.page] = results;
  localStorage.setItem(conf.results_storage, JSON.stringify(dataToStore));
};

const _addListToMovies = (resultData) => {
  const collectionMap = storageService.getCollectionMap();
  const resultSet = resultData.results.map((mov) => {
    if (collectionMap[mov.id]) {
      return {
        ...mov,
        list: collectionMap[mov.id],
        posterpath: config.posterBasePath + mov.poster_path,
      };
    }
    return { ...mov, list: false, posterpath: config.posterBasePath + mov.poster_path };
  });
  const finResults = { ...resultData, results: resultSet };
  return finResults;
};

const _getPopular = conf => (page) => {
  const pge = page || 1;

  return new Promise((resolve, reject) => {
    const url = Object.keys(conf.search_params).reduce((acc, key) => `${acc}&${key}=${conf.search_params[key]}`, `${conf.discover_path}?api_key=${conf.api_key}&sort_by=popularity.desc&page=${pge}`);
    const fetchResults = _makeAjax(url, 'GET', {});
    fetchResults.then((data) => {
      const resultData = JSON.parse(data);
      const finResults = _addListToMovies(resultData);
      resolve(finResults);
    }).catch((err) => {
      reject(err);
    });
  });
};

const _searchMovie = conf => (searchTerm, page) => {
  const pge = page || 1;
  return new Promise((resolve, reject) => {
    const dataToStore = storageService.getStoredData(conf.results_storage);
    if (dataToStore[searchTerm] && dataToStore[searchTerm][pge]) {
      const resData = _addListToMovies(dataToStore[searchTerm][pge]);
      resolve(resData);
    } else {
      const url = Object.keys(conf.search_params).reduce((acc, key) => `${acc}&${key}=${conf.search_params[key]}`, `${conf.search_path}?api_key=${conf.api_key}&query=${searchTerm}&page=${pge}`);
      const fetchResults = _makeAjax(url, 'GET', {});
      fetchResults.then((data) => {
        const resultData = JSON.parse(data);
        const finResults = _addListToMovies(resultData);
        saveToLocalStorage(finResults, searchTerm, conf);
        resolve(finResults);
      }).catch((err) => {
        reject(err);
      });
    }
  });
};

const _getMoviesForList = moviesPerPage => (listName, pge) => {
  const pgeNo = pge || 1;
  const moviesLocal = storageService.getMoviesFromLocal();
  const moviesCollections = storageService.getMovieMapFromLocal();
  const moviesInColleciton = moviesCollections[listName];
  const movies = moviesInColleciton.map(item => ((moviesLocal[item]) ? moviesLocal[item] : {}));

  const moviesToShow = movies.slice(moviesPerPage * (pgeNo - 1), moviesPerPage * pgeNo);
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  return {
    value: moviesToShow,
    pageCount: totalPages,
    currentPage: pgeNo,
  };
};

export const searchMovie = _searchMovie({ ...config }); // Currying
export const getMoviesForList = _getMoviesForList(config.moviesPerPage);
export const getPopular = _getPopular({ ...config });
