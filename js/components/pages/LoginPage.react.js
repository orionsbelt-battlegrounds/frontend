var Router = require('react-router');
var React = require('react');
var Navigation = Router.Navigation;
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var LoginPage = React.createClass({

  mixins: [Navigation],

  render: function () {
    return (
      <div className="col-lg-6 well bs-component">
        <form className="form-horizontal">
          <fieldset>
            <legend>Login</legend>
            <div className="form-group">
              <label htmlFor="inputUsername" className="col-lg-2 control-label">Username</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="inputUsername" placeholder="Your username..." />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-lg-2 control-label">Password</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="inputPassword" placeholder="Your password..." />
              </div>
            </div>
          </fieldset>

          <div className="col-lg-10 col-lg-offset-2">
            <button onClick={this.onCancel} className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

        </form>
      </div>
    );
  },

  onCancel : function(ev) {
    this.transitionTo('root');
  }
});

module.exports = LoginPage;
