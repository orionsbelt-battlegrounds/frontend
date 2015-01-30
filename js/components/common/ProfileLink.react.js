"use strict";

var React = require('react');
var Link = require('./Link.react.js');

module.exports = React.createClass({

  render: function () {
    var label = this.props.token || this.props.username;
    return (
      <Link to="profile" params={{username:this.props.username}}>{label}</Link>
    );
  }

});
