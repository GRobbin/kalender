import express from 'express';
import path from 'path';
// import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import scrape from '../src/AppAPI/scrape';
import reload from 'reload';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  res.header("Content-Type: text/plain; charset=UTF-8");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  res.sendFile(path.join(__dirname, '../src/index.html'));

});
app.get('/data', function (req, res) {
  res.header("Content-Type: text/plain; charset=UTF-8");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  res.sendFile(path.join(__dirname, '../docs/kyrkoar.json'));

});


app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('listening on port 3000')
  }
});
reload(app);
// scrape();

// app.listen(port, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         open('http://localhost:' + port);
//     }
// });
