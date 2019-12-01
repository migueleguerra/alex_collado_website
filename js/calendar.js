$('#from-date').datepicker({
  defaultDate: '+1d',
  changeMonth: false,
  numberOfMonths: 1,
  minDate: '+1d',
  onClose: function(selectedDate) {
    $('#to-date').datepicker('option', 'minDate', selectedDate );
    $('#to-date').datepicker(
        'option', 'maxDate', new_date(selectedDate, 365));
  }
});


$('#to-date').datepicker({
  defaultDate: '+1w',
  changeMonth: false,
  numberOfMonths: 1
});

function new_date(old_date, days_after) {
  const month = parseInt(old_date.substring(0, 2))-1;
  const day = parseInt(old_date.substring(3, 5));
  const year = parseInt(old_date.substring(6, 10));
  const myDate = new Date(year, month, day);
  myDate.setDate(myDate.getDate() + days_after);
  const newMonth = myDate.getMonth()+1;
  const newDay = myDate.getDate();
  const newYear = myDate.getFullYear();
  return output = newMonth + '/' + newDay + '/' + newYear;
}
