import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import eventMeeting from '../utils/calendar_meeting.json'
import eventsDate from '../utils/calendarfromtoenddate.json'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import { useRouter } from 'next/router';
import moment from 'moment';
import Modal from './modal';

export default function Calendar() {
    const router = useRouter();
    const [currentEvents, setCurrentEvents] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [eventDetail, SetEventDetail] = useState()
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
      const transformedEvents = transformEvents(eventsDate);
      setFilteredEvents(transformedEvents);
    }, []);

    function handleEventClick(info) {
        setModalOpen(true)
        SetEventDetail(info.event)
    }
    function handleEvents(events) {
        setCurrentEvents(events)
    }
    function dayCellContent(cellInfo) {
      const eventsForDay = currentEvents.filter(event => moment(event.start).isSame(cellInfo.date, 'day'));
      return (
        <div className="day-cell">
          <div>{cellInfo.dayNumberText}</div>
          {eventsForDay.length > 0 && (
            <div className="event-count">{eventsForDay.length}</div>
          )}
        </div>
      );
    }
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={eventsDate}
        eventContent={renderEventContent}
        // eventContent={renderEventContent(currentEvents)}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        dayCellContent={dayCellContent}
    />
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          {eventDetail && (
            <div className='event-detail-info'>
              <div className='event-container-detail'>
                <div>
                  <ul className='list-detail'>
                    <li>
                      Interviewer With: { eventDetail.extendedProps.user_det.handled_by.firstName }
                    </li>
                    <li>
                      Position: { eventDetail.extendedProps.job_id.jobRequest_Title }
                    </li>
                    <li>
                      Created By: { eventDetail.extendedProps.user_det.handled_by.firstName }
                    </li>
                    <li>
                      Interview Date: { moment(eventDetail.start).format('DD MMM YYYY') }
                    </li>
                    <li>
                      Interview Time: { moment(eventDetail.start).format('hh:mm A') }
                    </li>
                    <li>
                      Interview Via: Google Meet
                    </li>
                  </ul>
                  <div className='event-btn-download'>
                    <a className='event-download-btn' href={eventDetail.extendedProps.link} 
                        target="_blank" rel="noopener noreferrer">
                        <span>Resume.docx </span>
                        <img className='download-icon' src={`/images/download.png`}></img>
                        <img className='download-icon' src={`/images/view.png`}></img>
                    </a>
                    <a className='event-download-btn' href={eventDetail.extendedProps.link} 
                        target="_blank" rel="noopener noreferrer">
                        <span>Aadhar Card </span>
                        <img className='download-icon' src={`/images/download.png`}></img>
                        <img className='download-icon' src={`/images/view.png`}></img>
                    </a>
                  </div>
                </div>
                <div className='divider'></div>
                <div className='google-meet-container'>
                  <img src={`/images/logo-meet.png`}></img>
                  <a className='google-meet-btn' href={eventDetail.extendedProps.link} 
                      target="_blank" rel="noopener noreferrer">
                      <span>JOIN</span>
                  </a>
                  {/* <button onClick={googleMeetLink} type="button">JOIN</button> */}
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
function transformEvents(events) {
  const eventMap = {};

  events.forEach(event => {
    const date = moment(event.start).format('YYYY-MM-DD');
    if (!eventMap[date]) {
      eventMap[date] = { ...event, additionalCount: 0 };
    } else {
      eventMap[date].additionalCount += 1;
    }
  });
  console.log('eventMap ', eventMap);
  
  return Object.values(eventMap);
}

function renderEventContent(eventInfo) {
  const { event, view } = eventInfo;
    if (view.type === 'dayGridMonth') {
      return (
        <div className="border-left-container">
          <span>{event.extendedProps.job_id.jobRequest_Title}</span>
          <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
          <span>
            {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
          </span>
          {/* {additionalEventsCount > 0 && (
            <span className="additional-events-count">
              +{additionalEventsCount} more
            </span>
          )} */}
        </div>
      );
    }

    return (
      <div className="border-left-container">
        <span>{event.extendedProps.job_id.jobRequest_Title}</span>
        <span>Interviewer: {event.extendedProps.user_det.handled_by.firstName}</span>
        <span>
          Time: {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
        </span>
      </div>
    );
}
