/* GLOBALS */
var EVENTS = [{"title":"Doctors appoinment","start":"2019-08-12T09:00:00"},{"title":"","start":"2019-08-03T:00:00"},{"title":"frf","start":"2019-08-03T07:00:00"},{"title":"frffr","start":"2019-08-15T10:00:00"},{"title":"frffr","start":"2019-08-15T15:00:00"},{"title":"frffr","start":"2019-08-24T15:00:00"},{"title":"frffr","start":"2019-08-28T15:00:00"}];





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
