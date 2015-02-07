var _ = require("mori");

var OBB_API_URL = "http://api.orionsbelt.eu";

function makeAnonymousRequest(path, callback) {
  var url = OBB_API_URL + path;
  if(window['$']) {
    $.getJSON(url, callback);
  }
}

module.exports = {

  anonymize: function anonymize(username, callback) {
    makeAnonymousRequest("/auth/anonymize?username="+username, callback);
  }

}
