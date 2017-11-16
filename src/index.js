/* eslint-disable no-console */
import './index.css';
import { showDates } from './AppAPI/appAPI';

function toggleDates(event) {
    event.preventDefault()
    let months = document.getElementById('month').value;
    let x = parseInt(months);
    showDates.scrapedDates(x);
}


let addMonthClick = window.document.getElementById("knapp");
addMonthClick.addEventListener("click", toggleDates, false);

let addContentClick = window.document.getElementById("add-content-button");
addContentClick.addEventListener("click", showDates.addContent, false);




