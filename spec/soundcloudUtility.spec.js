var soundcloudUtility = require('../soundcloudUtility');
var config = require('../config');

describe('soundcloudUtility', function() {
  var scUsername = 'christianmonaghan';
  var scClientId = config.scClientId;

  describe('#getUserId', function() {
    var returnedUserId;
    beforeEach(function(done) {
      soundcloudUtility.getUserId(scUsername, scClientId).then(function(userId) {
        returnedUserId = userId;
        done();
      });
    });
    it('should return a user id', function() {
      expect(returnedUserId).toBe(4071686);
    });
  });

  describe('#getFavoritesUrls', function() {
    var userId = 4071686;
    var favoritesUrls;
    beforeEach(function(done) {
      soundcloudUtility.getFavoritesUrls(userId, scClientId).then(function(urls){
        favoritesUrls = urls;
        done();
      });
    });
    it('should return the urls of the user\'s favorites', function() {
      expect(favoritesUrls).toBeDefined();
      expect(favoritesUrls.length).toBeGreaterThan(0); // although length could be 0 if user has no favorites
      expect(favoritesUrls[0]).toMatch('http://soundcloud.com/'); // check that we're getting some kind of url
    });
  });

});
