import { createStore }  from 'redux';
import TalkingApp from '../';
const should = require('chai').should();
const expect = require('chai').expect;

describe('TalkingApp unit testing', function() {

  it('should GET_USERNAME', function() {
    const currState = {
        username: ''
    };

    const store = createStore(TalkingApp, currState);

    const action = {
      type: 'GET_USERNAME',
      username : 'sakthi'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('sakthi');
  });

  it('should SET_USERNAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(TalkingApp, currState);

    const action = {
      type: 'SET_USERNAME',
      username : 'sakthi'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('screen');
    store.getState().should.have.property('username').and.equal('sakthi');
    store.getState().should.have.property('screen').and.equal('Chat');
  });

  it('should SET_MESSAGE', function() {

    const currState = {
        username: 'sakthi',
    };

    const store = createStore(TalkingApp, currState);

    const action = {
      type: 'SET_MESSAGE',
      messages : 'Hello Friends!'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('screen');
    store.getState().should.have.property('messages');
    store.getState().should.have.property('username').and.equal('sakthi');
    store.getState().should.have.property('screen').and.equal('Chat');
    store.getState().should.have.property('messages').and.equal('Hello Friends!');
  });

  it('should SET_NEW_ROOM', function() {

    const currState = {
        username: 'sakthi',
    };

    const store = createStore(TalkingApp, currState);

    const action = {
      type: 'SET_NEW_ROOM',
      room: {
          id: 100
      }
    };

    store.dispatch(action);

    const messageText = store.getState().messages[0].text;

    store.getState().should.have.property('username');
    store.getState().should.have.property('screen');
    store.getState().should.have.property('messages');
    store.getState().should.have.property('username').and.equal('sakthi');
    store.getState().should.have.property('screen').and.equal('Chat');
    store.getState().should.have.property('messages').to.be.a('array');
    expect(messageText).to.equal('NEW ROOM HAS CREATED!!');
  });

  it('should SET_NEW_USER', function() {

    const currState = {
        username: 'sakthi',
    };

    const store = createStore(TalkingApp, currState);

    const action = {
      type: 'SET_NEW_USER',
      roomId: '123',
      user: 'hello'
    };

    store.dispatch(action);

    const messageText = store.getState().messages[0].text;

    store.getState().should.have.property('username');
    store.getState().should.have.property('screen');
    store.getState().should.have.property('messages');
    store.getState().should.have.property('username').and.equal('sakthi');
    store.getState().should.have.property('screen').and.equal('Chat');
    store.getState().should.have.property('messages').to.be.a('array');
    expect(messageText).to.equal('NEW USER HAS ADDED HERE!!');
  });

});
