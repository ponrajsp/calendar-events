import React from 'react';
import Calendar from '@/components/calendar';
import '../styles/style.css'

const CalendarPage = ({ events }) => {
    return (
        <div>
            <h1>Your Todos</h1>
            <Calendar events={events} />
        </div>
    );
};

export default CalendarPage;