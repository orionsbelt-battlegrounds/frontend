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

function runDeployAction(callback) {
  var user = CurrentUserStore.getCurrentUser();
  var gameId = _.get(GameStore.currentGame, "_id");
  var actions = GameStore.currentActions;
  gateway.runActions(user, gameId, actions, callback, function error() {
    alert("Nhac");
  });
}

function simulateDeployActions(element, coordinate, callback, errorCallback) {
  // [:deploy 10 :rain [8 8]]
  var quantity = _.get(element, "quantity");
  var unit = _.get(element, "unit");
  var action = _.vector("deploy", quantity, unit, buildCoordinate(coordinate));
  var gameId = _.get(GameStore.currentGame, "_id");
  var user = CurrentUserStore.getCurrentUser();

  var actions = _.conj(GameStore.currentActions, action);

  gateway.simulateActions(user, gameId, actions, function success(game) {
    GameStore.currentActions = actions;
    callback(game);
  }, function error() {
    alert("Nhac");
  });
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
      if(state === code) {
        var element = _.getIn(this.currentGame, ["board", "elements", printCoordinate(coordinate)]);
        var elementCode = _.get(element, "player");
        if(elementCode === code) {
          this["GameStore#unitSelected"](element);
        }
      }
    }
  },

  "GameStore#deploy": function deployGame(action) {
    runDeployAction(function success(game) {
      GameActions.loadGame(game["_id"]);
    });
  },

  getSelectedElement: function getSelectedElement() {
    return this.selectedElement;
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
