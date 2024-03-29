// Dependencies
var _ = require('underscore');

var config = require('./config');
var directoryUtility = require('./directoryUtility');
var soundcloudUtility = require('./soundcloudUtility');
var downloadSongUtility = require('./downloadSongUtility');
var sounddrainApiUtility = require('./sounddrainApiUtility');

directoryUtility.createRelativeDirectory(config.DOWNLOAD_DIR);

// downloads all user's favorites
soundcloudUtility.fetchUserFavoriteUrls(config.soundcloudUsername, config.soundcloudAppId).then(function(urls){
  console.log(urls);
  _.each(urls, function(url) {
    sounddrainApiUtility.getDownloadUrl(url).spread(downloadSongUtility);
  });
});
