import React, {Component, Fragment} from 'react';

export default class MovieList extends Component {
    render() {
        return <Fragment>
            <div className="container">
                <div className="row">
                    {this.props.movieResult.map(movie =>
                        <div className="col-sm" key={movie.id}>
                            <div className="card">
                                <img className="card-img-top" src=".../posterPath" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">{movie.releaseDate}</p>
                                    <p className="card-text">{movie.overview}</p>
                                    <a href="#" className="btn btn-primary">Add to Fav</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>;
    }
}
