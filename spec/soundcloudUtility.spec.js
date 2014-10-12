var soundcloudUtility = require('../soundcloudUtility');
var config = require('../config');

describe('soundcloudUtility', function() {
  var soundcloudUsername = 'christianmonaghan';
  var soundcloudAppId = config.soundcloudAppId;
  var christiansUserId = 4071686;

  describe('#getUserId', function() {
    var returnedUserId;
    beforeEach(function(done) {
      soundcloudUtility.getUserId(soundcloudUsername, soundcloudAppId).then(function(userId) {
        returnedUserId = userId;
        done();
      });
    });
    it('should return a user id', function() {
      expect(returnedUserId).toBe(christiansUserId);
    });
  });

  describe('#getFavoritesUrls', function() {
    var favoritesUrls;
    beforeEach(function(done) {
      soundcloudUtility.getFavoritesUrls(christiansUserId, soundcloudAppId).then(function(urls){
        favoritesUrls = urls;
        done();
      });
    });
    it('should return the urls of the user\'s favorites', function() {
      expect(favoritesUrls).toBeDefined();
      expect(favoritesUrls.length).toBeGreaterThan(0); // length could be 0 if user has no favorites
      expect(favoritesUrls[0]).toMatch('http://soundcloud.com/'); // check that we're getting some kind of url
    });
  });

  // now that we've confirmed helpers are working, let's try it altogether
  describe('#fetchUserFavoriteUrls', function() {
    var favoritesUrls;
    beforeEach(function(done) {
      soundcloudUtility.fetchUserFavoriteUrls(soundcloudUsername, soundcloudAppId).then(function(urls) {
        favoritesUrls = urls;
        done();
      });
    });
    it('should return the urls of the user\'s favorites', function() {
      expect(favoritesUrls).toBeDefined();
      expect(favoritesUrls.length).toBeGreaterThan(0); // length could be 0 if user has no favorites
      expect(favoritesUrls[0]).toMatch('http://soundcloud.com/'); // check that we're getting some kind of url
    });
  });

});
