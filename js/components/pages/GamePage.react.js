"use strict";

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ErrorAlert = require('../common/ErrorAlert.react.js');
var GameActions = require('../../actions/GameActions.js');
var GameStore = require('../../stores/GameStore.js');

var CreatePage = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function getInitialState() {
    return {loading:true};
  },

  componentDidMount: function() {
    GameStore.addGameLoadedListener(this.onGameLoaded);
    GameActions.loadGame(this.getParams().gameId);
  },

  componentWillUnmount: function() {
    GameStore.removeGameLoadedListener(this.onGameLoaded);
  },

  onGameLoaded: function onGameLoaded(game) {
    this.setState({game:game, loading:false});
  },

  render: function () {

    if(this.state.loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        Hey... on this page you will be able to play a 1on1 game. This is what
        it looks like:
          <p/>
        <img src="https://camo.githubusercontent.com/f5fc5f992b37d31fb9b4aeb2d0d2241698779606/68747470733a2f2f7261772e6769746875622e636f6d2f6f72696f6e7362656c742d626174746c6567726f756e64732f626174746c652d656e67696e652d61692f6d61737465722f646f632f53616d706c65426f6172642e6a706567" />
        <p/>
        We are still working on this...
      </div>
    );
  }


});

module.exports = CreatePage;
