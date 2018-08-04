import { apiCall, getStoredData } from '../view';
import config from './config';
import service from './collections';

const saveMoviesInLocal = (result, searchTerm, config) => {
    localStorage.setItem(config.results_storage, JSON.stringify(result.results));
};



const addMovieToList = (resultData) => {
  const collectionMap = service.getCollectionMap();
  const resultSet = resultData.results.map((movie) => {
    if (collectionMap[movie.id]) {
      return { ...movie, list: collectionMap[movie.id] };
    }
    return { ...movie, list: false };
  });
  const finalResults = { ...resultData, results: resultSet };
  return finalResults;
};


const searchMovieList = config => (searchTerm, page) => {
  const pge = page || 1;
  return new Promise((resolve, reject) => {
    const dataToStore = getStoredData(config.results_storage);
    if (dataToStore[searchTerm] && dataToStore[searchTerm][pge]) {
      const resData = addMovieToList(dataToStore[searchTerm][pge]);
      resolve(resData);
    } else {
      const url = Object.keys(config.search_params).reduce((acc, key) => `${acc}&${key}=${config.search_params[key]}`, `${config.search_path}?api_key=${config.api_key}&query=${searchTerm}&page=${pge}`);
      const fetchResults = apiCall(url, 'GET', {});
      fetchResults.then((data) => {
        const resultData = JSON.parse(data);
        const finResults = addMovieToList(resultData);
        localStorage.setItem(config.results_storage, JSON.stringify(resultData.results));
        resolve(finResults);
      })
    }
  });
};

const getMoviesList = () => () => {
  //const pageNumber = page || 1;
  // const moviesLocal = service.getMoviesFromLocal();
  // const moviesCollections = service.getMovieMapFromLocal();
  // const moviesInColleciton = moviesCollections[listName];
  // const movies = moviesInColleciton.map(item => ((moviesLocal[item]) ? moviesLocal[item] : {}));
  //
  // const moviesToShow = movies.slice(moviesPerPage * (pageNumber - 1), moviesPerPage * pageNumber);
  // const totalPages = Math.ceil(movies.length / moviesPerPage);
  const moviesToShow = JSON.parse(localStorage.getItem(config.fav_storage)) ? JSON.parse(localStorage.getItem(config.fav_storage)) : { results: [] };

  return {
    value: moviesToShow.results,
    pageCount: 1,
    currentPage: 1,
  };

  return {};
};

export const searchMovie = searchMovieList({ ...config });
export const getMovieLists = getMoviesList();
//export const getPopularlists = getPopularList({ ...config });
