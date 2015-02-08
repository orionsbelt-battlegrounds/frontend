var mori = require("mori");

module.exports = {

  store: function(key, jsObj) {
    if(!window.localStorage) {
      return;
    }
    if(jsObj) {
      window.localStorage[key] = JSON.stringify(mori.toJs(jsObj));
    } else {
      window.localStorage.removeItem(key);
    }
  },

  retrieve: function(key) {
    if(!window.localStorage) {
      return null;
    }
    var raw = window.localStorage[key];
    if(raw) {
      var jsObj = JSON.parse(raw);
      return mori.toClj(jsObj);
    }
    return null
  }

};
