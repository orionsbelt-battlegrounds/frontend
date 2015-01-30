"use strict";

var Router = require('react-router');
var React = require('react');

var ProfilePage = React.createClass({

  mixins: [ Router.State ],

  render: function () {
    return (
      <div className="page-header">
        <h1 id="navbar">{this.getParams().username}</h1>
      </div>
    );
  }

});

module.exports = ProfilePage;
