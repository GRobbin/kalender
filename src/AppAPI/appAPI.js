/* eslint-disable no-console */
import request from 'request-promise-native';
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

        var jsonDates = [];
        for (var i = 0; startDate < endDate; i++) {
            jsonDates[i] = {};
            jsonDates[i].date = startDate.toLocaleDateString()
            jsonDates[i].day = date.days[startDate.getDay()] + ' ' + startDate.getDate() + ' ' + date.months[startDate.getMonth()];
            startDate.setDate(startDate.getDate() + 1);
        }
        // document.getElementById('date').innerHTML = dates;
        // document.getElementById('year').innerHTML = fullYear;
        return jsonDates;

    },
    scrapedDates: function (month) {

        const options = {
            url: 'http://localhost:3000/data',
            method: 'GET'
        };
        var that = this;
        request(options).then(function (body) {
            var dateNames = JSON.parse(body);
            var dates = that.getMonths(month);
            console.log(dateNames);
            console.log(dates);
            let i = 0;
            let x = dates.length;

            for (; i < x; i++) {
                let k = 0;
                let y = dateNames.length;
                let isNot = '';

                for (; k < y; k++) {
                    if (dates[i].date == dateNames[k].date) {
                        console.log(dateNames[k].date + ' ' + dateNames[k].name);
                        isNot = dateNames[k].date;
                    }
                }
                if (dates[i].date != isNot) {
                    console.log(dates[i].date);
                }
            }
        })

    }
}
    ;
export { dateNames, showDates }
