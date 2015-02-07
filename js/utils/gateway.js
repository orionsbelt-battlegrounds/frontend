var _ = require("mori");

var OBB_API_URL = "http://api.orionsbelt.eu";

function makeAnonymousRequest(path, callback) {
  var url = OBB_API_URL + path;
  if(window['$']) {
    $.getJSON(url, callback);
  }
}

function postRequest(user, path, data, callback) {
  var url = OBB_API_URL + path;
  if(window['$']) {
    console.log(data)
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json",
      headers: {
        "x-obb-auth-token" : _.get(user, "token")
      },
      success: callback
    });
  }
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
  }

}
