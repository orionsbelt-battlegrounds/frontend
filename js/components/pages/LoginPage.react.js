"use strict";

var Router = require('react-router');
var React = require('react');
var Navigation = Router.Navigation;
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var ErrorAlert = require('../common/ErrorAlert.react.js');
var CurrentUserActions = require('../../actions/CurrentUserActions.js');
var CurrentUserStore = require('../../stores/CurrentUserStore.js');

var LoginPage = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {verifying: false};
  },

  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.onCurrentUserChanged);
    CurrentUserStore.addLoginErrorsListener(this.onLoginErrors);
  },

  componentWillUnmount: function() {
    CurrentUserStore.removeChangeListener(this.onCurrentUserChanged);
    CurrentUserStore.removeLoginErrorsListener(this.onLoginErrors);
  },

  render: function () {

    var disabled = "";
    if(this.state.verifying) {
      disabled = "disabled";
    }

    return (
      <div className="row">
        <div className="col-lg-6 well bs-component">

          <ErrorAlert token={this.state.error} />

          <form className="form-horizontal">
            <fieldset>
              <legend>Login</legend>
              <div className="form-group">
                <label htmlFor="inputUsername" className="col-lg-2 control-label">Username</label>
                <div className="col-lg-10">
                  <input autoFocus={true} ref="username" type="text" className="form-control" disabled={disabled} id="inputUsername" placeholder="Your username..." />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                  <input ref="password" type="password" className="form-control" disabled={disabled} id="inputPassword" placeholder="Your password..." />
                </div>
              </div>
            </fieldset>

            <div className="col-lg-10 col-lg-offset-2">
              <button onClick={this.onCancel} type="button" disabled={disabled} className="btn btn-default">Cancel</button>
              <button onClick={this.onVerify} type="submit" disabled={disabled} className="btn btn-primary">Login</button>
            </div>

          </form>
        </div>
      </div>
    );
  },

  onVerify : function(ev) {
    this.setState({verifying: true});
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    CurrentUserActions.verifyUsername(username, password);
  },

  onLoginErrors : function(ev) {
    this.setState({verifying: false, error:"InvalidCredentials"});
    this.refs.username.getDOMNode().focus();
  },

  onCancel : function(ev) {
    this.transitionTo('root');
  },

  onCurrentUserChanged: function onChange() {
    this.transitionTo('root');
  }

});

module.exports = LoginPage;
