import React from 'react';
import Movie from './Movie';

const Movies = (props) => {
  return <ul>
    {props.movies.map(m => <div className="row" key={m.id}> <Movie details={m} keyup={props.keyup} change={props.change} remove={props.remove} /> </div> )}
  </ul>
}

export default Movies;