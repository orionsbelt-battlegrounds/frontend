var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SettingsStore = require('../../stores/SettingsStore.js');
var SettingsActions = require('../../actions/SettingsActions.js');

var OpenGames = require('../games/OpenGames.react.js');
var PlayerGames = require('../games/PlayerGames.react.js');
var Link = require('../common/Link.react.js');

function tabCss(current, tab) {
  if(current === tab) {
    return "active";
  }
  return "";
}

function tabContentCss(current, tab) {
  var base = "tab-pane fade";
  if(current === tab) {
    return base + " active in";
  }
  return base;
}

function tabChangedHandler(tabName) {
  return function tabChanged(ev) {
    SettingsActions.lobbyTabChanged(tabName);
  };
}

var LobbyLayout = React.createClass({

  getInitialState: function getInitialState() {
    return {selectedTab: SettingsStore.selectedLobbyTab()};
  },

  componentDidMount: function() {
    SettingsStore.addLobbyTabChangedListener(this.onLobbyTabChanged);
  },

  componentWillUnmount: function() {
    SettingsStore.removeLobbyTabChangedListener(this.onLobbyTabChanged);
  },

  onLobbyTabChanged: function onLobbyTabChanged(tabName) {
    this.setState({selectedTab:tabName});
  },

  render: function () {
    var selectedTab = this.state.selectedTab;
    return (
      <div className="row">
        <div className="col-lg-9">
          <ul className="nav nav-tabs">
            <li className={tabCss(selectedTab, "openGames")}><a href="#openGames" onClick={tabChangedHandler("openGames")} data-toggle="tab">Open Games</a></li>
            <li className={tabCss(selectedTab, "playerGames")}><a href="#yourGames" onClick={tabChangedHandler("playerGames")} data-toggle="tab">Your Games <span className="label label-warning">3</span></a></li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div className={tabContentCss(selectedTab, "openGames")} id="openGames">
              <OpenGames />
            </div>
            <div className={tabContentCss(selectedTab, "playerGames")} id="playerGames">
              <PlayerGames />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <Link to="createFriendlyGame" className="btn btn-primary">Create game</Link>
        </div>
      </div>
    );
  }

});

module.exports = LobbyLayout;
