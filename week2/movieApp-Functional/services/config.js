const config = {
  api_key: '843a0406123e1b0b1048f4f810755a87',
  search_path: 'https://api.themoviedb.org/3/search/movie',
  search_params: {
    language: 'en-US',
    include_adult: false,
  },
  imgBasePath: 'https://image.tmdb.org/t/p/w200',
  results_storage: 'moviesearch',
  fav_storage: "favsearch",
  collectionsList: 'collections',
  moviesList: 'movies',
  movieCollectionMap: 'addedmovies',
  collectionMovieMap: 'addedToCollection',
  moviesPerPage: 10,
};

module.exports = config;
