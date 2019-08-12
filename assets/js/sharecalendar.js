
function getEvents() {
  let windowURI = window.location;
  let encodedEvents = windowURI.search.substring(1);
  calendarEvents = decodeURIComponent(encodedEvents);
  calendarEvents = JSON.parse(calendarEvents);
  //console.log(calendarEvents);
  return calendarEvents;


}



document.addEventListener('DOMContentLoaded', function() {
  /* Calendar */
  let calendarEl = document.getElementById('calendar');

  let calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid','list' ],
    views: {
      listDay: { buttonText: 'Day' },
      listWeek: { buttonText: 'Week' },
      listMonth: { buttonText: 'Month' }
    },
    header: {
      left: 'title',
      center: 'false',
      right: 'calendar,listDay,listWeek,listMonth'
    },
    customButtons: {
      calendar: {
        text: 'Calendar',
        click: function() {
          calendar.changeView('dayGridMonth');
        }

      }
    },
    events: getEvents()
  });
  calendar.render();

});
