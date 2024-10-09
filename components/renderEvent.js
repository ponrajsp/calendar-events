import React from 'react';
import moment from 'moment';
import eventsDate from '../utils/calendarfromtoenddate.json'

function renderEventContent(eventInfo) {
  const { event, view } = eventInfo;

  const renderViewDetail = (eventInfo) => {
    console.log(event);
    // getEventDetails(eventInfo);
  }
  
  if (view.type === 'dayGridMonth') {
    const sameDayEvents = eventInfo.view.calendar.getEvents().filter(e => 
        moment(e.start).isSame(event.start, 'minute')
    );
    if (event.id !== sameDayEvents[0].id) {
        return null;
    }
    return (
      <div className="border-left-container" onClick={renderViewDetail}>
        <span>{event.extendedProps.job_id.jobRequest_Title}</span>
        <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
        <span>
          {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
        </span>
      </div>
    );
  } else  {
    const sameDayEventsWeek = eventInfo.view.calendar.getEvents().filter(e => 
        moment(e.start).isSame(event.start, 'minute')
    );
    
    // if (event.id !== sameDayEventsWeek[0].id) {
    //     return null;
    // }
    return (
      <div className="border-left-container" onClick={renderViewDetail}>
        <span>{event.extendedProps.job_id.jobRequest_Title}</span>
        <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
        <span>
          {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
        </span>
        {/* {sameDayEventsWeek.length > 1 && (
           <div className='week-time-count'>{sameDayEventsWeek.length}</div>
        )} */}
      </div>
    );
  }
}

export default renderEventContent;
