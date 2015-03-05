"use strict";

var AppDispatcher = require('../dispatcher/AutoAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require("mori");
var gateway = require("../utils/gateway.js");
var CurrentUserStore = require("./CurrentUserStore.js");
var GameActions = require("../actions/GameActions.js");

var GAME_CREATED_EVENT = "GameStore#GameCreated";
var GAME_LOADED_EVENT = "GameStore#GameLoaded";
var ELEMENT_SELECTED_EVENT = "GameStore#ElementSelected";

function buildCoordinate(coord) {
  return _.vector(parseInt(coord[0]), parseInt(coord[2]));
}

function printCoordinate(coord) {
  return "[" + coord[0] + " " + coord[2] + "]";
}

function runTurnAction(callback) {
  return runDeployAction(callback);
}

function runDeployAction(callback) {
  var user = CurrentUserStore.getCurrentUser();
  var game = GameStore.currentGame;
  var actions = GameStore.currentActions;
  gateway.runActions(user, game, actions, callback, notifyError);
}

function simulateDeployActions(element, coordinate, callback, errorCallback) {
  // [:deploy 10 :rain [8 8]]
  var quantity = _.get(element, "quantity");
  var unit = _.get(element, "unit");
  var action = _.vector("deploy", quantity, unit, buildCoordinate(coordinate));
  var game = GameStore.currentGame;
  var user = CurrentUserStore.getCurrentUser();

  var actions = _.conj(GameStore.currentActions, action);

  gateway.simulateActions(user, game, actions, function success(game) {
    GameStore.currentActions = actions;
    callback(game);
  }, notifyError);
}

function simulateTurnActions(action, callback, errorCallback) {
  if(!action) {
    return;
  }
  var game = GameStore.currentGame;
  var user = CurrentUserStore.getCurrentUser();

  var actions = _.conj(GameStore.currentActions, action);

  gateway.simulateActions(user, game, actions, function success(game) {
    GameStore.currentActions = actions;
    callback(game);
  }, notifyError);
}

function notifyError(xhr) {
  var data = $.parseJSON(xhr.responseText);
  if(data.message === "ActionFailed") {
    var results = data["board"]["action-results"];
    data = results[results.length-1][1];
    alert(data.message)
  } else {
    alert(data.message);
  }
}

var GameStore = assign({}, EventEmitter.prototype, {

  selectedElement: null,
  currentGame: null,
  originalGame: null,
  currentActions: _.vector(),

  isDeploy: function isDeploy() {
    return this.currentGame && _.getIn(this.currentGame, ["board", "state"]) === "deploy";
  },

  "GameStore#loadGame": function(action) {
    var user = CurrentUserStore.getCurrentUser();
    var gameId = _.get(action, "gameId");
    var store = this;
    gateway.loadGame(user, gameId, function afterLoadGame(game) {
      store.currentGame = _.toClj(game);
      store.originalGame = store.currentGame;
      store.currentActions = _.vector();
      GameStore.emit(GAME_LOADED_EVENT, store.currentGame);
    });
  },

  "GameStore#createFriendly": function(action) {
    var user = CurrentUserStore.getCurrentUser();
    gateway.createFriendly(user, {}, function afterCreate(game) {
      GameStore.emit(GAME_CREATED_EVENT, _.toClj(game));
    });
  },

  "GameStore#unitSelected": function unitSelected(action) {
    var currentElement = _.toClj(_.get(action, "element")) || action;
    if(_.equals(currentElement, this.selectedElement)) {
      currentElement = null;
    }
    this.selectedElement = currentElement;
    console.log(_.toJs(this.selectedElement));
    GameStore.emit(ELEMENT_SELECTED_EVENT, currentElement);
  },

  "GameStore#undoLastAction": function undoLastAction() {
  },

  "GameStore#coordinateSelected": function coordinateSelected(action) {
    var coordinate = _.get(action, "coordinate");
    var store = this;
    if(this.isDeploy()) {
      if(!this.selectedElement) {
        return;
      }
      simulateDeployActions(this.selectedElement, coordinate, function success(game) {
        store.selectedElement = null;
        GameStore.emit(ELEMENT_SELECTED_EVENT, store.selectedElement);

        store.currentGame = _.toClj(game);
        GameStore.emit(GAME_LOADED_EVENT, store.currentGame);
      });
    } else {
      var code = this.getCurrentPlayerCode();
      var state = _.getIn(this.currentGame, ["board", "state"]);
      var coordStr = printCoordinate(coordinate);
      if(state === code) {
        var element = _.getIn(this.currentGame, ["board", "elements", coordStr]);
        var elementCode = _.get(element, "player");
        var action = null;
        if(elementCode === code) {
          console.log("Select " + coordStr)
          this["GameStore#unitSelected"](element);
        } else if(!element && this.selectedElement) {
          action = _.vector("goto", _.get(this.selectedElement, "coordinate"), buildCoordinate(coordinate));
          console.log("Goto " + coordStr)
        } else if(this.selectedElement){
          action = _.vector("attack", _.get(this.selectedElement, "coordinate"), buildCoordinate(coordinate));
          console.log("Attack " + coordStr)
        }
        simulateTurnActions(action, function success(game) {
          store.selectedElement = null;
          GameStore.emit(ELEMENT_SELECTED_EVENT, store.selectedElement);

          store.currentGame = _.toClj(game);
          GameStore.emit(GAME_LOADED_EVENT, store.currentGame);
        });
      }
    }
  },

  "GameStore#deploy": function deployGame(action) {
    runDeployAction(function success(game) {
      GameActions.loadGame(game["_id"]);
    });
  },

  "GameStore#sendTurn": function playTurn(action) {
    runTurnAction(function success(game) {
      GameActions.loadGame(game["_id"]);
    });
  },

  getSelectedElement: function getSelectedElement() {
    return this.selectedElement;
  },

  isCurrentUserTurn: function isCurrentUserTurn() {
    return this.getCurrentPlayerCode() === _.getIn(this.currentGame, ["board", "state"]);
  },

  getCurrentPlayerCode: function getCurrentPlayerCode(givenGame) {
    var game = givenGame || this.currentGame;
    var user = CurrentUserStore.getCurrentUser();
    var username = _.get(user, "username");
    if(username === _.getIn(game, ["p1", "name"])) {
      return "p1";
    } else if(username === _.getIn(game, ["p2", "name"])) {
      return "p2";
    }
    return null;
  }

});

var events = require("../utils/events.js");
events.configure(GameStore, "GameLoaded", GAME_LOADED_EVENT);
events.configure(GameStore, "GameCreated", GAME_CREATED_EVENT);
events.configure(GameStore, "ElementSelected", ELEMENT_SELECTED_EVENT);

AppDispatcher.autoDispatch(GameStore);

module.exports = GameStore;
