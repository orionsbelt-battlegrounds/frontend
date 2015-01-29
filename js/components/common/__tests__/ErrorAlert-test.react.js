"use strict";

jest.dontMock('object-assign');
jest.dontMock('../ErrorAlert.react.js');

var React = require('react/addons');
var ErrorAlert = require('../ErrorAlert.react.js');
var TestUtils = React.addons.TestUtils;

describe('ErrorAlert', function() {

  it('does not render if token is not provided', function() {
    var component = TestUtils.renderIntoDocument(
      <ErrorAlert token={null} />
    );

    var elems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'alert-danger');
    expect(elems[0]).toBeUndefined();
  });

  it('does render if token is provided', function() {
    var component = TestUtils.renderIntoDocument(
      <ErrorAlert token="Test" />
    );

    var elems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'alert-danger');
    expect(elems[0]).toBeDefined();
  });

});
