var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request')); // converts request to use promises
var url = require('url');
var path = require('path');
var sanitize = require('sanitize-filename');


var config = require('./config');

var sounddrainApiUtility = {

  // Query the sounddrain API for a link to download the song
  getDownloadUrl: function(soundcloudSongUrl) {
    var promise = request.postAsync(
      config.sounddrainApiUrl, // url we're POSTing to
      { form: {url: soundcloudSongUrl} } // form data to POST
    ).then(function(responseArr){
      var body = responseArr[0].body;
      body = JSON.parse(body);

      // grabs the extension name (ie - '.mp3')
      var fileExt = path.extname( url.parse(body.url).pathname.split('/').pop() );
      fileExt = fileExt || '.mp3'; // in case an extension isn't found, use .mp3
      var songTitle = sanitize(body.title) + fileExt;

      return {
        sanitizedSongTitle: songTitle,
        downloadUrl: body.url
      }
    });
    return promise;
  }

};

module.exports = sounddrainApiUtility;
