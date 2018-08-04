import React, { Component, Fragment} from "react";

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.name = '';
  }

  handleInputChange(evt) {
    evt.preventDefault();
    this.setState({
      ...this.state, name: evt.target.value
    });

    if(this.props.change) {
      this.props.change(evt);
    } else {
      console.log('ERR:: Send change prop');
    }
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    console.log('ERR:: Send submit prop');
  }

  render() {
    return (<form className="form-inline my-2 my-lg-0" id="navsearch" onSubmit={this.props.submit || this.handleFormSubmit.bind(this)}>
      <input type="search" className="form-control mr-sm-2"
        id="searchInput"
        placeholder="Enter movie name"
        value={this.state.name}
        onChange={this.handleInputChange.bind(this)}
      />
      <button type="submit" className="btn btn-primary my-2 my-sm-0">Search</button>
    </form>);
  }
}

export default SearchForm;
