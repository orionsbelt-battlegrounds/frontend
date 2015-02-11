var _ = require("mori");

var OBB_API_URL = "http://api.orionsbelt.eu";

function makeRequest(user, method, path, data, callback) {
  var url = OBB_API_URL + path;
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
      success: callback
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

function putRequest(user, path, data, callback) {
  makeRequest(user, "PUT", path, data, callback);
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

  getLobbyGames: function getLobbyGames(user, callback) {
    getRequest(user, "/lobby/open-games", callback);
  },

  joinGame: function joinGame(user, gameId, callback) {
    putRequest(user, "/game/"+gameId+"/join", {}, callback);
  }

}
