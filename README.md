# Soundcloud Downloader

### Here's how to use this tool:
  1. Run `npm install`
  2. Copy the url of a song on soundcloud that you'd like to download
  3. From the command line, type `node soundcloudDownloader.js '[desired song url]'`
  4. Profit!

### Notes:
test run:

    node soundcloudDownloader.js 'https://soundcloud.com/jthunder/we-make-it-better-rolling-in' 'https://soundcloud.com/xaanti/my-heart-club-mix'


To get soundcloud user id:

    curl 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/[username]&client_id=[app-id]'

To get soundcloud user favorites:

    curl 'http://api.soundcloud.com/users/4071686/favorites.json?client_id=774690d4074340ca740c4aa5e50de56d'


TODO:
- spread out requests to sounddrain API so as not to overload it