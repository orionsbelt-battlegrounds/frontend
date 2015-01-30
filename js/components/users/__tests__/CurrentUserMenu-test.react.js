"use strict";

jest.dontMock('object-assign');
jest.dontMock('../CurrentUserMenu.react.js');
jest.dontMock('../../common/Link.react.js');
jest.dontMock('../../../stores/CurrentUserStore.js');

var React = require('react/addons');
var CurrentUserMenu = require('../CurrentUserMenu.react.js');
var CurrentUserStore = require('../../../stores/CurrentUserStore.js');
var TestUtils = React.addons.TestUtils;

describe('CurrentUserMenu', function() {

  it('renders basic login if no user is set', function() {
    var component = TestUtils.renderIntoDocument(
      <CurrentUserMenu />
    );

    var elems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'noUser');
    expect(elems[0]).toBeDefined();
  });


  it('renders user menu if user is set', function() {
    CurrentUserStore.setCurrentUser({username:'donbonifacio'});

    var component = TestUtils.renderIntoDocument(
      <CurrentUserMenu />
    );

    var elems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'withUser');
    expect(elems[0]).toBeDefined();
  });

});
