import ReactDOM from 'react-dom';
import React, { Component, Fragment} from 'react';
import Nav from './Nav';
import Movies from './MoviesList';
import { searchMovie, storageService, parent, getPopular, getMoviesForList } from '../services';
import { CollectionList } from "./CollectionForm";

class MovieApp extends Component {
  constructor() {
    super();
    const collectionsList = storageService.getCollectionsListFromLocal();
    this.state = {
      movieData: {
        movies:[]
      },
      collections:[...collectionsList],
    };
    this.getPopularMovies();
  }

  getPopularMovies(pge) {
    getPopular(pge).then((data) => {
      let min, max;
      if (data.total_pages > 10) {
        min = (data.page > 4) ? data.page - 3 : 1;
        max = min + 10;
      }
      this.setState({
        movieData: {
          movies: data.results,
        },
        totalPages: data.total_pages,
        currPge: data.page,
        selectedList: '',
        min,
        max,
        name: '',
      });
    });
  }

  searchForMovie(page) {
    searchMovie(this.state.name, page).then((data) => {
      let min, max;
      if (data.total_pages > 10) {
        min = (data.page > 4) ? data.page - 3 : 1;
        max = min + 10;
      }
      this.setState({
        movieData: {
          movies: data.results,
        },
        totalPages: data.total_pages,
        currPge: data.page,
        selectedList: '',
        min,
        max
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getUpdatedMovies() {
    const storeData = { ...this.state };
    if (storeData.selectedList) {
      return { ...getMoviesForList(storeData.selectedList, storeData.currPge) };
    }

    if (storeData.name) {
      this.searchForMovie(storeData.name, storeData.currPge);
    } else {
      this.getPopularMovies(storeData.currPge);
    }
    return false;
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    this.searchForMovie();
  }

  handleInputChange(evt) {
    evt.preventDefault();
    this.setState({
      name: evt.target.value
    });
    console.log(this.state);
  }

  handlePaginationClick(evt) {
    evt.preventDefault();
    const { name } = { ...this.state };
    const pgeNo = parseInt(evt.target.getAttribute('href').slice(1), 10);
    if (!name) {
      const listName =this.state.selectedList;
      if (!listName) {
        this.getPopularMovies(pgeNo);
      } else {
        const movies = getMoviesForList(listName, pgeNo);
        this.setState({
          movieData: {
            movies: movies.value,
          },
          totalPages: movies.pageCount,
          currPge: movies.currentPage,
        });
      }
    } else {
      this.searchForMovie(pgeNo);
    }
  }

  handleCollectionKeyup(evt) {
    evt.preventDefault();
    if(evt.key === 'Enter') {
      if (this.state.collections.indexOf(evt.target.value) < 0) {
        this.setState({
          collections:[
            ...this.state.collections,
            evt.target.value,
          ]
        });
        storageService.saveCollectionList([...this.state.collections, evt.target.value]);
      }
      this.handleCollectionChange(evt, true);
    }
  }

  handleCollectionChange(evt, isFromKeyup = false) {
    evt.preventDefault();
    if (this.state.collections.indexOf(evt.target.value) >= 0 || isFromKeyup) {
      const movie = parent(evt.target, 'row').querySelector('.mov-details').dataset;
      const listName = evt.target.value;
      storageService.addMovieToList(movie, listName);
      const movies = this.getUpdatedMovies();
      if (movies) {
        let min, max;
        if (movies.total_pages > 10) {
          min = (movies.page > 4) ? movies.page - 3 : 1;
          max = min + 10;
        }
        this.setState({
          movieData: {
            movies: movies.value,
          },
          totalPages: movies.pageCount,
          currPge: movies.currentPage,
          min,
          max
        })
      }
    }
  }

  handleMenuClick(evt) {
    if (evt.target.className.search('dropdown-item') >= 0) {
      const listName = evt.target.getAttribute('href').slice(1);
      this.setState({
        selectedList: listName,
        name:''
      });
      const movies = getMoviesForList(listName);
      let min, max;
      if (movies.total_pages > 10) {
        min = (movies.page > 4) ? movies.page - 3 : 1;
        max = min + 10;
      }
      this.setState({
        movieData: {
          movies: movies.value,
        },
        totalPages: movies.pageCount,
        currPge: movies.currentPage,
        selectedList: listName,
        min,
        max,
        name: '',
      });
    }
  }

  removeItemFromList(evt) {
    evt.preventDefault();
    const movieEl = parent(evt.target, 'mov-details');
    const listToBeRemoved = parent(evt.target, 'list-item').firstChild.textContent.trim();
    const movid = movieEl.dataset.id;
    storageService.removeMovieFromList(movid, listToBeRemoved);
    const movies = this.getUpdatedMovies();
    // console.log(movies);
    if (movies) {
      let min, max;
      if (movies.total_pages > 10) {
        min = (movies.page > 4) ? movies.page - 3 : 1;
        max = min + 10;
      }
      this.setState({
        movieData: {
          movies: movies.value,
        },
        totalPages: movies.pageCount,
        currPge: movies.currentPage,
        min,
        max
      })
    }
  }

  render() {
    return <Fragment>
    <Nav
      list={this.state.collections}
      submit={this.handleFormSubmit.bind(this)}
      change={this.handleInputChange.bind(this)}
      menuclick={this.handleMenuClick.bind(this)}
    />
    <div className="container content-wrapper" id="wrapper">

      <Movies movies={this.state.movieData.movies}
        keyup={this.handleCollectionKeyup.bind(this)}
        change={this.handleCollectionChange.bind(this)}
        remove={this.removeItemFromList.bind(this)}
      />

      
      <div className="hidden collection-data">
        <CollectionList list={this.state.collections}/>
      </div>
    </div>
    </Fragment>;
  }
}

export default MovieApp;
