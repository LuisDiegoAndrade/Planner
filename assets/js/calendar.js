/* GLOBALS */
var EVENTS = [];
var _calendar;

function newCalendar() {
  localStorage.clear();
  window.location = "./index.html";
}


function activateModule() {
  event.target.setAttribute('data-toggle', 'modal');
  event.target.setAttribute('data-target', '#modal-form');
}


function modalForm() {

let date = new Date();
let currentYear = String(date.getFullYear());

let currentMonth = String(date.getMonth() + 1);
currentMonth = '0'+ currentMonth;

let day = document.getElementById('daySelection');
day = String(day.options[day.selectedIndex].value);

let time = document.getElementById('timeSelection');
time = String(time.options[time.selectedIndex].value)
console.log(time);

let title = document.getElementById('eventTitle');
title = title.value;


let start = currentYear + '-' + currentMonth + '-' + day + 'T' + time + ':00:00';

let eventObj = {'title': title, 'start': String(start)};
console.log(eventObj);
setCalendarEvent(eventObj, _calendar);

}

function getevents() {

  if (!localStorage.getItem('events')) {
    return {'title': ''};
  }
  else{
    EVENTS = JSON.parse(localStorage.getItem('events'));
    return JSON.parse(localStorage.getItem('events'));
  }
}

async function setCalendarEvent(eventObj, calendar) {
  EVENTS.push(eventObj);
  await localStorage.setItem('events',JSON.stringify(EVENTS));

   console.log(eventObj);
    calendar.addEvent({
      title: eventObj.title,
      start: eventObj.start,
      allDay: false
    });
}

async function removeCalendarEvent(eventObj) {
  for (let i = 0; i < EVENTS.length; ++i) {
    if (eventObj.title == EVENTS[i].title) {
      EVENTS.splice(i,1);
    }
  }
  await localStorage.setItem('events',JSON.stringify(EVENTS));

}

document.addEventListener('DOMContentLoaded', function() {
  /* Calendar */
  var calendarEl = document.getElementById('mainCalendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid','list' ],
    views: {
      listDay: { buttonText: 'Day' },
      listWeek: { buttonText: 'Week' },
      listMonth: { buttonText: 'Month' }
    },
    header: {
      left: 'title',
      center: 'false',
      right: 'addEventButton,calendar,listDay,listWeek,listMonth'
    },
    eventClick: function(info){
      if(window.confirm("Delete?")){
        info.event.remove();
        removeCalendarEvent(info.event);

      }
      console.log(info.event.view);
    },
    customButtons: {
      addEventButton: {
        text: '+',
        click: function() {
          //var date2 = new Date(dateStr + 'T00:00:00'); // will be in local time
          //data-toggle="modal" data-target="#modal-form"
          activateModule();

        }
      },

      calendar: {
        text: 'Calendar',
        click: function() {
          calendar.changeView('dayGridMonth');
        }

      }
    },
    events: getevents(EVENTS)
  });
  calendar.render();
  _calendar = calendar;

});

function publishCalendar() {
  let calendarParam = encodeURIComponent(localStorage.getItem('events'));
  let htmlDoc = 'https://luisdiegoandrade.github.io/Planner/myplanner';
  let URI = htmlDoc + '?' + calendarParam;
  let calendarLinkTextArea = document.getElementById('sharedCalendarLink');
  calendarLinkTextArea.innerText = URI;
  let clipboardData = document.getElementById('clipboardData');
  clipboardData.setAttribute('data-clipboard-text', URI);
}
