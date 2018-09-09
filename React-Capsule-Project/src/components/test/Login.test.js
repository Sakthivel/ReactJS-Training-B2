import React from 'react';
import Login from '../Login';
import {
    configure,
    shallow,
    mount,
    render
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import TextField from '@material-ui/core/TextField';

configure({
    adapter: new Adapter()
});

describe("<login />", function() {
  it('should render <Login /> component title section', function() {
    const login = shallow( <Login /> );
    expect(login.find('h1')).to.have.length(1);
    expect(login.find('h1').text()).to.be.a('string');
    expect(login.find('h1').text()).to.equal('Talking App');
  });

  it('should render <Login /> component form section', function () {
      const login = shallow( <Login /> );
      expect(login.find('form')).to.have.length(1);
      expect(login.find('#name')).to.have.length(1);
      expect(login.find('#name').type()).to.equal(TextField);
  });
});