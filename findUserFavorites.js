// Dependencies
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request')); // converts request to use promises
var _ = require('underscore');

function findUserFavorites(username, scClientId) {
  var promise = getUserId(username, scClientId)
    .then(function(userId) {
      return getUserFavoritesUrls(userId, scClientId);
    });

  return promise;
}


// Helpers

/**
 * Gets the integer user id associated with the user (necessary for fetching
 * favorites)
 *
 * @params:
 * {username} (the user's soundcloud username. ie - christianmonaghan)
 * {scClientId} (this is an app id specific to this application. found in config.js)
 */
function getUserId(username, scClientId) {
  var resolveUrl = buildResolveUrl(username, scClientId);
  var promise = request.getAsync(resolveUrl).then(function(responseArr){
    var body = responseArr[0].body;
    body = JSON.parse(body);
    return body.id;
  });

  return promise;
}

/**
 * Gets the urls of the user's soundcloud favorites
 *
 * @params:
 * {userId} (the user's numeric id. ie - 4071686)
 * {scClientId} (this is an app id specific to this application. found in config.js)
 */
function getUserFavoritesUrls(userId, scClientId) {
  var favoritesUrl = buildFavoritesUrl(userId, scClientId);
  var promise = request.getAsync(favoritesUrl).then(function(responseArr){
    var body = responseArr[0].body;
    body = JSON.parse(body);
    var scFavoritesUrls = _.pluck(body, 'permalink_url');
    return scFavoritesUrls;
  });

  return promise;
}


// Meta-helpers

function buildResolveUrl(username, scClientId) {
  return 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' +
    username + '&client_id=' + scClientId;
}

function buildFavoritesUrl(userId, scClientId) {
  return 'http://api.soundcloud.com/users/' + userId +
    '/favorites.json?client_id=' + scClientId;
}

module.exports = findUserFavorites;
