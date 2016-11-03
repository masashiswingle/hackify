
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express                 = require('express');
// const request                 = require('request');
const bodyParser              = require('body-parser');
const path                    = require('path');
const webpack                 = require('webpack');
const webpackDevMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware    = require('webpack-hot-middleware');
const config                  = require('./webpack.config');
const pg                      = require('pg');
const dbURL                   = process.env.DATABASE_LINK;
const SpotifyWebApi           = require('spotify-web-api-node');
const keys                    = require('./config.js');

const app = module.exports = express();

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    noInfo: false
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, './public')));


// app.use(function(req, res, next) {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

const spotifyApi = new SpotifyWebApi(keys.spotify);

app.post('/search', function(req, res) {
  // hardcoded to search love for now, later we need to let query = req.body.??
  let query = 'love';
  spotifyApi.searchTracks(query)
    .then(function(data) {
      res.send(data.statusCode, data.body);
    }, function(err) {
      res.send(400, err);
    });
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started, listening on port:', 8080);
});
