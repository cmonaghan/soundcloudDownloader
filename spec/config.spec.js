describe('config', function() {
  var config = require('../config');
  it('should have required variables defined', function() {
    expect(config).toBeDefined();
    expect(config.DOWNLOAD_DIR).toBeDefined();
    expect(config.scUsername).toBeDefined();
    expect(config.sounddrainApiUrl).toBeDefined();
    expect(config.scClientId).toBeDefined();
  });
});
