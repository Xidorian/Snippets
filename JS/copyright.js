/*
* adjust copyright year in footer insert
* &copy; <span class="footerYear"></span>
* in place of year
*/
const currDate = new Date()
const currYear = currDate.getFullYear()
document.querySelector('.footerYear').textContent = currYear
