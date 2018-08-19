import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import List from './List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const styles = {
  flexContainer: {
    display: 'flex',
    color: 'blue'
  },
  flexItem: {
    width: '300px',
    height: '75px',
    padding: '0.5em'
  }
}

class Board extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    currentBoard: PropTypes.number,
    getCurrentBoard: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      addingList: false,
      addListTitle: ''
    };
  }

  componentDidMount() {
    this.props.getCurrentBoard(this.props.id);
  }

  handleCreateList(event) {
    event.preventDefault();
    const lists = [...this.state.lists, {
      id: Math.random()*879979224,
      name: this.state.addListTitle,
      cards: []
    }];

    this.setState({lists, addListTitle: ''});
    this.saveBoard();
  }

  handleListUpdate(listId, newValue) {
    const index = this.state.lists.findIndex(list => list.id === listId);
    const list = this.state.lists[index];
    const newList = Object.assign({}, list, {name: newValue});
    const lists = [...this.state.lists.slice(0, index), newList, ...this.state.lists.slice(index+1)];

    this.setState({lists});
    this.saveBoard();
  }

  handleCreateCard(listId, cardText) {
    const index = this.state.lists.findIndex(list => list.id === listId);
    const list = this.state.lists[index];
    const cards = [...list.cards, {id: Math.random()*879792374, text: cardText}]

    const newList = Object.assign({}, list, {cards});

    const lists = [...this.state.lists.slice(0, index), newList, ...this.state.lists.slice(index+1)];
    this.setState({lists});
    this.saveBoard();
  }

  handleCardUpdate(listId, cardId, newValue) {
    const listIndex = this.state.lists.findIndex(list => list.id === listId);
    const list = this.state.lists[listIndex];
    const cardIndex = list.cards.findIndex(card => card.id === cardId);
    const card = list.cards[cardIndex];

    console.log('listIndex:', listIndex);
    console.log('cardIndex:', cardIndex);

    const updatedCards = [...list.cards.slice(0, cardIndex), {id: cardId, text: newValue}, ...list.cards.slice(cardIndex+1)];
    const updatedList = Object.assign({}, list, {cards: updatedCards});

    const lists = [...this.state.lists.slice(0, listIndex), updatedList, ...this.state.lists.slice(listIndex+1)];
    this.setState({lists});
    this.saveBoard();
  }

  saveBoard() {
    setTimeout(() => {
      const {id, name, lists} = this.state;
      axios.put(`/api/board/${id}`, {id, name, lists}).then(result => console.log('Updated State'));
    });
  }

  handleAddListBlur() {
    this.setState({addingList: false});
  }

  handleAddListButton() {
    this.setState({addingList: true});
  }

  handleTitleChange(event) {
    this.setState({addListTitle: event.target.value});
  }

  mapStateToPropsList(listId, state) {
    
  }

  mapDispatchToPropsList(listId, dispatch) {
    
  }

  render() {
    const lists = this.props.currentBoard ? this.props.currentBoard.lists : [];

    return (
      <Fragment>
        <div style={styles.flexContainer}>
          {lists.map(list => (
            <List
              styles={styles.flexItem}
              key={list.id}
              data={list}
              onCreateCard={this.handleCreateCard.bind(this, list.id)}
              onCardUpdate={this.handleCardUpdate.bind(this, list.id)}
              onListUpdate={this.handleListUpdate.bind(this, list.id)}
            />
          ))}

          {this.state.addingList ? (
            <form onSubmit={this.handleCreateList.bind(this)}>
              <TextField
                style={styles.flexItem}
                autoFocus
                fullWidth
                value={this.state.addListTitle}
                onChange={this.handleTitleChange.bind(this)}
                onBlur={this.handleAddListBlur.bind(this)}
                placeholder="List Name"
              />
            </form>
          ) : (
            <Button
              color="secondary"
              fullWidth
              style={styles.flexItem}
              onClick={this.handleAddListButton.bind(this)}
            >
              New List
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentBoard: state.currentBoard
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentBoard: (boardId) => dispatch({
    type: 'GET_CURRENT_BOARD',
    payload: {boardId}})
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
