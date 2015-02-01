"use strict";

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ErrorAlert = require('../common/ErrorAlert.react.js');

var CreateFriendlyGamePage = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {creating: false};
  },

  render: function () {

    var disabled = "";
    if(this.state.creating) {
      disabled = "disabled";
    }

    return (
      <div className="row">
        <div className="col-lg-6 well bs-component">

          <ErrorAlert token={this.state.error} />

          <form className="form-horizontal">
            <fieldset>
              <legend>Create friendly game</legend>
            </fieldset>

            <div className="col-lg-10 col-lg-offset-2">
              <button onClick={this.onCancel} type="button" disabled={disabled} className="btn btn-default">Cancel</button>
              <button onClick={this.onCreate} type="submit" disabled={disabled} className="btn btn-primary">Create game</button>
            </div>

          </form>
        </div>
      </div>
    );
  },

  onCancel : function(ev) {
    this.transitionTo('lobby');
  },

  onCreate : function(ev) {
  },

  onGameCreated: function(game) {
    this.transitionTo('lobby');
  }

});

module.exports = CreateFriendlyGamePage;
