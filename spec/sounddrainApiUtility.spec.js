var sounddrainApiUtility = require('../sounddrainApiUtility');

describe('sounddrainApiUtility', function() {

  describe('#getDownloadUrl', function() {
    var soundcloudSongUrl = 'http://soundcloud.com/naturesounds/blu-the-return';
    var downloadUrl;
    var songTitle;
    beforeEach(function(done) {
      sounddrainApiUtility.getDownloadUrl(soundcloudSongUrl).then(function(res) {
        downloadUrl = res.downloadUrl;
        songTitle = res.sanitizedSongTitle;
        done();
      });
    });
    it('should return a download url and a song title', function() {
      expect(downloadUrl).toBeDefined();
      expect(downloadUrl).toMatch('https://ec-media.soundcloud.com');
      expect(songTitle).toBeDefined();
      expect(songTitle).toBe('Blu - The Return.mp3');
    });
  });

});
