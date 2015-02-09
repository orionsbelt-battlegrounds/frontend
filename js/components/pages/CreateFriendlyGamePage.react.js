"use strict";

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ErrorAlert = require('../common/ErrorAlert.react.js');
var GameActions = require('../../actions/GameActions.js');
var GameStore = require('../../stores/GameStore.js');

var CreateFriendlyGamePage = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {creating: false};
  },

  componentDidMount: function() {
    GameStore.addGameCreatedListener(this.onGameCreated);
  },

  componentWillUnmount: function() {
    GameStore.removeGameCreatedListener(this.onGameCreated);
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

            <fieldset>
              <legend>Create friendly game</legend>
            </fieldset>

            <div className="col-lg-10 col-lg-offset-2">
              <button onClick={this.onCancel} type="button" disabled={disabled} className="btn btn-default">Cancel</button>
              <button onClick={this.onCreate} type="button" disabled={disabled} className="btn btn-primary">Create game</button>
            </div>

        </div>
      </div>
    );
  },

  onCancel : function(ev) {
    this.transitionTo('lobby');
  },

  onCreate : function(ev) {
    this.setState({creating: true});
    GameActions.createFriendly();
  },

  onGameCreated: function(game) {
    this.transitionTo('lobby');
  }

});

module.exports = CreateFriendlyGamePage;
