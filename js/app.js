'use strict';

var React = require('react');
var router = require('./utils/router');

router.run(function(Handler, state){
  React.render(<Handler {...state} />, document.getElementById("obb"));
});
