/* eslint-disable no-console */


var dateNames = {
    days: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
    months: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December']
};

var showDates = {
    getMonths: function(x){
        var date = dateNames;
        var startDate = new Date();
        var endDate = new Date();
        var y = x + 1;
        
        startDate.setMonth(x, 1);
        endDate.setMonth(y, 1);
        var dates = "";
        var fullYear = startDate.getFullYear();

        while (startDate < endDate ) {
            dates += "<tr><td datum=" + startDate.toLocaleDateString()+ ">" + date.days[startDate.getDay()] + ' ' + startDate.getDate() + ' ' + date.months[startDate.getMonth()] + "</td></tr>"; 
            startDate.setDate(startDate.getDate()+1);
        }
        document.getElementById('date').innerHTML = dates;
        document.getElementById('year').innerHTML = fullYear;
        console.log(dates);
        
    },
};

export {dateNames, showDates}
