/* eslint-disable no-console */
import request from 'request-promise-native';
import path from 'path';


let dateNames = {
    days: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
    months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
};

let showDates = {
    getMonths: function (x) {
        let date = dateNames;
        let startDate = new Date();
        let endDate = new Date();
        let y = x + 1;

        startDate.setMonth(x, 1);
        endDate.setMonth(y, 1);

        let jsonDates = [];
        for (let i = 0; startDate < endDate; i++) {
            jsonDates[i] = {};
            jsonDates[i].date = startDate.toLocaleDateString()
            jsonDates[i].fullDate = date.days[startDate.getDay()] + ' ' + startDate.getDate() + ' ' + date.months[startDate.getMonth()];
            jsonDates[i].day = date.days[startDate.getDay()];
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
        let that = this;
        request(options).then(function (body) {
            let dateNames = JSON.parse(body);
            let dates = that.getMonths(month);
            console.log(dateNames);
            console.log(dates);
            let i = 0;
            let x = dates.length;
            let datesContent = '';

            for (; i < x; i++) {
                let k = 0;
                let y = dateNames.length;
                let isNot = '';

                for (; k < y; k++) {
                    if (dates[i].date == dateNames[k].date) {
                        datesContent += `<div class="dates" id="${dates[i].day}" data-date="${dates[i].date}">
                        <p id="dag">${dates[i].fullDate}</p>
                        <p id="namn">${dateNames[k].name}</p>
                        </div>`

                        isNot = dates[i].fullDate;
                    }
                }
                if (dates[i].fullDate != isNot) {
                    datesContent += `<div class="dates" id="${dates[i].day}" data-date="${dates[i].date}">
                    <p id="dag">${dates[i].fullDate}</p>
                    </div>`
                }
            }
            document.getElementById('datum').innerHTML = datesContent;
        })

    },
    addContent: function(day, content){
        let allDays = document.getElementById('datum').querySelectorAll('#'+ day);
        console.log(allDays);
    }
};
export { dateNames, showDates }
