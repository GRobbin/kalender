/* eslint-disable no-console */
import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';

export default function () {
  var url = 'http://kyrkoar.se/?ar=2017&id=hem';

  request({ url, jar: true }, function (error, response, html) {

    if (error) {
      console.error(error);
      return;
    }

    if (!error) {
      var $ = cheerio.load(html);

      var datesArr = [];

      $('.post').each(function (i, elem) {
        datesArr[i] = {};
        datesArr[i].date = $(this).find('.date').text();
        datesArr[i].name = $(this, 'p').html().split("<br>")[1];

      })
      var content = JSON.stringify(datesArr);

      fs.writeFile('./docs/kyrkoar.json', content, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });

    }
  });
}