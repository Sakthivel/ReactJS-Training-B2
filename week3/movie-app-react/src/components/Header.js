import React, {Component, Fragment} from 'react';

const styles = {
    navBar: {
        marginBottom: '2em'
    }
}

export default class Header extends Component {
    handlelink() {
        //alert(this.props.loadState);
        console.log(this.props.loadState);
        this.props.store.dispatch(this.props.loadState, {type: "init"});
    }
    render() {
        return <Fragment>
            <nav className = "navbar navbar-expand-lg navbar-light bg-light" style={styles.navBar}>
            <a className="navbar-brand" href="#">Movie App</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={this.handlelink.bind(this)}>Link</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> 
            </div>
            </nav>
        </Fragment>;
    }
}