import 'typeface-roboto';

import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Board extends Component {
    static propTypes = {
        name: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
                lists: [
                    {
                        id: "1",
                        name: "My First List",
                        cards: [
                            {
                                id: "11",
                                text: "Hello"
                            },
                            {
                                id: "12",
                                text: "Hi"
                            }
                        ]
                    },
                    {
                        id: "2",
                        name: "My Second List",
                        cards: [{
                                id: "21",
                                text: "Hey"
                            },
                            {
                                id: "22",
                                text: "Dude"
                            }
                        ]
                    }
                ]
            };
    }
    render() {
        return (
            <ul>
                {this.state.lists.map(list => <li key={list.is}>
                <List data={list}>
                    <p>{this.state.lists[0].name}</p>
                    <ul>
                        {this.state.lists[0].cards.map(card => <li key={card.id}>
                        <Card>{card.text}</Card>
                        </li>)}
                    </ul>
                </List>
                </li>)}
            </ul>
        );
    }
}

class List extends Component {
    static propTypes = {
        name: PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (<Fragment>
            {this.props.children}
        </Fragment>);
        }
}


class Card extends Component {
    static propTypes = {
        name: PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    render() {
        return ( <Fragment> {this.props.children}</Fragment>);
        }
}

ReactDOM.render( <Board /> , document.getElementById('root'));
