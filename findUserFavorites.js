// Dependencies
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request')); // converts request to use promises
var _ = require('underscore');

function findUserFavorites(username, scClientId) {
  // finds the integer user id associated with the username
  var resolveUrl = buildResolveUrl(username, scClientId);

  return request.getAsync(resolveUrl).then(function(responseArr){
    var body = responseArr[0].body;
    body = JSON.parse(body);
    return body.id;
  }).then(function(userIdInteger) {
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
function buildResolveUrl(username, scClientId) {
  return 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' +
    username + '&client_id=' + scClientId;
}

module.exports = findUserFavorites;
