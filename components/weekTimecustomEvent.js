import React, { useState } from 'react';
import moment from 'moment';

const RenderEventContent = ({ eventInfo, meetingActive }) => {
  console.log('eventInfo ', eventInfo);
  
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
    return (
      <>
        <div className='border-left-container' onClick={() => renderViewDetail(eventInfo)} key={eventInfo.id} onMouseEnter={() => handleMouseEnter(eventInfo.id)}
        onMouseLeave={handleMouseLeave}>
          <span>{eventInfo.job_id.jobRequest_Title}</span>
          <span>Interviewer: {eventInfo.user_det.handled_by.firstName}</span>
          <span>
            {moment(eventInfo.start).format('hh:mm A')} - {moment(eventInfo.end).format('hh:mm A')}
          </span>
        </div>
      </>
    );
  }

export default RenderEventContent;
