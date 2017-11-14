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
let el = window.document.getElementById("knapp");
// el.addEventListener("click", function (event) {
//     event.preventDefault()
// });
el.addEventListener("click", toggleDates, false);




