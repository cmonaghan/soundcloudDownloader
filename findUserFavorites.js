// Dependencies
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request')); // converts request to use promises
var _ = require('underscore');

function findUserFavorites(username, scClientId) {

  return getUserId(username, scClientId).then(function(userIdInteger) {
    console.log('userIdInteger', userIdInteger);
    var favoritesUrl = 'http://api.soundcloud.com/users/' + userIdInteger
      + '/favorites.json?client_id=' + scClientId;

    return request.getAsync(favoritesUrl);
  }).then(function(responseArr){
    var body = responseArr[0].body;
    body = JSON.parse(body);
    var scFavoritesUrls = _.pluck(body, 'permalink_url');
    return scFavoritesUrls;
  });
}

// helpers

/**
 * Finds the integer user id associated with the user (necessary for fetching
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

// meta-helpers

function buildResolveUrl(username, scClientId) {
  return 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' +
    username + '&client_id=' + scClientId;
}

module.exports = findUserFavorites;
