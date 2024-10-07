import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import eventMeeting from '../utils/calendar_meeting.json'
import eventsDate from '../utils/calendarfromtoenddate.json'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import moment from 'moment';
import Modal from './modal';

export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [eventDetail, SetEventDetail] = useState('')
    function handleEventClick(info) {
        setModalOpen(true)
        SetEventDetail(info.event.extendedProps)
    }
    function close() {
      setModalOpen(false);
    }
    function handleEvents(events) {
        setCurrentEvents(events)
    }
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={eventsDate}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
    />
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className='event-detail-info'>
            <ul>
              <li>
                Interviewer With: John Smith
              </li>
              <li>
                Position: Python Developer
              </li>
              <li>
                Created By: HR Manager
              </li>
              <li>
                Interview Date: 6th March 2024
              </li>
              <li>
                Interview Time: 10 - 11 AM
              </li>
              <li>
                Interview Via: Google Meet
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  )
}

function renderEventContent(eventInfo) {
    return (
      <>
        <div className='border-left-container'>
            <span>{eventInfo.event.extendedProps.job_id.jobRequest_Title}</span>
            <span>Interviewer, Geetha</span>
            <span>Time: { moment(eventInfo.event.start).format('hh:mm A') } - { moment(eventInfo.event.end).format('hh:mm A') }</span>
        </div>
      </>
    )
}