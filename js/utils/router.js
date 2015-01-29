'use strict';

var ReactRouter = require('react-router');
var routes = require('../routes');

var LocationHandler = ReactRouter.HistoryLocation;
if(process.env.NODE_ENV !== 'production' ) {
  LocationHandler = ReactRouter.HashLocation;
}

var router = ReactRouter.create({
  location: LocationHandler,
  routes: routes
});

module.exports = router;
