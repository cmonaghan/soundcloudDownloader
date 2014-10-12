// Dependencies
var exec = require('exec');
var _ = require('underscore');

var config = require('./config');
var soundcloudUtility = require('./soundcloudUtility');
var downloadSong = require('./downloadSong');

// Create the download directory if it doesn't exist
var mkdir = 'mkdir -p ' + config.DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
});

// downloads all user's favorites
soundcloudUtility.fetchUserFavoriteUrls(config.soundcloudUsername, config.soundcloudAppId).then(function(urls){
  console.log(urls);
  // _.each(urls, function(url) {
  //   downloadSong(url);
  // });
});
