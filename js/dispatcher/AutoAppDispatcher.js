"use strict";

var _ = require('mori');
var AppDispatcher = require('./AppDispatcher.js');

module.exports = {

  instance: AppDispatcher,

  dispatch: function dispatch(action) {
    AppDispatcher.dispatch(action);
  },

  autoDispatch: function autoDispatch(store) {
    AppDispatcher.register(function(action) {
      var actionType = _.get(action, "actionType");
      if(store[actionType]) {
        store[actionType](action);
      }
    });
  }

};
