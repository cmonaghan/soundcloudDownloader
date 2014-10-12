var soundcloudUtility = require('../soundcloudUtility');
var config = require('../config');

describe('soundcloudUtility', function() {
  it('should pass a test', function() {
    expect(true).toBe(true);
  });
  describe('#getUserId', function() {
    var scUsername = 'christianmonaghan';
    var scClientId = config.scClientId;
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
});
