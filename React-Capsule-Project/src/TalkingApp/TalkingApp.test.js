const { createStore } = require('redux');
const TalkingApp = require('.');
const should = require('chai').should();

describe('TalkingApp unit testing', function() {

  it('should SET_USERNAME', function() {

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
    store.getState().username.equal('sakthi');
  });
});
