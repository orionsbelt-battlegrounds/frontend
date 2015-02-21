module.exports = {

  configure: function configure(obj, handleName, eventName) {
    obj["add"+handleName+"Listener"] = function(callback) {
      obj.on(eventName, callback);
    };

    obj["remove"+handleName+"Listener"] = function(callback) {
      obj.removeListener(eventName, callback);
    };
  }

};
