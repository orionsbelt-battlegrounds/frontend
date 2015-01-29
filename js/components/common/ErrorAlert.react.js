"use strict";

var React = require('react');

module.exports = React.createClass({

  render: function () {
    if(!this.props.token) {
      return null;
    }
    return (
      <div className="alert alert-dismissable alert-danger">
        {this.props.token}
      </div>
    );
  }

});
