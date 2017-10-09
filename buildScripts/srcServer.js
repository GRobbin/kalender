import express from 'express';
// import path from 'path';
// import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import request from 'request';
// import fs from 'fs';
import cheerio from 'cheerio';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', function (req, res){
    res.header("Content-Type: text/plain; charset=UTF-8");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');


    var url = 'http://kyrkoar.se/?ar=2017&id=hem';

    request({url, jar: true}, function (error, response, html) {

        if (error){
          console.error(error);
          return;
        }

        if (!error) {
          var $ = cheerio.load(html);

          var datesArr = [];

            $('.post').each(function(i, elem) {
              datesArr[i] = {};
              datesArr[i].date = $(this).find('.date').text();
              datesArr[i].name = $(this, 'p').html().split("<br>")[1];


              })
              res.json(datesArr);
        }

      });

//     res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err){
  if (err){
      console.log(err);
  } else {
      console.log('listening on port 3000')
  }
});

// app.listen(port, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         open('http://localhost:' + port);
//     }
// });
