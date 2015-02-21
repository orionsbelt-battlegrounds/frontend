"use strict";

var React = require('react');
var Link = require('./Link.react.js');

module.exports = React.createClass({

  render: function () {
    var username = this.props.username;
    if(!username) {
      return (<span>?</span>);
    }
    if(username.lastIndexOf("anonymous:", 0) === 0) {
      username = "anonymous";
    }
    var label = this.props.token || username;
    return (
      <Link to="profile" params={{username:username}}>{label}</Link>
    );
  }

});
