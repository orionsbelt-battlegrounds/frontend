'use strict';

var ReactRouter = require('react-router');
var HashLocation = ReactRouter.HashLocation;
var routes = require('../routes');

var router = ReactRouter.create({
  location: HashLocation,
  routes: routes
});

module.exports = router;
