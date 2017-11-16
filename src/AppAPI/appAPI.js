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
            // console.log(dateNames);
            // console.log(dates);
            let i = 0;
            let x = dates.length;
            let datesContent = '';
            let allTextContent = document.getElementById('datum').querySelectorAll('.content');
            let textContent = '';
            let datesObject = [];

            for (; i < x; i++) {
                let k = 0;
                let y = dateNames.length;
                let isNot = '';
                datesObject[i] = {};

                for (let t = 0; t < allTextContent.length; t++) {
                    if (dates[i].day == allTextContent[t].parentElement.id){
                        textContent = allTextContent[t].innerText;
                    }

                }

                for (; k < y; k++) {
                    if (dates[i].date == dateNames[k].date) {
                    
                        datesContent += `<div class="dates" id="${dates[i].day}" data-date="${dates[i].date}">
                        <p id="dag">${dates[i].fullDate}</p>
                        <p id="namn">${dateNames[k].name}</p>
                        <p class="content">${textContent}</p>
                        </div>`;

                        datesObject[i].date = dates[i].date;
                        datesObject[i].day = dates[i].day;
                        datesObject[i].fullDate = dates[i].fullDate;
                        datesObject[i].name = dateNames[k].name;

                        isNot = dates[i].fullDate;
                    }
                }

                if (dates[i].fullDate != isNot) {
                    datesContent += `<div class="dates" id="${dates[i].day}" data-date="${dates[i].date}">
                    <p id="dag">${dates[i].fullDate}</p>
                    <p id="namn"></p>
                    <p class="content">${textContent}</p>
                    </div>`;
                    textContent = '';
                    datesObject[i] = {};
                    datesObject[i].date = dates[i].date;
                    datesObject[i].day = dates[i].day;
                    datesObject[i].fullDate = dates[i].fullDate;
                }
            }
            
                console.log(textContent);
                if (allTextContent.length != 0){
                    console.log(allTextContent[0].parentElement.id);
                }
                
                document.getElementById('datum').html = '';
                document.getElementById('datum').innerHTML = datesContent;
            
        })

    },
    addContent: function () {
        let day = document.querySelector('input[name = "day"]:checked').value;
        let allDays = document.getElementById('datum').querySelectorAll('#' + day);
        let content = document.getElementById('content').value;


        for (let i = 0; i < allDays.length; i++) {
            let el = document.createElement('p');
            el.setAttribute('class', 'content');
            let text = document.createTextNode(content);
            el.appendChild(text);
            allDays[i].appendChild(el);
        }

        // console.log(allDays.length);
        // console.log(content);
    }
};
export { dateNames, showDates }
