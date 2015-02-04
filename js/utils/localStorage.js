var mori = require("mori");

module.exports = {

  store: function(key, jsObj) {
    if(!window.localStore) {
      return;
    }
    if(user) {
      window.localStorage[key] = JSON.stringify(mori.toJs(jsObj));
    } else {
      window.localStorage.removeItem("currentUser");
    }
  },

  retrieve: function(key) {
    if(!window.localStore) {
      return null;
    }
    var jsObj = JSON.parse(window.localStorage[key]);
    return mori.toClj(jsObj);
  }

};
