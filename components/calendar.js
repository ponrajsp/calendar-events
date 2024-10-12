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
import CustomEventContent from './customEvent';
import WeekTimeCustomEventContent from './weekTimecustomEvent';
import MeetingDetail from './meetingDetail';

export default function Calendar() {
    const router = useRouter();
    const [currentEvents, setCurrentEvents] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [eventDetail, SetEventDetail] = useState()
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [openMeeting, setOpenMeeting] = useState(false)
    const [eventDetailMeeting, SetEventDetailMeeting] = useState()
    const [disableEvents, setDisableEvents] = useState(true);

    useEffect(() => {
      const transformedEvents = transformEvents(eventsDate);
      setFilteredEvents(transformedEvents);
    }, []);

    function handleEventClick(info) {
        // setModalOpen(true)
        const filterByEvents = eventsDate.filter(e => 
            moment(e.start).isSame(moment(info.event.start), 'minute')
        );
        SetEventDetailMeeting(filterByEvents)
        setOpenMeeting(true)
    }
    function handleOpenModal(item) {
      setModalOpen(true)
      // SetEventDetail(item)
    }
    function handleEvents(events) {
        setCurrentEvents(events)
    }
    function dayCellContent(cellInfo) {
      
      if (cellInfo.view.type === 'dayGridMonth') {
        const eventsForDay = eventsDate.filter(event => moment(event.start).isSame(cellInfo.date, 'day'));
      
        const startTimesCount = eventsForDay.reduce((acc, event) => {
          const startTime = moment(event.start).format();
          acc[startTime] = (acc[startTime] || 0) + 1;
          return acc;
        }, {});

        const duplicateStartEvents = eventsForDay.filter(event => {
          const startTime = moment(event.start).format();
          return startTimesCount[startTime] > 1;
        });
        return (
          <div className="day-cell">
            <div>{cellInfo.dayNumberText}</div>
            {duplicateStartEvents.length > 0 && (
              <div className="event-count">{duplicateStartEvents.length}</div>
            )}
          </div>
        );
      }
    }
    function timeCellContent(slotInfo) {
      const eventsForTimeSlot = eventsDate.filter(event =>
        moment(event.start).isSame(slotInfo.date, 'minute')
      );
    
      return (
        <div className="time-cell">
          {eventsForTimeSlot.length > 0 && (
            <div className="event-count">Events: {eventsForTimeSlot.length}</div>
          )}
        </div>
      );
    }

    function weekCellCount(cellInfo) {
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
    function handleCloseMeeting() {
      setOpenMeeting(false)
    }
  
    // const divHovered = isHovered ? 'meeting-events-detail hovered' : 'meeting-events-detail';
    
    const renderEventContent = (eventInfo) => {
      return <CustomEventContent eventInfo={eventInfo} meetingActive={openMeeting} />;
    };
    
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
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
        dayCellContent={dayCellContent}
        viewDidMount={(arg) => {
          disableColumnEvents(arg.el);
        }}
    />
      <MeetingDetail openMeeting={openMeeting} eventDetail={eventDetailMeeting} openMeetingChange={handleCloseMeeting} />
    </div>
  )
}
const disableColumnEvents = (el) => {
  const columns = el.querySelectorAll('.fc-timegrid-col-events');
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
