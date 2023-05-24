const dtToday = new Date();
let month = dtToday.getMonth() + 1;
let day = dtToday.getDate() + 1;
const year = dtToday.getFullYear();
if(month < 10)
    month = '0' + month.toString();
if(day < 10)
    day = '0' + day.toString();
const maxDate = year + '-' + month + '-' + day;
document.querySelectorAll('input[type=date]').forEach(input => {
    input.setAttribute('min', maxDate)
});