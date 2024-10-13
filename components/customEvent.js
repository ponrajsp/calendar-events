import React, { useState } from 'react';
import moment from 'moment';

const RenderEventContent = ({ eventInfo, meetingActive, filteredEvents }) => {
  const filterDate = moment(filteredEvents[0].start).format('hh:mm A');
  
  
  const [eventActive, SetEventActive] = useState(false)
  const [activeId, SetActiveId] = useState()
  const { event, view } = eventInfo;
  
  const [hoveredEventId, setHoveredEventId] = useState(null);
    
    const handleMouseEnter = (id) => {
        setHoveredEventId(id);
    };

    const handleMouseLeave = () => {
        setHoveredEventId(null);
    };
  const renderViewDetail = (event) => {
    SetEventActive(true)
    SetActiveId(event.id);
  }
  
  if (view.type === 'dayGridMonth') {
    const sameDayEvents = eventInfo.view.calendar.getEvents().filter(e => 
        moment(e.start).isSame(event.start, 'minute')
    );
    if (event.id !== sameDayEvents[0].id) {
        return null;
    }
    
    const classActive = meetingActive && activeId === event.id ? 'border-left-container active' : 'border-left-container';
    const isHovered = hoveredEventId === event.id;
    const divClass = isHovered
      ? 'border-left-container hovered'
      : 'border-left-container';
    return (
      <>
        { filterDate === moment(event.start).format('hh:mm A') &&
          <div className='filterCounts'><span>{filteredEvents[0].additionalCount}</span></div> }
        <div className={divClass} onClick={() => renderViewDetail(event)} key={event.id} onMouseEnter={() => handleMouseEnter(event.id)}
        onMouseLeave={handleMouseLeave}>
          <span>{event.extendedProps.job_id.jobRequest_Title}</span>
          <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
          <span>
            {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
          </span>
        </div>
      </>
    );
  } else  {
    const sameDayEventsWeek = eventInfo.view.calendar.getEvents().filter(e => 
        moment(e.start).isSame(event.start, 'minute')
    );
  if (sameDayEventsWeek.length > 1 ) {
    sameDayEventsWeek.forEach(function(event, index) {
      if (index === 0) {
        event.remove()
      }
    });
  }
    const isHovered = hoveredEventId === event.id;
    const divClass = isHovered ? 'border-left-container hovered' : 'border-left-container';
    const classActive = meetingActive && activeId === event.id ? 'border-left-container active' : 'border-left-container';
    console.log('evenet star ', event.start);
    
    return (
      <>
        { filterDate === moment(event.start).format('hh:mm A') &&
        <div className='filterCounts'><span>{filteredEvents[0].additionalCount}</span></div> }
        <div className={divClass} onClick={() => renderViewDetail(event)} key={event.id} onMouseEnter={() => handleMouseEnter(event.id)}
          onMouseLeave={handleMouseLeave}>
            <span>{event?.extendedProps?.job_id?.jobRequest_Title}</span>
            <span>Interviewer: {event?.extendedProps?.user_det?.handled_by?.firstName}</span>
            <span>
              {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
            </span>
        </div>
      </>
    );
  }
};

export default RenderEventContent;
