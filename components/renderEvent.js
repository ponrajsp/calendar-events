import React from 'react';
import moment from 'moment';

function renderEventContent(eventInfo) {
  const { event, view } = eventInfo;

  const renderViewDetail = (eventInfo) => {
    console.log(event);
    // getEventDetails(eventInfo);
  }
  
  if (view.type === 'dayGridMonth') {
    const sameDayEvents = eventInfo.view.calendar.getEvents().filter(e => 
        moment(e.start).isSame(event.start, 'day')
    );
    sameDayEvents.sort((a, b) => moment(a.start).diff(moment(b.start)));
    // if (event.id !== sameDayEvents[0].id) {
    //     return null;
    // }
    return (
      <div className="border-left-container" onClick={renderViewDetail}>
        <span>{event.extendedProps.job_id.jobRequest_Title}</span>
        <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
        <span>
          {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
        </span>
      </div>
    );
  } else if (view.type === 'timeGridWeek' || view.type === 'timeGridDay') {
    // const sameDayEventsWeek = eventInfo.view.calendar.getEvents().filter(e => 
    //     moment(e.start).isSame(event.start, 'minute')
    //   );
    // console.log('sameDayEventsWeek ', sameDayEventsWeek.length);
    // if (event.id !== sameDayEventsWeek[0].id) {
    //     return null;
    // }
    return (
      <div className="border-left-container">
        <span>{event.extendedProps.job_id.jobRequest_Title}</span>
        <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
        <span>
          {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
        </span>
      </div>
    );
  }
  return null;
}

export default renderEventContent;
