import React, { useState } from 'react'
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
    function handleEventClick(info) {
        setModalOpen(true)
        console.log(info.event)
        SetEventDetail(info.event)
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
                        <span>Resume docx </span>
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