// You can modify the directory to download your songs to here:
var DOWNLOAD_DIR = './'; // make sure this directory has a trailing slash

// Dependencies
var fs = require('fs');
var url = require('url');
var https = require('https');
var path = require('path');
var request = require('request');
var exec = require('exec');

var soundcloudSongUrl = process.argv[2]; // grab the url argument from the command line
var sounddrainApiUrl = 'http://www.sounddrain.com/sounddrain_api/';

// Create the download directory if it doesn't exist
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
});

// call the download function
downloadSongFromSoundcloud(soundcloudSongUrl);

function downloadSongFromSoundcloud(soundcloudSongUrl) {
  // Query the sounddrain API for a link to download the song
  request.post(
    sounddrainApiUrl, // url
    { form: {url: soundcloudSongUrl} }, // form data
    function(error, response, body) { // callback
      if (error) {
        console.log('Error:', error);
      }

      console.log('status:', response.statusCode);
      body = JSON.parse(body);
      console.log('The sounddrain API response is:', body);

      downloadSong(body.url, body.title);
    }
  );

  // Download the file at the given url - helper for request.post
  function downloadSong(songUrl, songTitle) {
    // grabs the extension name (ie - '.mp3')
    var fileExt = path.extname( url.parse(songUrl).pathname.split('/').pop() );
    songTitle += fileExt; // adds the file extension to the song title

    // @TODO: check if this file already exists, so we don't download something we already have again
    var file = fs.createWriteStream(DOWNLOAD_DIR + songTitle);

    https.get(songUrl, function(res) {
      res.on('data', function(data) {
        file.write(data);
      }).on('end', function() {
        file.end();
        console.log(songTitle + ' downloaded to ' + DOWNLOAD_DIR);
      });
    });
  };
};
