import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import request from 'request';
import fs from 'fs';


/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', function (req, res){

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    
    var url = 'https://www.google.com';
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('google.txt', html, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
        }
      });
  
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err){
    if (err){
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});