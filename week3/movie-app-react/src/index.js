import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from 'redux';
import MovieReducers from './MovieReducers';
const store = createStore(MovieReducers);

ReactDOM.render(<App/>, document.getElementById('root'));