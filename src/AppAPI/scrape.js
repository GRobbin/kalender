/* eslint-disable no-console */
var request = require('request');


request('https://news.ycombinator.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log(html);
    }
  });
