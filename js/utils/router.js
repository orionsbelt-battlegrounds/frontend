'use strict';

var ReactRouter = require('react-router');
var LocationHandler = ReactRouter.HistoryLocation;
var routes = require('../routes');

var router = ReactRouter.create({
  location: LocationHandler,
  routes: routes
});

module.exports = router;
