$('#from-date').datepicker({
  defaultDate: '+1d',
  changeMonth: false,
  numberOfMonths: 1,
  minDate: '+1d',
  onClose: function(selectedDate) {
    $('#to-date').datepicker('option', 'minDate', selectedDate );
    $('#to-date').datepicker(
        'option', 'maxDate', newDate(selectedDate, 365));
  }
});

$('#to-date').datepicker({
  defaultDate: '+1w',
  changeMonth: false,
  numberOfMonths: 1
});

function newDate(oldDate, daysAfter) {
  const month = parseInt(oldDate.substring(0, 2))-1;
  const day = parseInt(oldDate.substring(3, 5));
  const year = parseInt(oldDate.substring(6, 10));
  const myDate = new Date(year, month, day);
  myDate.setDate(myDate.getDate() + daysAfter);
  const newMonth = myDate.getMonth()+1;
  const newDay = myDate.getDate();
  const newYear = myDate.getFullYear();
  return output = newMonth + '/' + newDay + '/' + newYear;
}
