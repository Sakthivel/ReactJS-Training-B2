import { createStore }  from 'redux';
import TalkingApp from '../';
const should = require('chai').should();

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
    store.getState().should.have.property('screen').and.equal('ChattingSection');
  });

});
