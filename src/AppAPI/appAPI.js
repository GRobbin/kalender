/* eslint-disable no-console */
import request from 'request';
import path from 'path';


var dateNames = {
    days: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
    months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
};

var showDates = {
    getMonths: function (x) {
        var date = dateNames;
        var startDate = new Date();
        var endDate = new Date();
        var y = x + 1;

        startDate.setMonth(x, 1);
        endDate.setMonth(y, 1);
        var dates = "";
        var fullYear = startDate.getFullYear();
        var jsonDates = [];
        for (var i= 0; startDate < endDate; i++) {
            jsonDates[i] = {};
            jsonDates[i].date =  startDate.toLocaleDateString()
            jsonDates[i].day = date.days[startDate.getDay()] + ' ' + startDate.getDate() + ' ' + date.months[startDate.getMonth()];
            startDate.setDate(startDate.getDate() + 1);
        }
        // document.getElementById('date').innerHTML = dates;
        // document.getElementById('year').innerHTML = fullYear;
        console.log(jsonDates[3]);

    },
    scrapedDates: function () {

        const options = {  
            url: 'http://localhost:3000/data',
            method: 'GET'
        };
        
        request(options, function(err, res, body) { 
            var json = JSON.parse(body)
            console.log(json[3]);
        });
    }
};
export { dateNames, showDates }