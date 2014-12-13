# Soundcloud Downloader

### Here's how to use this tool:
  1. Run `npm install`
  2. Modify the first two variables `DOWNLOAD_DIR` and `soundcloudUsername` in config.js.
  3. From the command line, run `node app.js`
  4. Watch the magic before your eyes!


### Running tests
Unit tests use jasmine.

    npm test


### Notes:

To get soundcloud user id:

    curl 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/[username]&client_id=[app-id]'

To get soundcloud user favorites:

    curl 'http://api.soundcloud.com/users/4071686/favorites.json?client_id=774690d4074340ca740c4aa5e50de56d'


Sounddrain's client_id is b45b1aa10f1ac2941910a7f0d10f8e28 (in case we want to query on their behalf...)

TODO:
- spread out requests to sounddrain API so as not to overload it
- alert user if song not downloaded because no file extension found
- alert user when all downloads complete (with success count & failure count)