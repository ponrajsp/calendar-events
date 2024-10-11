import React, { useState } from 'react';
import moment from 'moment';

const RenderEventContent = ({ eventInfo, meetingActive }) => {
  const [eventActive, SetEventActive] = useState(false)
  const [activeId, SetActiveId] = useState()
  const { event, view } = eventInfo;
  
  const renderViewDetail = (eventInfo) => {
    SetActiveId(event.id);
    SetEventActive(true)
  }
  
  if (view.type === 'dayGridMonth') {
    const sameDayEvents = eventInfo.view.calendar.getEvents().filter(e => 
        moment(e.start).isSame(event.start, 'minute')
    );
    if (event.id !== sameDayEvents[0].id) {
        return null;
    }

    const classActive = meetingActive && activeId === event.id ? 'border-left-container active' : 'border-left-container'; 
    return (
      <div className={classActive} onClick={renderViewDetail} key={event.id}>
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
    const classActive = meetingActive && activeId === event.id ? 'border-left-container active' : 'border-left-container'; 
    return (
      <div className={classActive} onClick={renderViewDetail} key={event.id}>
        <span>{event.extendedProps.job_id.jobRequest_Title}</span>
        <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
        <span>
          {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
        </span>
      </div>
    );
  }
};

export default RenderEventContent;
