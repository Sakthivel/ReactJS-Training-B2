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

// function getPopularMovies(pge) {
//   getPopularlists(pge).then((data) => {
//     store.dispatch({
//       type: 'POPUPULAR_CONTENT_DISPLAY',
//       searchResults: data,
//     });
//   });
// }

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

function processListToStorage(list) {
  collectionService.saveCollectionList(list);
}

function getUpdatedMovies() {
  const storeData = { ...store.getState() };
  if (storeData.selectedList) {
    return { ...getMovieLists(storeData.selectedList, storeData.currPge) };
  }

  if (storeData.searchTerm) {
    searchForMovie(storeData.searchTerm, storeData.currPge);
  } else {
    //getPopularMovies(storeData.currPge);
  }
  return false;
}

function getFavMoviesOnLoad() {
    const movies = JSON.parse(localStorage.getItem('moviesearch')) ? JSON.parse(localStorage.getItem('moviesearch')) : {
        results: []
    };
    console.log("  temp .... ",typeof movies);

    console.log("  parse .... ",JSON.parse(movies));
    console.log("  temp .... ",typeof movies);

    console.log("  temp .... ",movies.results);
    //const initCollectionList = (Array.isArray(temp) && temp.length > 0) ? temp : ['Favourites'];
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
    //getPopularMovies();
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
        //getPopularMovies(pgeNo);
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

  // document.querySelector('#resultContainer').addEventListener('keyup', (evt) => {
  //   if (evt.target.className.search('add-to-list') >= 0 && evt.code === 'Enter') {
  //     store.dispatch({
  //       type: 'CUSTOM_LIST_ITEM',
  //       val: evt.target.value,
  //     });
  //
  //     const movie = getParent(evt.target, 'row').querySelector('.mov-details').dataset;
  //     const listName = evt.target.value;
  //     collectionService.addMovieToList(movie, listName);
  //     getUpdatedMovies();
  //   }
  // });
  //
  // document.querySelector('#resultContainer').addEventListener('change', (evt) => {
  //   if (evt.target.className.search('add-to-list') >= 0) {
  //     store.dispatch({
  //       type: 'CUSTOM_LIST_ITEM',
  //       val: evt.target.value,
  //     });
  //     const movie = getParent(evt.target, 'row').querySelector('.mov-details').dataset;
  //     const listName = evt.target.value;
  //     collectionService.addMovieToList(movie, listName);
  //     getUpdatedMovies();
  //   }
  // });


  document.querySelector('.favMovies').addEventListener('click', (evt) => {

      const movies = getMovieLists();

      store.dispatch({
        ...movies,
        type: 'MOVIES_FOR_SELECTED_LIST',
      });

});

  // document.querySelector('#resultContainer').addEventListener('click', (evt) => {
  //   if (evt.target.className.search('delete') >= 0) {
  //     evt.preventDefault();
  //     const movieEl = getParent(evt.target, 'mov-details');
  //     const listToBeRemoved = movieEl.querySelector('.in-lists .list-item').firstChild.textContent.trim();
  //     const movid = movieEl.dataset.id;
  //     store.dispatch({
  //       type: 'MOVIE_REMOVED_FROM_LIST',
  //       name: listToBeRemoved,
  //     });
  //     collectionService.removeMovieFromList(movid, listToBeRemoved);
  //     const movies = getUpdatedMovies();
  //     if (movies) {
  //       store.dispatch({
  //         type: 'UPDATED_MOVIES_FROM_LIST',
  //         ...movies,
  //       });
  //     }
  //   }
  // });


  store.subscribe(() => {
    const stor = { ...store.getState() };
    console.log("calling no suc..")
    const response = stor.searchResults;
    console.log(stor)
    if (response) {
      // if (compareResults.has(response)) {
      //   return;
      // }
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


  // store.subscribe(() => {
  //   const list = store.getState().customList;
  //   console.log("calling list suc..")
  //   console.log(list)
  //   if (compareList.has(list)) {
  //     return;
  //   }
  //   processListToStorage(list);
  //   const dataList = getCollectionsListHtml(list);
  //   const menuList = getCollectionMenu(list);
  //   compareList.set(list, dataList);
  //   const el = document.querySelector('#collections');
  //   el.innerHTML = dataList;
  // });
};

module.exports = init;
