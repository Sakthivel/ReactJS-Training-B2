import React, { Fragment } from "react";
import SearchForm from './SearchForm';
import { CollectionMenu } from "./CollectionForm";

const Nav = (props) => {
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Movie App</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item dropdown collection-menu">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            MyLists
          </a>
          <div className="dropdown-menu collection-list" aria-labelledby="navbarDropdown">
            <CollectionMenu list={props.list} menuclick={props.menuclick} />
          </div>
        </li>
      </ul>
      <SearchForm submit={props.submit} change={props.change} />
    </div>
  </nav>
}

export default Nav;
