// Modify the below variables as necessary
var DOWNLOAD_DIR = './downloads/'; // make sure this directory has a trailing slash
var soundcloudUsername = 'davidpinter';

// APIs
var sounddrainApiUrl = 'http://www.sounddrain.com/sounddrain_api/';
var soundcloudClientId = '774690d4074340ca740c4aa5e50de56d'; // the app id for using the soundcloud API

// Dependencies
var fs = require('fs');
var url = require('url');
var https = require('https');
var path = require('path');
var request = require('request');
var exec = require('exec');
var sanitize = require('sanitize-filename');
var _ = require('underscore');


// Create the download directory if it doesn't exist
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
});

downloadFavorites(soundcloudUsername); // downloads all user's favorites
// downloadSongFromSoundcloud('https://soundcloud.com/ansahuk/ansah-sanctify'); // downloads an individual track


// MASTER FUNCTION //

function downloadFavorites(username) {
  findUserFavorites(username, downloadCb);

  function downloadCb(favoritesUrls) {
    // call the download function for each url in the songUrls array
    for (var i = 0; i < favoritesUrls.length; i++) {
      console.log('downloading ' + favoritesUrls[i] + ' ...');
      downloadSongFromSoundcloud(favoritesUrls[i]);
    };
  }
}


// HELPERS //

function findUserFavorites(username, cb) {
  // finds the integer user id associated with the username
  var resolveUrl = 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/'
    + username + '&client_id=' + soundcloudClientId;

  request.get(
    resolveUrl,
    function(err, response, body) {
      if (err) {
        console.error(err);
      }

      body = JSON.parse(body);

      fetchFavorites(body.id);
    }
  );

  function fetchFavorites(userIdInteger) {
    var favoritesUrl = 'http://api.soundcloud.com/users/' + userIdInteger
      + '/favorites.json?client_id=' + soundcloudClientId;

    request.get(
      favoritesUrl,
      function(err, response, body) {
        if (err) {
          console.error(err);
        }

        body = JSON.parse(body);

        var scFavoritesUrls = _.pluck(body, 'permalink_url');

        cb(scFavoritesUrls);
      }
    );
  }
}

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

      downloadSong(body.url, sanitize(body.title));
    }
  );

  // Download the file at the given url - helper for request.post
  function downloadSong(songUrl, songTitle) {
    // grabs the extension name (ie - '.mp3')
    var fileExt = path.extname( url.parse(songUrl).pathname.split('/').pop() );
    fileExt = fileExt || '.mp3'; // in case an extension isn't found, use .mp3
    songTitle += fileExt;

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
