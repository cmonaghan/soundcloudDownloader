var exec = require('exec');

var directoryUtility = {

  // Create the download directory if it doesn't exist
  createRelativeDirectory: function(directory) {
    var mkdir = 'mkdir -p ' + directory;
    var child = exec(mkdir, function(err, stdout, stderr) {
      if (err) {
        throw err;
      }
    });
  },

  // removeRelativeDirectory: function(directory) {

  // }

};

module.exports = directoryUtility;
