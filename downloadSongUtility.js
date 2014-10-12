// Dependencies
var url = require('url');
var fs = require('fs');
var https = require('https');
var http = require('http');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request')); // converts request to use promises
var path = require('path');
var sanitize = require('sanitize-filename');

var config = require('./config');

function downloadSong(songUrl) {
  // Query the sounddrain API for a link to download the song
  request.postAsync(
    config.sounddrainApiUrl, // url we're POSTing to
    { form: {url: songUrl} } // form data to POST
  ).then(function(responseArr){
    var body = responseArr[0].body;
    body = JSON.parse(body);
    // console.log('The sounddrain API response is:', body);

    // grabs the extension name (ie - '.mp3')
    var fileExt = path.extname( url.parse(body.url).pathname.split('/').pop() );
    fileExt = fileExt || '.mp3'; // in case an extension isn't found, use .mp3
    var songTitle = sanitize(body.title) + fileExt;

    // check if this file already exists, so we don't re-download something we already have
    fs.exists(config.DOWNLOAD_DIR + songTitle, function(exists) {
      if (exists) {
        console.log('This file was not downloaded because it already exists:', songTitle);
      } else {
        var file = fs.createWriteStream(config.DOWNLOAD_DIR + songTitle);

        http.get(songUrl, function(res) { // not sure why, but some days uses https, some days http
          res.on('data', function(data) {
            file.write(data);
          }).on('end', function() {
            file.end();
            console.log('Success! Downloaded ' + songTitle + ' to ' + config.DOWNLOAD_DIR);
          });
        }).on('error', function(err) {
          console.error(err);
        });
      }
    });
  });
};

module.exports = downloadSong;
