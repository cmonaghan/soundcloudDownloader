# Soundcloud Downloader

### Here's how to use this tool:
  1. Run `npm install`
  2. Modify the first two variables `DOWNLOAD_DIR` and `soundcloudUsername`.
  3. From the command line, type `node soundcloudDownloader.js`
  4. Watch the magic before your eyes!


### Notes:

To get soundcloud user id:

    curl 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/[username]&client_id=[app-id]'

To get soundcloud user favorites:

    curl 'http://api.soundcloud.com/users/4071686/favorites.json?client_id=774690d4074340ca740c4aa5e50de56d'


TODO:
- spread out requests to sounddrain API so as not to overload it
- alert user if song not downloaded because no file extension found
- alert user when all downloads complete (with success count & failure count)