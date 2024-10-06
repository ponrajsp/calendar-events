import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { format, parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events }) => {
    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
            />
        </div>
    );
};

export default CalendarComponent;
