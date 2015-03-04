"use strict";

var AppDispatcher = require('../dispatcher/AutoAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require("mori");
var gateway = require("../utils/gateway.js");
var CurrentUserStore = require("./CurrentUserStore.js");

var GAME_CREATED_EVENT = "GameStore#GameCreated";
var GAME_LOADED_EVENT = "GameStore#GameLoaded";
var ELEMENT_SELECTED_EVENT = "GameStore#ElementSelected";

function buildCoordinate(coord) {
  return _.vector(parseInt(coord[0]), parseInt(coord[2]));
}

function runDeployAction(element, coordinate, callback) {
  // [:deploy 10 :rain [8 8]]
  var quantity = _.get(element, "quantity");
  var unit = _.get(element, "unit");
  var action = _.vector("deploy", quantity, unit, buildCoordinate(coordinate));
  var gameId = _.get(GameStore.currentGame, "_id");
  var user = CurrentUserStore.getCurrentUser();
  gateway.simulateActions(user, gameId, _.vector(action), callback);
}

var GameStore = assign({}, EventEmitter.prototype, {

  selectedElement: null,
  currentGame: null,

  isDeploy: function isDeploy() {
    return this.currentGame && _.getIn(this.currentGame, ["board", "state"]) === "deploy";
  },

  "GameStore#loadGame": function(action) {
    var user = CurrentUserStore.getCurrentUser();
    var gameId = _.get(action, "gameId");
    var store = this;
    gateway.loadGame(user, gameId, function afterLoadGame(game) {
      store.currentGame = _.toClj(game);
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
    var currentElement = _.toClj(_.get(action, "element"));
    if(_.equals(currentElement, this.selectedElement)) {
      currentElement = null;
    }
    this.selectedElement = currentElement;
    GameStore.emit(ELEMENT_SELECTED_EVENT, currentElement);
  },

  "GameStore#coordinateSelected": function coordinateSelected(action) {
    if(!this.selectedElement) {
      return;
    }
    var coordinate = _.get(action, "coordinate");
    var store = this;
    if(this.isDeploy()) {
      runDeployAction(this.selectedElement, coordinate, function(game) {
        store.selectedElement = null;
        GameStore.emit(ELEMENT_SELECTED_EVENT, store.selectedElement);

        store.currentGame = _.toClj(game);
        GameStore.emit(GAME_LOADED_EVENT, store.currentGame);
      });
    } else {
    }
  },

  getSelectedElement: function getSelectedElement() {
    return this.selectedElement;
  }

});

var events = require("../utils/events.js");
events.configure(GameStore, "GameLoaded", GAME_LOADED_EVENT);
events.configure(GameStore, "GameCreated", GAME_CREATED_EVENT);
events.configure(GameStore, "ElementSelected", ELEMENT_SELECTED_EVENT);

AppDispatcher.autoDispatch(GameStore);

module.exports = GameStore;
