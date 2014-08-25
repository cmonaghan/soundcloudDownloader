// Dependencies
var exec = require('exec');
var _ = require('underscore');

var config = require('./config');
var findUserFavorites = require('./findUserFavorites');
var downloadSong = require('./downloadSong');

// Create the download directory if it doesn't exist
var mkdir = 'mkdir -p ' + config.DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
});

// downloads all user's favorites
findUserFavorites(config.scUsername, config.scClientId).then(function(urls){
  console.log(urls);
  _.each(urls, function(url) {
    downloadSong(url);
  });
});
