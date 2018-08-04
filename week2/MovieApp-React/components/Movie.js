import React, { Fragment } from 'react';
import { AddListHtml } from './CollectionForm';

const Poster = ({posterpath, title}) => {
  return <div className="col poster col-12 col-md-3 col-sm-12">
    <img src={posterpath} alt={title} />
  </div>
};

const GenerateListInCard = ({list, remove}) => {
  if (!list) {
    return 'Add to a List';
  }
  return list.map((item, i) => <span className='list-item badge badge-pill badge-info' key={i}>
    {item} <a href='#' className='delete close' onClick={remove}>remove</a>
  </span>);
};

const Details = (props) => {
  return <div className="col col-md-7 col-sm-12 col-12 mov-details" data-movietitle={encodeURI(props.title)} data-year={props.year} data-vote={props.avgVotes} data-popularity={props.popularity} data-desc={encodeURI(props.descreption)} data-id={props.id} data-posterpath={props.posterpath}>
    <h3 className="mov-title">{props.title}</h3>
    <p className="year">
      {props.year}
    </p>
    <p className="in-lists">
    <span className="list-items">
      <GenerateListInCard list={props.list} remove={props.remove} />
    </span>
    </p>

    <p className="desc">
      {props.descreption}
    </p>
  </div>
}

const Movie = ({details, keyup, change, remove}) => {
  return <Fragment>
    <Poster posterpath={details.posterpath || details.poster_path} title={details.title} />
    <Details
      title={details.title}
      year={details.year}
      avgVotes={details.avgVotes}
      popularity={details.popularity}
      descreption={details.overview}
      posterpath={details.posterpath || details.poster_path}
      id={details.id}
      list={details.list}
      remove={remove}
    />
    <AddListHtml id={details.id} keyup={keyup} change={change}/>
  </Fragment>
}

module.exports = Movie;
