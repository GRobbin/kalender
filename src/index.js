/* eslint-disable no-console */
import './index.css';
import { showDates } from './AppAPI/appAPI';

function toggleDates(event) {
    event.preventDefault()
    let months = document.getElementById('month').value;
    document.getElementById('datum').html = '';
    let x = parseInt(months);
    showDates.scrapedDates(x);
}

function addContent() {
    let day = document.querySelector('input[name = "day"]:checked').value;
    showDates.addContent(day);
}

let addMonthClick = window.document.getElementById("knapp");
addMonthClick.addEventListener("click", toggleDates, false);

let addContentClick = window.document.getElementById("content");
addContentClick.addEventListener("click", addContent, false);




