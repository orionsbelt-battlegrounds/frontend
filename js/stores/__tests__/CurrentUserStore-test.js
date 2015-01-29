"use strict";

jest.dontMock('../CurrentUserStore.js');
jest.dontMock('../../actions/CurrentUserActions.js');
jest.dontMock('object-assign');

describe('CurrentUserStore', function() {

  var AppDispatcher;
  var CurrentUserStore;
  var CurrentUserActions;
  var processCurrentUserStore;

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    CurrentUserStore = require('../CurrentUserStore');
    CurrentUserActions = require('../../actions/CurrentUserActions');
    processCurrentUserStore = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should yield error for invalid user', function() {
    var data = CurrentUserActions.verifyUsernameData("user", "pass");

    var emitChange = jest.genMockFunction();
    CurrentUserStore.emitChange = emitChange;

    processCurrentUserStore(data)
    jest.runAllTimers();

    expect(emitChange.mock.calls[0][0]).toEqual("LoginErrors");
  });

  it('should succeed for a valid user', function() {
    var data = CurrentUserActions.verifyUsernameData("donbonifacio", "pass");

    var emitChange = jest.genMockFunction();
    CurrentUserStore.emitChange = emitChange;

    processCurrentUserStore(data)
    jest.runAllTimers();

    expect(emitChange.mock.calls[0][0]).toEqual("CurrentUserChanged");
  });

});
