// Dependencies
var url = require('url');
var fs = require('fs');
var https = require('https');
var http = require('http');

var config = require('./config');
var sounddrainApiUtility = require('./sounddrainApiUtility');

function downloadSong(songUrl) {
  sounddrainApiUtility.getDownloadUrl(songUrl).then(function(downloadInfo){
    // check if this file already exists, so we don't re-download something we already have
    fs.exists(config.DOWNLOAD_DIR + downloadInfo.sanitizedSongTitle, function(exists) {
      if (exists) {
        console.log('This file was not downloaded because it already exists:', downloadInfo.sanitizedSongTitle);
      } else {
        var host = url.parse(downloadInfo.downloadUrl).host;

        // sounddrain provides files from two sources:
        // 1) for files available for download on soundcloud, it provides the file
        //    directly from the soundcloud api. host = api.soundcloud.com (same
        //    kbps the download offers)
        // 2) for files not available for download on soundcloud, it provides the
        //    file from some source with a host = ec-media.soundcloud.com (128kbps)
        if (host === 'ec-media.soundcloud.com') {
          var file = fs.createWriteStream(config.DOWNLOAD_DIR + downloadInfo.sanitizedSongTitle);
          https.get(downloadInfo.downloadUrl, function(res) { // not sure why, but some days uses https, some days http
            res.on('data', function(data) {
              file.write(data);
            }).on('end', function() {
              file.end();
              console.log('Success! Downloaded ' + downloadInfo.sanitizedSongTitle +
                ' to ' + config.DOWNLOAD_DIR);
            });
          }).on('error', function(err) {
            console.error(err);
          });
        } else if (host === 'api.soundcloud.com') {
          console.log(downloadInfo.sanitizedSongTitle +
            ' was not downloaded because host is ' + host);

          // var file = fs.createWriteStream(config.DOWNLOAD_DIR + downloadInfo.sanitizedSongTitle);
          // https.get(downloadInfo.downloadUrl, function(res) { // not sure why, but some days uses https, some days http
          //   res.on('data', function(data) {
          //     file.write(data);
          //   }).on('end', function() {
          //     file.end();
          //     console.log('Success! Downloaded ' + downloadInfo.sanitizedSongTitle +
          //       ' to ' + config.DOWNLOAD_DIR);
          //   });
          // }).on('error', function(err) {
          //   console.error(err);
          // });
        } else {
          console.log('This song was not downloaded because the download host ' +
            'is not recognized.');
        }
      }
    });
  });
};

module.exports = downloadSong;
