import { searchMovie, getMovieLists } from '../services/searchMovies';
import config from '../services/config';
import store from '../view/appStore';
import {
  moviesList,
  pagination,
  getCollectionsListHtml,
  getCollectionMenu,
} from '../renders';
import collectionService from '../services/collections';
import { getParent } from '../view';


const addToFavList = (id) => {
    const storedData = JSON.parse(localStorage.getItem(config.results_storage));
    let favData = JSON.parse(localStorage.getItem(config.fav_storage)) ? JSON.parse(localStorage.getItem(config.fav_storage)) : { results: [] };
    let existingMovie = true;

    let selectedMovieObj = storedData.find(function (obj) {
        return obj.id == id;
    });

    if (favData && favData.results.length > 0) {
        favData.results.map(item => {
            if (item.id == id) {
                existingMovie = false;
            }
        });

        if (existingMovie) {
            favData.results.push(selectedMovieObj);
        }
    } else {
        favData.results.push(selectedMovieObj);
    }
    localStorage.setItem(config.fav_storage, JSON.stringify(favData));
}

function searchForMovie(term, page) {
  searchMovie(term, page).then((data) => {
    store.dispatch({
      type: 'SEARCH_COMPLETE',
      searchResults: data,
    });
  }).catch((err) => {
    console.log(err);
  });
}



function getFavMoviesOnLoad() {
    const movies = JSON.parse(localStorage.getItem('favsearch')) ? JSON.parse(localStorage.getItem('favsearch')) : {
        results: []
    };
    
    store.dispatch({
      type: 'FAV_LIST',
      searchTerm: '',
      searchResults: movies.results
    });
}

const init = (document, window) => {
  const compareResults = new WeakMap();
  const compareList = new WeakMap();

  window.addEventListener('load', () => {
    store.dispatch({
      type: 'DEFAULT'
    });

    getFavMoviesOnLoad()
  });

  document.querySelector('#moviesearch').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const searchTerm = evt.target.movie.value;
    searchForMovie(searchTerm);
    store.dispatch({
      type: 'SEARCH_START',
      searchTerm,
    });
  });

  document.querySelector('#pagination').addEventListener('click', (evt) => {
    evt.preventDefault();
    const { searchTerm } = { ...store.getState() };
    const pgeNo = parseInt(evt.target.getAttribute('href').slice(1), 10);
    if (!searchTerm) {
      const listName = store.getState().selectedList;
      if (!listName) {
        
      } else {
        const movies = getMovieLists(listName, pgeNo);
        store.dispatch({
          ...movies,
          type: 'MOVIES_FOR_SELECTED_LIST',
        });
      }
    } else {
      searchForMovie(searchTerm, pgeNo);
      store.dispatch({
        type: 'SEARCH_START',
        searchTerm,
      });
    }
  });

  document.querySelector('.favMovies').addEventListener('click', (evt) => {

      const movies = getMovieLists();

      store.dispatch({
        ...movies,
        type: 'MOVIES_FOR_SELECTED_LIST',
      });

});


  store.subscribe(() => {
    const stor = { ...store.getState() };
    console.log("calling no suc..")
    const response = stor.searchResults;
    console.log(stor)
    if (response) {
      const movieListContent = moviesList(response);
      const resultContainer = document.querySelector('#resultContainer');
      compareResults.set(response, movieListContent);
      resultContainer.innerHTML = '';
      resultContainer.appendChild(movieListContent);

      for (let i=0; i<resultContainer.getElementsByClassName("btn").length; i++) {
          resultContainer.getElementsByClassName("btn")[i].addEventListener('click', function (e) {
              let targetEle = e.target;
              let id = targetEle.getAttribute('id').substring(8, targetEle.getAttribute('id').length);
              targetEle.style.visibility = 'hidden';
              addToFavList(id);
          });
      }

      if (stor.totalPages) {
        const pgeContainer = document.querySelector('#pagination');
        pgeContainer.innerHTML = '';
        if (stor.totalPages > 10) {
          const min = (stor.currPge > 4) ? stor.currPge - 3 : 1;
          const max = min + 10;
          pgeContainer.appendChild(pagination({ totalPages: stor.totalPages, min, max }));
        } else {
          pgeContainer.appendChild(pagination({ totalPages: stor.totalPages, min: 0, max: 0 }));
        }
        pgeContainer.querySelector(`li.item-${stor.currPge}`).className += ' active';
      }
    }
  });


};

module.exports = init;
