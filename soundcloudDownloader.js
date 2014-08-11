// You can modify the directory to download your songs to here:
var DOWNLOAD_DIR = './downloads/'; // make sure this directory has a trailing slash

// API url
var sounddrainApiUrl = 'http://www.sounddrain.com/sounddrain_api/';

// Dependencies
var fs = require('fs');
var url = require('url');
var https = require('https');
var path = require('path');
var request = require('request');
var exec = require('exec');


// Create the download directory if it doesn't exist
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
});

// grab the url arguments from the command line
var songUrls = Array.prototype.slice.call(process.argv, 2);

// call the download function for each url in the songUrls array
for (var i = 0; i < songUrls.length; i++) {
  console.log('downloading ' + songUrls[i] + ' ...');
  downloadSongFromSoundcloud(songUrls[i]);
};

function downloadSongFromSoundcloud(songUrl) {
  // Query the sounddrain API for a link to download the song
  request.post(
    sounddrainApiUrl, // url we're POSTing to
    { form: {url: songUrl} }, // form data to POST
    function(err, response, body) { // callback
      if (err) {
        console.error(err);
      }

      body = JSON.parse(body);
      // console.log('The sounddrain API response is:', body);

      downloadSong(body.url, body.title);
    }
  );

  // Download the file at the given url - helper for request.post
  function downloadSong(songUrl, songTitle) {
    // grabs the extension name (ie - '.mp3')
    var fileExt = path.extname( url.parse(songUrl).pathname.split('/').pop() );
    songTitle += fileExt; // adds the file extension to the song title

    // check if this file already exists, so we don't re-download something we already have
    fs.exists(DOWNLOAD_DIR + songTitle, function(exists) {
      if (exists) {
        console.log('This file was not downloaded because it already exists:', songTitle);
      } else {
        var file = fs.createWriteStream(DOWNLOAD_DIR + songTitle);

        https.get(songUrl, function(res) {
          res.on('data', function(data) {
            file.write(data);
          }).on('end', function() {
            file.end();
            console.log('Success! Downloaded ' + songTitle + ' to ' + DOWNLOAD_DIR);
          });
        }).on('error', function(err) {
          console.error(err);
        });
      }
    });
  };
};
