// Dependencies
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request')); // converts request to use promises
var _ = require('underscore');

var soundcloudUtility = {

  fetchUserFavoriteUrls: function(username, scClientId) {
    var self = this;
    var promise = this.getUserId(username, scClientId)
      .then(function(userId) {
        return self.getUserFavoritesUrls(userId, scClientId);
      });

    return promise;
  },

  // Helpers
  // TODO: this is so janky. I don't really want to expose the helpers except
  // for testing. need better way to expose necessary functions

  /**
   * Gets the integer user id associated with the user (necessary for fetching
   * favorites)
   *
   * @param {username} (the user's soundcloud username. ie - christianmonaghan)
   * @param {scClientId} (this is an app id specific to this application. found in config.js)
   */
  getUserId: function(username, scClientId) {
    var resolveUrl = buildResolveUrl(username, scClientId);
    var promise = request.getAsync(resolveUrl).then(function(responseArr){
      var body = responseArr[0].body;
      body = JSON.parse(body);
      return body.id;
    });

    return promise;
  },

  /**
   * Gets the urls of the user's soundcloud favorites
   *
   * @param {userId} (the user's numeric id. ie - 4071686)
   * @param {scClientId} (this is an app id specific to this application. found in config.js)
   */
  getUserFavoritesUrls: function(userId, scClientId) {
    var favoritesUrl = buildFavoritesUrl(userId, scClientId);
    var promise = request.getAsync(favoritesUrl).then(function(responseArr){
      var body = responseArr[0].body;
      body = JSON.parse(body);
      var scFavoritesUrls = _.pluck(body, 'permalink_url');
      return scFavoritesUrls;
    });

    return promise;
  }

};



// Meta-helpers

function buildResolveUrl(username, scClientId) {
  return 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' +
    username + '&client_id=' + scClientId;
}

function buildFavoritesUrl(userId, scClientId) {
  return 'http://api.soundcloud.com/users/' + userId +
    '/favorites.json?client_id=' + scClientId;
}


// Exports
module.exports = soundcloudUtility;
