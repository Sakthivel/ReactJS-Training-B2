import React, {Component, Fragment} from 'react';
import Header from './Header';
import MovieList from './MovieList';


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            listOfMovies:[
                {
                    title: "ABCD",
                    releaseDate: "2018-07-02",
                    overview: "Dummy movie and one of best move in 2018, kindly go and watch it in now!",
                    posterPath: "test.png",
                    id: "12345"
                },
                {
                    title: "EFGH",
                    releaseDate: "2018-07-02",
                    overview: "Dummy movie and one of best move in 2018, kindly go and watch it in now!",
                    posterPath: "test.png",
                    id: "67890"
                },
                {
                    title: "IJKL",
                    releaseDate: "2018-07-02",
                    overview: "Dummy movie and one of best move in 2018, kindly go and watch it in now!",
                    posterPath: "test.png",
                    id: "23456"
                }
            ]
        }
    }
    render() {
        return <Fragment>
            <Header store={store} loadState={this.state.listOfMovies}/>
            <MovieList movieResult={this.state.listOfMovies}/>
        </Fragment>;
    }
}

store.dispatch({type: "default"});