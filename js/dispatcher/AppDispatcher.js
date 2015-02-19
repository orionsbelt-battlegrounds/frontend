"use strict";

var _ = require('mori');
var Dispatcher = require('flux').Dispatcher;
var instance = new Dispatcher();

module.exports = {

  dispatch: function dispatch(action) {
    instance.dispatch(action);
  },

  autoDispatch: function autoDispatch(store) {
    instance.register(function(action) {
      var actionType = _.get(action, "actionType");
      if(store[actionType]) {
        store[actionType](action);
      }
    });
  }

};
