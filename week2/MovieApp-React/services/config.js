const config = {
  api_key: '843a0406123e1b0b1048f4f810755a87',
  search_path: 'https://api.themoviedb.org/3/search/movie',
  discover_path: 'https://api.themoviedb.org/3/discover/movie',
  search_params: {
    language: 'en-US',
    include_adult: false,
  },
  posterBasePath: 'http://image.tmdb.org/t/p/w342',
  results_storage: 'moviesearch',
  collectionsList: 'collections',
  moviesList: 'movies',
  movieCollectionMap: 'addedmovies',
  collectionMovieMap: 'addedToCollection',
  moviesPerPage: 5,
};

module.exports = config;
