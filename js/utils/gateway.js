var _ = require("mori");

var OBB_API_URL = "http://api.orionsbelt.eu";

function uniquify(path) {
  if(path.indexOf("?") == -1) {
    return path + "?t=" + (new Date().getTime());
  }
  return path + "&t=" + (new Date().getTime());
}

function makeRequest(user, method, path, data, callback, errorCallback) {
  var url = OBB_API_URL + uniquify(path);
  var headers = null;
  if(user) {
    headers = {
      "x-obb-auth-token" : _.get(user, "token")
    };
  }
  var postData = null;
  if(data) {
    postData = JSON.stringify(data);
  }
  if(window['$']) {
    $.ajax({
      type: method,
      url: url,
      contentType: "application/json",
      data: postData,
      headers: headers,
      success: callback,
      error: errorCallback
    });
  }
}

function makeAnonymousRequest(path, callback) {
  makeRequest(null, "GET", path, null, callback);
}

function getRequest(user, path, callback) {
  makeRequest(user, "GET", path, null, callback);
}

function postRequest(user, path, data, callback) {
  makeRequest(user, "POST", path, data, callback);
}

function putRequest(user, path, data, callback, errorCallback) {
  makeRequest(user, "PUT", path, data, callback, errorCallback);
}

module.exports = {

  anonymize: function anonymize(username, callback) {
    makeAnonymousRequest("/auth/anonymize?username="+username, callback);
  },

  createFriendly: function createFriendly(user, config, callback) {
    var data = {
      challenger: _.get(user, "username")
    };
    postRequest(user, "/game/create/friendly", data, callback);
  },

  loadGame: function loadGame(user, gameId, callback) {
    getRequest(user, "/game/"+gameId, callback);
  },

  getLobbyGames: function getLobbyGames(user, callback) {
    getRequest(user, "/lobby/open-games", callback);
  },

  getPlayerGames: function getPlayerGames(user, callback) {
    getRequest(user, "/player/latest-games", callback);
  },

  joinGame: function joinGame(user, gameId, callback) {
    putRequest(user, "/game/"+gameId+"/join", {}, callback);
  },

  simulateActions: function runActions(user, gameId, actions, callback, errorCallback) {
    var data = {actions:_.toJs(actions)};
    putRequest(
      user, "/game/"+gameId+"/deploy/simulate", data,
      callback, errorCallback
    );
  },

  runActions: function runActions(user, gameId, actions, callback, errorCallback) {
    var data = {actions:_.toJs(actions)};
    putRequest(
      user, "/game/"+gameId+"/deploy", data,
      callback, errorCallback
    );
  }

}
